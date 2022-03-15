import React, { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
/**
 * Wrapper para o ListGroup da React-Boostrap com
 * eventos do botão e um botão extra em cada linha para
 * mais informações (saiba mais), caso não null
 */

export default class SingleList extends Component {
    static propTypes = {
        prop: PropTypes,
    };
    componentDidUpdate(prevProps, prevState) {
        const isSame = (a, b) => {
            if (a.length !== b.length) return false;
            return a.every((v, i) => v === b[i]);
        };

        // Detecta quando há uma mudança nos itens apresentados
        // então reseta o item selecionado para o primeiro
        // usado quando há mudança no atributo selecionado
        if (!isSame(this.props.items, prevProps.items)) {
            this.setKey(0);
        }
    }

    componentDidMount() {
        this.setKey(0);
    }

    constructor(props) {
        super(props);
        this.state = {
            key: 0,
        };
    }

    setKey(key) {
        this.setState({ key });
    }

    render() {
        return (
            <div>
                <ListGroup
                    onSelect={(k) => {
                        this.setKey(k);
                        if (this.props.onSelect) this.props.onSelect(k);
                    }}
                    defaultValue={0}
                    key={this.state.key}
                    activeKey={this.state.key}
                >
                    <ListGroup.Item>
                        <h4>{this.props.title}</h4>
                    </ListGroup.Item>
                    {this.props.items.map((item, idx) => (
                        <ListGroup.Item
                            action
                            eventKey={idx}
                            key={idx}
                            className="d-flex justify-content-between align-items-center"
                        >
                            {item}
                            {this.props.onSaibaMais == null ? (
                                <span></span>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() => this.props.onSaibaMais(idx)}
                                >
                                    Saiba Mais
                                </Button>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        );
    }
}
