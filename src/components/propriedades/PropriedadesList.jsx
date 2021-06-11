import React, { Component } from "react";
import { connect } from "react-redux";
import { Propriedade } from "../../api/models/propriedade";
import { selectPropriedade } from "../../redux/actions/propriedadesActions";
import List from "../general/List";

/**
 * Wrapper para mostrar os indicadores em uma lista, sem a opção
 * de saiba mais
 */
class PropriedadesList extends Component {
    handle = (i) => {
        this.props.selectPropriedade(i);
    };

    /**
     *
     * @param {Propriedade} propriedade
     * @param {Array<Propriedade>} array
     * @returns
     */
    showPropriedade = (propriedade, array) => {
        if (propriedade === undefined) {
            return "";
        }
        return propriedade.nome;
    };

    render() {
        /**  @type {Array<Propriedade>} */
        const propriedades = this.props.propriedades;
        if (propriedades.length === 0) {
            return <div></div>;
        }
        return (
            <div>
                <List
                    items={propriedades.map(this.showPropriedade, propriedades)}
                    title="Propriedades"
                    onSaibaMais={null}
                    onSelect={(i) => this.handle(propriedades[i])}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    propriedades: state.propriedades.propriedades,
});
export default connect(mapStateToProps, { selectPropriedade })(
    PropriedadesList
);
