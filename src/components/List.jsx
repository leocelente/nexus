import React, { useState } from "react";
import {  Button, ListGroup } from "react-bootstrap";

function List(props) {
  // eslint-disable-next-line
  const [_, setKey] = useState(0);
  return (
    <div>
      <ListGroup defaultActiveKey={0} onSelect={(k) => setKey(k)}>
        <ListGroup.Item>
          <h4>{props.title}</h4>
        </ListGroup.Item>
        {props.items.map((item, idx) => (
          <ListGroup.Item action eventKey={idx} key={idx} className="d-flex justify-content-between align-items-center">
            {item}
            <Button size="sm" variant="outline-secondary" onClick={()=>props.onSaibaMais(idx)}>Saiba Mais</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default List;
