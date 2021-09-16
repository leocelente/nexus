import React, { Component } from "react";
import { connect } from "react-redux";
import List from "../general/List";
import PropTypes from "prop-types";
import { editConjunto } from "../../redux/actions/praticasActions";

class SingleCenario extends Component {
    static propTypes = {
        index: PropTypes.number,
    };

    handler = (idxs) => {
        const a_nomes = this.props.propriedades
            .map((propriedade) => propriedade.praticas)
            .filter((list_praticas) => list_praticas.length > 0);
        const nomes = [].concat.apply([], a_nomes).map((z) => z.pratica.nome);

        this.props.editConjunto(
            this.props.index,
            idxs.map((i) => nomes[i])
        );
    };

    render() {
        const a_nomes = this.props.propriedades
            .map((propriedade) => propriedade.praticas)
            .filter((list_praticas) => list_praticas.length > 0);
        const nomes = [].concat.apply([], a_nomes).map((z) => z.pratica.nome);

        /**@type {Array<Array<any>>} */
        const a_praticas = this.props.propriedades
            .map((propriedade) => propriedade.praticas)
            .filter((list_praticas) => list_praticas.length > 0);

        const praticas = [].concat
            .apply([], a_praticas)
            .filter((v, i) => nomes.indexOf(v.pratica.nome) === i); // unique

        if (praticas[0] === undefined) return <></>;

        return (
            <div>
                <List
                    items={praticas.map((x) => x.pratica.nome)}
                    title={"Praticas" + this.props.index}
                    onSelect={(p) => this.handler(p)}
                    onSaibaMais={(idx) =>
                        this.handleShow(praticas[idx].pratica)
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    propriedades: state.propriedades.propriedades,
});

export default connect(mapStateToProps, { editConjunto })(SingleCenario);
