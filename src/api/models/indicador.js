export class Indicador {
    nome = "";
    unidades = "";
    titulo = "";
    legenda = {};
    constructor(data) {
        this.nome = data?.nome ? data.nome : "";
        this.titulo = data?.titulo ? data.titulo : "";
        this.unidades = data?.unidades ? data.unidades : "";
        this.atributos = [];
    }
}

export class Atributo {
    nome = "";
    indicadores = Array < Indicador > [];
    constructor(data) {
        if (data?.nome) {
            this.nome = data.nome;
        }
        this.indicadores = [];
    }
}

export class Grupo {
    nome = "";
    atributos = Array < Atributo > [];
    constructor(data) {
        this.nome = data?.nome ? data.nome : "";
        this.atributos = [];
    }
}
