import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, ListGroup, Form } from "react-bootstrap";

export default class List extends Component {
    static propTypes = {
        title: PropTypes.string,
        onSelect: PropTypes.func,
        startValue: PropTypes.number,
    };

    constructor(props) {
        super(props);

        let val = 0;
        if (!props.startValue) val = 0;

        this.state = {
            field: [],
        };
    }

    setField(field) {
        this.setState({
            field,
        });
    }

    render() {
        const cid = `m${this.props.title.replaceAll(" ", "")}`;
        return (
            <div>
                {/* <Form.Group> */}
                <Form.Control
                    as="select"
                    id={`${cid}_sel`}
                    multiple
                    value={this.state.field}
                    onChange={(e) => {
                        const k = [].slice
                            .call(e.target.selectedOptions)
                            .map((item) => parseInt(item.value));
                        this.setField(k);
                        if (this.props.onSelect) this.props.onSelect(k);
                    }}
                    className="list-group"
                >
                    {this.props.items.map((item, idx) => (
                        <option
                            as={ListGroup.Item}
                            action
                            value={idx}
                            key={idx}
                            className="list-group-item d-flex listgroup-item justify-content-between align-items-center"
                            style={{ fontSize: "1rem" }}
                        >
                            {item}
                        </option>
                    ))}
                </Form.Control>
                {/* </Form.Group> */}
            </div>
        );
    }
}
