import React, {  useState } from "react";
import { ListGroup } from "react-bootstrap";

function List(props) {
    // eslint-disable-next-line
    const [_, setKey] = useState(0);
  return (
    <div>
      <ListGroup defaultActiveKey={0} onSelect={(k) => setKey(k)}>
        <ListGroup.Item >
            <h4>{props.title}</h4>
        </ListGroup.Item>
        {props.items.map((item, idx) => (
          <ListGroup.Item action eventKey={idx} key={idx}>
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default List;
