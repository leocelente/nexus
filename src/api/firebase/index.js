import firebase from "firebase/app";
import "firebase/firestore";
import {
    FETCH_INDICADORES,
    FETCH_PRATICAS,
    FETCH_PROPRIEDADES,
    FETCH_SERIE_HIST
} from "../../redux/actions";

// Configuração do banco de dados Firebase usando 
// os valores disponiveis no serviço de hospedagem
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRESTORE,
    authDomain: process.env.REACT_APP_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE,
    projectId: process.env.REACT_APP_PROJECT,
    storageBucket: process.env.REACT_APP_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASEURE,
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore();

// Agrupamento de métodos para facilitar interagir com as estruturas do Firebase
class Helpers {

    // Pega os valores de uma collection (array) de um documento
    static async getCollection(ref, path = "/") {
            return (await ref.collection(path).get()).docs;
        }
        // segue um referencia para outro documento
    static async followReference(ref) {
        return (await ref.get()).data();
    }

    /**
     * Applies `await fun` to elements in the array
     * @param {Array} array 
     * @param {Function} fun 
     */
    static async asyncForEach(array, fun) {
        for (let i = 0; i < array.length; i++) {
            await fun(array[i], i);
        }
    }
}

/**
 * Retorna todos os indicadores do banco de dados
 * e dispara (dispatch) um evento para o redux
 * @param {Function} dispatch 
 */
export async function fetchIndicadoresFirebase(dispatch) {
    let grupos = [];
    // se chama "indicadores" mas em teoria são os grupos
    const snap = await Helpers.getCollection(db, "indicadores");
    await Helpers.asyncForEach(snap, async(grupo, i) => {
        grupos[i] = {...grupo.data(), atributos: [] };
        const atributos = await Helpers.getCollection(grupo.ref, "atributos");
        await Helpers.asyncForEach(atributos, async(atributo, j) => {
            grupos[i].atributos[j] = {...atributo.data(), indicadores: [] };
            const indicadores = await Helpers.getCollection(atributo.ref, "indicadores");
            indicadores.forEach((indicador, k) => {
                grupos[i].atributos[j].indicadores[k] = indicador.data();
            });
        });
    });

    dispatch({
        type: FETCH_INDICADORES,
        payload: { grupos }
    });
}


export async function fetchPraticasFirebase(dispatch) {
    let temas = [];
    const snap = await Helpers.getCollection(db, "praticas");
    await Helpers.asyncForEach(snap, async(tema, i) => {
        temas[i] = {...snap[i].data(), praticas: [{ propriedades: [] }] };
        const praticas = await Helpers.getCollection(tema.ref, "praticas");
        await Helpers.asyncForEach(praticas, async(pratica, j) => {
            temas[i].praticas[j] = {...pratica.data(), propriedades: [], b_atributos: [] };
            const propriedades = await Helpers.getCollection(pratica.ref, "propriedades");
            await Helpers.asyncForEach(propriedades, async(propriedade_ref, k) => {
                let propriedade = await Helpers.followReference(propriedade_ref.data().propriedade);
                propriedade.gps = propriedade.gps.toJSON();
                temas[i].praticas[j].propriedades.push(propriedade);
            });
        });
    });

    dispatch({
        type: FETCH_PRATICAS,
        payload: { temas }
    });
}


export async function fetchPropriedadesFirebase(dispatch) {
    let propriedades = [];
    const snap = await Helpers.getCollection(db, "propriedades");
    await Helpers.asyncForEach(snap, async(propriedade, i) => {
        propriedades[i] = propriedade.data();
    });

    dispatch({
        type: FETCH_PROPRIEDADES,
        payload: { propriedades }
    });
}

/**
 * A serie historia contem pontos individuais. Essa função percorre esse array
 * e constroi um objeto organizando por Indicador e de bonus calcula o valor de 
 * máximo e minimo de cada um que depois serão usados para normalização
 */
export async function fetchSerieHistoricaFirebase(dispatch) {
    let dados = [];
    const indicadores = await Helpers.getCollection(db, "serie_historica");
    await Helpers.asyncForEach(indicadores, async(indicador, i) => {
        dados[i] = indicadores[i].data();
        dados[i].indicador = await Helpers.followReference(dados[i].indicador); //(await dados[i].indicador.get()).data();
        dados[i].data = [{ indicador: { nome: "" } }];
        const data = await Helpers.getCollection(indicador.ref, "data");
        await Helpers.asyncForEach(data, async(ponto, j) => {
            dados[i].data[j] = ponto.data();
            dados[i].data[j].propriedade = await Helpers.followReference(ponto.data().propriedade);
        });
    });
    let graficos = {};
    dados.forEach(({ indicador, data }) => {
        let { nome, titulo, unidade } = indicador;
        graficos[nome] = { byProp: {}, series: [], titulo, unidade, min: 1e12, max: -1e12 };
        data.forEach(({ valor, tempo, propriedade }) => {
            graficos[nome].series.push({
                valor,
                tempo,
                propriedade: propriedade.nome,
            });
            if (!graficos[nome].byProp[propriedade.nome]) {
                graficos[nome].byProp[propriedade.nome] = []
            } else {
                graficos[nome].byProp[propriedade.nome].push({ valor, tempo });
            }
            if (Object.entries(valor).length != 0) {
                let kvs = Object.entries(valor);
                kvs.forEach(kv => {
                    graficos[nome].min = Math.min(graficos[nome].min, kv[1]);
                    graficos[nome].max = Math.max(graficos[nome].max, kv[1]);
                });
            } else {
                graficos[nome].min = Math.min(graficos[nome].min, valor);
                graficos[nome].max = Math.max(graficos[nome].max, valor);
            }
        });
    });
    console.log(graficos);

    dispatch({
        type: FETCH_SERIE_HIST,
        payload: { dados, graficos }
    });
}