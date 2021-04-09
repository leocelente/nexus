import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "../general/Select";
import { selectTema, fetchPraticas } from "../../redux/actions/praticasActions";

class SelectTema extends Component {
    componentDidMount() {
        this.props.fetchPraticas();
    }
    handle = (i) => {
        this.props.selectTema(i);
    };

    render() {
        const temas = this.props.temas;
        return (
            <div>
                <Select
                    title="Tema"
                    items={temas.map((x) => x.nome)}
                    onSelect={this.handle}
                    value={this.props.current}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    current: state.praticas.selectedTema,
    temas: state.praticas.data.temas,
});
export default connect(mapStateToProps, { selectTema, fetchPraticas })(
    SelectTema
);
