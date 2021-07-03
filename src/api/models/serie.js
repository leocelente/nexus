import { Indicador } from "./indicador";
import { Pratica } from "./pratica";
import { Propriedade } from "./propriedade";

class DataPoint {
    propriedade = new Propriedade({});
    valor = {};
    tempo = 0;
    praticas = Array < Pratica > [];
}

class SerieHistorica {
    data = Array < DataPoint > [];
    indicador = new Indicador({});
}
