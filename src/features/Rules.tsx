import React, { useEffect, useState } from "react";
import data from "./journal_specs_test.json";
import { fieldMapping } from "./constant";
import { CustomAccordion } from "./CustomAccordion";
import Accordion from "react-bootstrap/esm/Accordion";

export interface DataObject {
  id: string; // Assuming the ID is a string based on your JSON
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Rules = () => {
  const [rules, setRules] = useState<DataObject | undefined>();

  const searchById = (id: string): DataObject | undefined => {
    return data.find((obj) => obj.id === id);
  };

  useEffect(() => {
    const journalData = searchById("27869");
    console.log("Journal Data:", journalData);
    setRules(journalData);
  }, []);

  return (
    <div style={{ backgroundColor: "#f4f5f8" }}>
      <div className="rules-container">
        <h1 className="rules-title">
          The journal you selected needs the following:
        </h1>
        {rules && (
          <div>
            {/* Iterate through each group in the mapping */}
            {Object.entries(fieldMapping).map(
              ([groupName, { fields, labels }]) => (
                <div key={groupName}>
                  <h2>{groupName}</h2>

                  <Accordion>
                    {fields.map((field, index) => (
                      <Accordion.Item key={field} eventKey={`${index}`}>
                        <Accordion.Header>
                          {`${labels[Object.keys(labels)[index]]}`}
                        </Accordion.Header>
                        <Accordion.Body> {`${rules[field]}`}</Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
