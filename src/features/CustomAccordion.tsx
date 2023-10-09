import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { DataObject } from "./Rules";

export const CustomAccordion = ({
  rules,
  fields,
  labels,
}: {
  rules: DataObject;
  fields: string[];
  labels: {
    [key: string]: string;
  }[];
}) => {
  console.log(fields);
  return (
    <>
      <Accordion>
        {fields.map((field, index) => (
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {labels[Object.keys(labels)[index]]}
            </Accordion.Header>
            <Accordion.Body>{rules[field]}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};
