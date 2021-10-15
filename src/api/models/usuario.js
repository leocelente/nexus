import { Propriedade } from "./propriedade";

export class Usuario {
    nome = "";
    role = "";
    propriedade = new Propriedade({});
    firebaseUser = null;
    constructor(data) {
        this.nome = data?.nome ? data.nome : "Não logado";
        this.propriedade = data?.propriedade
            ? data.propriedade
            : new Propriedade({});
        this.firebaseUser = data?.firebaseUser ? data.firebaseUser : null;
        this.role = data?.role ? data.role : "anonimo";
    }
}
