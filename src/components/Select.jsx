import React from "react";
import { Card, Form } from "react-bootstrap";

export default function Select(props) {
  return (
    <div>
      <Card>
        <Card.Title style={{ textAlign: "center" }}>
          <h4>{props.title}</h4>
        </Card.Title>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select">
              {props.items.map((item, idx) => (
                <option action eventKey={idx} key={idx}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
}
