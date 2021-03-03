import firebase from "firebase/app";
import "firebase/firestore";
import { FETCH_INDICADORES, FETCH_PRATICAS, FETCH_PROPRIEDADES, FETCH_SERIE_HIST } from "../../redux/actions";


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

if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore();



export async function fetchIndicadoresFirebase(dispatch) {
    let grupos = [];
    const snap = (await db.collection("indicadores").get()).docs;
    for (let i = 0; i < snap.length; ++i) {
        grupos[i] = { nome: snap[i].data().nome, atributos: [] };
        const snap_atributos = (await snap[i].ref.collection("atributos").get()).docs;
        for (let j = 0; j < snap_atributos.length; ++j) {
            grupos[i].atributos[j] = snap_atributos[j].data();
            grupos[i].atributos[j].indicadores = []
            const indicadores_snap = (await snap_atributos[j].ref.collection("indicadores").get()).docs;
            for (let k = 0; k < indicadores_snap.length; ++k) {
                grupos[i].atributos[j].indicadores[k] = indicadores_snap[k].data();
            }
        }
    }

    dispatch({
        type: FETCH_INDICADORES,
        payload: { grupos }
    });
}


export async function fetchPraticasFirebase(dispatch) {
    let temas = [];
    const snap = (await db.collection("praticas").get()).docs;
    for (let i = 0; i < snap.length; ++i) {
        temas[i] = { nome: snap[i].data().nome, praticas: [{ propriedades: [] }] };

        const praticas_snap = (await snap[i].ref.collection("praticas").get()).docs;
        for (let j = 0; j < praticas_snap.length; ++j) {
            temas[i].praticas[j] = {...praticas_snap[j].data(), propriedades: [] };
            let propriedades = (await praticas_snap[j].ref.collection("propriedades").get()).docs;
            // console.log(propriedades);
            for (let p = 0; p < propriedades.length; p++) {
                let propriedade = (await propriedades[p].data().propriedade.get()).data();
                propriedade.gps = propriedade.gps.toJSON();
                temas[i].praticas[j].propriedades.push(propriedade);

            }
        }
    }
    // console.log("GOT PRATICAS:", temas);
    dispatch({
        type: FETCH_PRATICAS,
        payload: { temas }
    });
}


export async function fetchPropriedadesFirebase(dispatch) {
    let propriedades = [];
    const snap = (await db.collection("propriedades").get()).docs;
    for (let i = 0; i < snap.length; i++) {
        const element = snap[i].data();
        propriedades[i] = element;

    }
    // console.log("GOT PROPRIEDADES:", propriedades);
    dispatch({
        type: FETCH_PROPRIEDADES,
        payload: { propriedades }
    });
}


export async function fetchSerieHistoricaFirebase(dispatch) {
    let dados = [];
    const indicadores_snap = (await db.collection("serie_historica").get()).docs;
    for (let i = 0; i < indicadores_snap.length; i++) {
        dados[i] = indicadores_snap[i].data();
        dados[i].indicador = (await dados[i].indicador.get()).data();
        dados[i].data = [{ indicador: { nome: "" } }];
        let data_snap = (await indicadores_snap[i].ref.collection("data").get()).docs;
        for (let j = 0; j < data_snap.length; j++) {
            dados[i].data[j] = data_snap[j].data();
            dados[i].data[j].propriedade = (await dados[i].data[j].propriedade.get()).data();
        }
    }
    dispatch({
        type: FETCH_SERIE_HIST,
        payload: { dados }
    });
}

export async function fetchBenchmarks(dispatch) {
    const indicadores_snap = (await db.collection("benchmarks").get()).docs;
}