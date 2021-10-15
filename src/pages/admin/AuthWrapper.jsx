import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { is_logged } from "../../redux/actions/usuarioActions";

export class AuthWrapper extends Component {
    constructor(props) {
        super(props);
        this.props.is_logged();
    }
    render() {
        if (this.props.logado === true) {
            return <div>{this.props.children}</div>;
        } else if (this.props.logado === null) {
            return <div className="black">Checando permissões...</div>;
        } else {
            return (
                <div>
                    <Card>
                        <Card.Title className="black">
                            Você não está autenticado!
                        </Card.Title>
                        <Card.Body>
                            <Link to="/login">
                                <Button>Faça o Login</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    logado: state.authentication.logado,
});

const mapDispatchToProps = { is_logged };

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
