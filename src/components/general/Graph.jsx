import React, { useState } from "react";
import { ButtonGroup, Col, Dropdown } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";

export default function Graph({ data, option }) {
    const [type, setType] = useState("bar");
    console.log(type);
    if (type === "line") {
        return (
            <Col>
                <Dropdown
                    title="Gráfico"
                    as={ButtonGroup}
                    size="sm"
                    onSelect={(x) => setType(x)}
                >
                    <Dropdown.Item eventKey="bar">Barras</Dropdown.Item>
                    <Dropdown.Item eventKey="line" active>
                        Linha
                    </Dropdown.Item>
                </Dropdown>
                <Line className="left-column" data={data} />
            </Col>
        );
    } else {
        return (
            <Col>
                <Dropdown
                    title="Gráfico"
                    as={ButtonGroup}
                    size="sm"
                    onSelect={(x) => setType(x)}
                >
                    <Dropdown.Item eventKey="bar" active>
                        Barras
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="line">Linha</Dropdown.Item>
                </Dropdown>
                <Bar className="left-column" data={data} options={option} />
            </Col>
        );
    }
}
