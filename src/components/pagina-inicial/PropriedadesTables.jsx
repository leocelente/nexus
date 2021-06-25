import React, { Component, useState } from "react";
import { ListGroup, Collapse } from "react-bootstrap";
import TableJson from "../general/TableJson";
import { connect } from "react-redux";
import { fetchPropriedades } from "../../redux/actions/propriedadesActions";

/**
 * Mostra as informações de uma propriedade na forma de um
 * pop-up com um tabela (TableJson)
 */
function ItemCollapsable(props) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <ListGroup.Item
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                style={{ cursor: "pointer" }}
                className="d-flex justify-content-between align-items-center"
            >
                {props.title}
                <span>{!open ? "+" : "-"}</span>
            </ListGroup.Item>
            <Collapse in={open} onClick={null}>
                <div id="example-collapse-text">
                    <TableJson data={props.data} />
                </div>
            </Collapse>
        </div>
    );
}

class PropriedadesTables extends Component {
    componentDidMount() {
        this.props.fetchPropriedades();
    }
    render() {
        return (
            <div>
                <ListGroup>
                    {this.props.data.propriedades.map((p) => {
                        return (
                            <ItemCollapsable
                                title={p.nome}
                                data={p.descricao}
                                key={p.name}
                            />
                        );
                    })}
                </ListGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.propriedades,
});

export default connect(mapStateToProps, { fetchPropriedades })(
    PropriedadesTables
);
