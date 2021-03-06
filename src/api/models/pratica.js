import { Indicador } from "./indicador";
import { Propriedade } from "./propriedade";
export class Pratica {
    nome = "";
    propriedades = Array < Propriedade > [];
    descricao = {};
    indicadores = Array < Indicador > [];

    // TODO: remover dependencia desses membro:
    b_atributos = [];
    benchmark = { agua: 0, alimento: 0, energia: 0 };

    constructor(data) {
        this.nome = data?.nome ? data.nome : "";
        this.descricao = data?.descricao ? data.descricao : { "": "" };
        this.benchmark = data?.benchmark
            ? data.benchmark
            : { agua: 0, alimento: 0, energia: 0 };
        this.indicadores = data?.indicadores ? data.indicadores : [];
        this.propriedades = [];
        this.b_atributos = [];
    }
}

export class Tema {
    nome = "";
    praticas = Array < Pratica > [];
    constructor(data) {
        this.nome = data?.nome ? data.nome : "PX";
        this.praticas = [];
    }
}
