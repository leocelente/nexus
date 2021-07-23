import firebase from "firebase/app";
import "firebase/firestore";
import {
    FETCH_INDICADORES,
    FETCH_PRATICAS,
    FETCH_PROPRIEDADES,
    FETCH_SERIE_HIST,
} from "../../redux/actions";

import { Grupo, Atributo, Indicador } from "../models/indicador";
import { Pratica, Tema } from "../models/pratica";
import { Propriedade } from "../models/propriedade";
import { Helpers } from "./utils";

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
const db = firebase.firestore();

/**
 * Retorna todos os indicadores do banco de dados
 * e dispara (dispatch) um evento para o redux
 * @param {Function} dispatch
 */
export async function fetchIndicadoresFirebase(dispatch) {
    let grupos = [];
    // se chama "indicadores" mas em teoria são os grupos
    const snap = await Helpers.getCollection(db, "indicadores");
    await Helpers.asyncForEach(snap, async (grupo, i) => {
        grupos[i] = new Grupo(grupo.data());
        const atributos = await Helpers.getCollection(grupo.ref, "atributos");

        await Helpers.asyncForEach(atributos, async (atributo, j) => {
            grupos[i].atributos[j] = new Atributo(atributo.data());
            const indicadores = await Helpers.getCollection(
                atributo.ref,
                "indicadores"
            );
            indicadores.forEach((indicador, k) => {
                grupos[i].atributos[j].indicadores[k] = new Indicador(
                    indicador.data()
                );
            });
        });
    });

    dispatch({
        type: FETCH_INDICADORES,
        payload: { grupos },
    });
}

/**
 * Pega dados das Praticas do banco de dados
 * @param {Function} dispatch
 */
export async function fetchPraticasFirebase(dispatch) {
    let temas = [];
    // Se chama praticas mas são temas
    const snap = await Helpers.getCollection(db, "praticas");
    await Helpers.asyncForEach(snap, async (tema, i) => {
        temas[i] = new Tema(tema.data());
        const praticas = await Helpers.getCollection(tema.ref, "praticas");

        await Helpers.asyncForEach(praticas, async (pratica, j) => {
            temas[i].praticas[j] = new Pratica(pratica.data());
            const propriedades = await Helpers.getCollection(
                pratica.ref,
                "propriedades"
            );

            await Helpers.asyncForEach(
                propriedades,
                async (propriedade_ref, k) => {
                    let propriedade = await Helpers.followReference(
                        propriedade_ref.data().propriedade
                    );

                    propriedade.gps = propriedade.gps.toJSON();
                    temas[i].praticas[j].propriedades.push(
                        new Propriedade(propriedade)
                    );
                }
            );

            const indicadores = await Helpers.getCollection(
                pratica.ref,
                "indicadores"
            );

            await Helpers.asyncForEach(
                indicadores,
                async (indicador_ref, k) => {
                    let indicador = await Helpers.followReference(
                        indicador_ref.data().indicador
                    );

                    temas[i].praticas[j].indicadores.push(
                        new Indicador(indicador)
                    );
                }
            );
        });
    });

    dispatch({
        type: FETCH_PRATICAS,
        payload: { temas },
    });
}

/**
 * Pega os dados das propriedades
 * @param {Function} dispatch
 */
export async function fetchPropriedadesFirebase(dispatch) {
    let propriedades = [];
    const snap = await Helpers.getCollection(db, "propriedades");
    await Helpers.asyncForEach(snap, async (propriedade, i) => {
        let data = { ...propriedade.data(), praticas: [] };
        let praticas = await Helpers.getCollection(propriedade.ref, "praticas");

        await Helpers.asyncForEach(praticas, async (pratica, i) => {
            data.praticas[i] = pratica.data();
            data.praticas[i].pratica = await Helpers.followReference(
                pratica.data().pratica
            );
        });
        propriedades[i] = new Propriedade(data);
    });

    dispatch({
        type: FETCH_PROPRIEDADES,
        payload: { propriedades },
    });
}

/**
 *
 * @returns A serie historia contem pontos individuais.
 * Essa função percorre esse array e constroi um objeto
 * e completa (segue) referencias aos indicadores e
 * propriedades
 */
async function getSerieHistoricaRaw() {
    let dados = [];
    const indicadores = await Helpers.getCollection(db, "serie_historica");
    await Helpers.asyncForEach(indicadores, async (indicador, i) => {
        dados[i] = indicadores[i].data();
        dados[i].indicador = await Helpers.followReference(dados[i].indicador);
        dados[i].data = [{ indicador: new Indicador({}) }];
        const data = await Helpers.getCollection(indicador.ref, "data");
        await Helpers.asyncForEach(data, async (ponto, j) => {
            dados[i].data[j] = ponto.data();
            dados[i].data[j].propriedade = await Helpers.followReference(
                ponto.data().propriedade
            );
        });
    });
    return dados;
}

/**
 *
 * @param {Array} dados Array JS com a serie historica
 * @returns organiza por indicador e dentro de indicador
 * tambem por propriedade
 * TODO: Separar em duas funções
 */
function orderRawSerieHistorica(dados) {
    let graficos = {};
    dados.forEach(({ indicador, data }) => {
        let { nome, titulo, unidade } = indicador;
        graficos[nome] = {
            byProp: {},
            series: [],
            titulo,
            unidade,
            min: 1e12,
            max: -1e12,
        };

        data.forEach(({ valor, tempo, propriedade, praticas }) => {
            // por indicador
            // graficos[nome].series.push({
            //     valor,
            //     tempo,
            //     propriedade: propriedade.nome,
            // });

            if (!graficos[nome].byProp[propriedade.nome]) {
                graficos[nome].byProp[propriedade.nome] = [];
            }
            graficos[nome].byProp[propriedade.nome].push({
                valor,
                tempo,
                propriedade,
            });

            if (Object.entries(valor).length != 0) {
                let kvs = Object.entries(valor);
                kvs.forEach((kv) => {
                    graficos[nome].min = Math.min(graficos[nome].min, kv[1]);
                    graficos[nome].max = Math.max(graficos[nome].max, kv[1]);
                });
            } else {
                graficos[nome].min = Math.min(graficos[nome].min, valor);
                graficos[nome].max = Math.max(graficos[nome].max, valor);
            }
        });
    });

    return graficos;
}

/**
 *  organizando por Indicador e de bonus calcula o valor de
 * máximo e minimo de cada um que depois serão usados para normalização
 */
export async function fetchSerieHistoricaFirebase(dispatch) {
    const dados = await getSerieHistoricaRaw();
    const graficos = orderRawSerieHistorica(dados);

    dispatch({
        type: FETCH_SERIE_HIST,
        payload: { graficos },
    });
}
