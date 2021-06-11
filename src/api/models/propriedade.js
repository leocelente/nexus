import { Pratica } from "./pratica";

export class Propriedade {
    nome = "";
    gps = { latitude: 0, longitude: 0 };
    descricao = {};
    praticas = [];
    constructor(data) {
        this.nome = data?.nome ? data.nome : "";
        this.gps = data?.gps ? data.gps : { latitude: 0, longitude: 0 };
        this.descricao = data?.descricao ? data.descricao : {};
        this.praticas = data?.praticas ? data.praticas : [];
    }
}
