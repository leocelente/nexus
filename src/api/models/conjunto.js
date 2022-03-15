import { Pratica } from "./pratica";

export class Cenario {
    /** @type {Array<String>} */
    praticas = [];
    selectionIds = [];
    nome = String();
    index = Number();
    constructor(index) {
        this.index = index;
    }
    update(/** @type { Array < String >} */ praticas) {
        this.praticas = Array.from(praticas);
    }

    rename(/** @type {String} */ newName) {
        this.nome = newName;
    }
}

export class Analise {
    count = 0;
    /** @type {Array<Cenario>} */
    cenarios = [];
    resultados = new Map();
    add(/**@type {Cenario}*/ cenario) {
        cenario.index = this.count;
        this.count++;
        cenario.nome = `New Cenario (${this.count})`;
        this.cenarios.push(cenario);

        return cenario.index;
    }

    static from(/** @type {Analise} */ other) {
        const me = new Analise();
        me.count = other.count;
        me.cenarios = Array.from(other.cenarios);
        me.resultados = new Map(other.resultados);
        return me;
    }

    rem(/** @type {Number} */ index) {
        delete this.cenarios[index]; //js mantains index after delete
    }
}
