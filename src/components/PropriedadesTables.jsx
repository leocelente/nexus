import React, { Component, useState } from "react";
import { Button, ListGroup, Collapse } from "react-bootstrap";
import List from "./List";
import TableJson from "./TableJson";
import propriedades from "../api/mock/propriedades";

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
      <Collapse in={open} onClick={() => {}}>
        <div id="example-collapse-text">
          <TableJson data={props.data} />
        </div>
      </Collapse>
    </div>
  );
}

export default class PropriedadesTables extends Component {
  render() {
    console.log(Object.entries(propriedades));
    return (
      <div>
        <ListGroup>
          {Object.entries(propriedades).map((x) => (
            <ItemCollapsable
              title={x[0]}
              data={propriedades[x[0]]}
              key={x[0]}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}
