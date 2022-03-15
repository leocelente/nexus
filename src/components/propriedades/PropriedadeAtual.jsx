import React, { Component } from "react";
import { connect } from "react-redux";
import { selectPropriedadeAtual } from "../../redux/actions/usuarioActions";

export class PropriedadeAtual extends Component {
    update(value) {
        this.props.selectPropriedadeAtual(value);
    }

    render() {
        const propriedades = this.props.propriedades;
        if (propriedades.length && !this.props.atual) {
            this.props.selectPropriedadeAtual(propriedades[0].nome);
        }

        return (
            <select onChange={(e) => this.update(e.target.value)}>
                {propriedades.map((p) => (
                    <option>{p.nome}</option>
                ))}
            </select>
        );
    }
}

const mapStateToProps = (state) => ({
    propriedades: state.propriedades.propriedades,
    atual: state.authentication.temporary_propriedade,
});

const mapDispatchToProps = { selectPropriedadeAtual };

export default connect(mapStateToProps, mapDispatchToProps)(PropriedadeAtual);
