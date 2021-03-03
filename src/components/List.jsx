import React, { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

function List(props) {
  const [_, setKey] = useState(0);
  return (
    <div>
      <ListGroup  onSelect={(k) => {setKey(k); if(props.onSelect) props.onSelect(k)}}>
        <ListGroup.Item>
          <h4>{props.title}</h4>
        </ListGroup.Item>
        {props.items.map((item, idx) => (
          <ListGroup.Item
            action
            eventKey={idx}
            key={idx}
            className="d-flex justify-content-between align-items-center"
          >
            {item}
            {props.onSaibaMais == null ? <span></span> : (<Button
      size="sm"
      variant="outline-secondary"
      onClick={() => props.onSaibaMais(idx)}
    >
      Saiba Mais
    </Button>) }
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default List;
