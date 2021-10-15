import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/general/Header";
import PageBase from "../../components/general/PageBase";
import Select from "../../components/general/Select";
import AuthWrapper from "./AuthWrapper";
import CtrlIndicadores from "./CtrlIndicadores";
import CtrlPraticas from "./CtrlPraticas";
import { connect } from "react-redux";
import { select_propriedade } from "../../redux/actions/adminActions";
import { fetchPropriedades } from "../../redux/actions/propriedadesActions";

export class Admin extends Component {
    componentDidMount() {
        this.props.fetchPropriedades();
    }

    render() {
        const propriedades = this.props.propriedades;
        return (
            <div>
                <Header />
                <div className="admin-wapper">
                    <AuthWrapper role="admin">
                        <PageBase
                            left={
                                <div className="black">
                                    <CtrlIndicadores
                                        propriedade={this.props.propriedade}
                                    />{" "}
                                    <hr />{" "}
                                    <CtrlPraticas
                                        propriedade={this.props.propriedade}
                                    />
                                </div>
                            }
                            right={
                                <Card>
                                    <Card.Title>
                                        <h4>Administração de Dados</h4>
                                    </Card.Title>
                                    <Card.Text style={{ color: "black" }}>
                                        Como técnico responsável você tem
                                        controle sobre os dados de toda
                                        plataforma.
                                    </Card.Text>
                                    <Card.Body>
                                        <Select
                                            items={propriedades.map(
                                                (p) =>
                                                    p === undefined
                                                        ? ""
                                                        : p.nome,
                                                propriedades
                                            )}
                                            onSelect={(index) => {
                                                this.props.select_propriedade(
                                                    propriedades[index]
                                                );
                                            }}
                                            title="Propriedades"
                                        />
                                    </Card.Body>
                                </Card>
                            }
                        />
                    </AuthWrapper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    propriedades: state.propriedades.propriedades,
    propriedade: state.admin.propriedade,
});

const mapDispatchToProps = { select_propriedade, fetchPropriedades };

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
