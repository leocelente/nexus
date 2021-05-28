export class Propriedade {
    nome = "";
    gps = { latitude: 0, longitude: 0 };
    descricao = {};
    constructor(data) {
        this.nome = data?.nome ? data.nome : "";
        this.gps = data?.gps ? data.gps : { latitude: 0, longitude: 0 };
        this.descricao = data?.descricao ? data.descricao : {};
    }
}
