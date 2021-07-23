import React, { useState } from "react";
import { Button, ListGroup, Form } from "react-bootstrap";

export default function List(props) {
    const [field, setField] = useState([]);
    return (
        <div>
            <Form.Group controlId="my_multiselect_field">
                <Form.Label></Form.Label>
                <Form.Control
                    as="select"
                    multiple
                    value={field}
                    onChange={(
                        e //{}
                    ) => {
                        const k = [].slice
                            .call(e.target.selectedOptions)
                            .map((item) => parseInt(item.value));
                        setField(k);
                        if (props.onSelect) props.onSelect(k);
                    }}
                    // style={{}}
                    className="list-group"
                >
                    {/* <ListGroup.Item>
                        <h4>{props.title}</h4>
                    </ListGroup.Item> */}

                    {props.items.map((item, idx) => (
                        <option
                            as={ListGroup.Item}
                            action
                            value={idx}
                            key={idx}
                            className="list-group-item d-flex listgroup-item justify-content-between align-items-center"
                            style={{ fontSize: "1rem" }}
                        >
                            {item}
                            {/* {props.onSaibaMais === null ? (
                                <span></span>
                            ) : (
                                <a
                                    size="sm"
                                    variant="outline-secondary"
                                    onClick={() => props.onSaibaMais(idx)}
                                >
                                    Saiba Mais
                                </a>
                            )} */}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
        </div>
    );
}
