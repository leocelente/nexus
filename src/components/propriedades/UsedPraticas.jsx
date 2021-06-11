import React, { Component } from "react";
import PropTypes from "prop-types";
import { Propriedade } from "../../api/models/propriedade";
import { connect } from "react-redux";
import { Pratica } from "../../api/models/pratica";
import List from "../general/List";
import PraticaRadar from "../praticas/PraticaRadar";
import { selectPratica } from "../../redux/actions/praticasActions";
import TableJson from "../general/TableJson";

class UsedPraticas extends Component {
    static propTypes = {
        selected: Propriedade,
    };

    handle = (pratica, i) => {
        this.props.selectPratica(pratica);
    };

    render() {
        /** @type {Propriedade} */
        const propriedade = this.props.selected;

        /** @type {Array<Pratica>} */
        const praticas = propriedade.praticas;
        if (praticas.length === 0) {
            return <div></div>;
        }
        /** @type {Pratica} */
        const pratica = this.props.pratica;

        return (
            <>
                <List
                    title="Praticas Aplicadas"
                    items={praticas.map((x) => x.nome)}
                    onSelect={(i) => this.handle(praticas[i], i)}
                />
                {/* <PraticaRadar pratica={this.props.pratica} /> */}
                <hr></hr>
                <br></br>
                <TableJson data={pratica.descricao} />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    selected: state.propriedades.propriedade,
    pratica: state.praticas.pratica,
});
export default connect(mapStateToProps, { selectPratica })(UsedPraticas);
