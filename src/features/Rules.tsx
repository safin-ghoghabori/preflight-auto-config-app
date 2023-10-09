import React, { useEffect, useState } from "react";
import data from "./journal_specs_test.json";
import { fieldMapping } from "./constant";
import Accordion from "react-bootstrap/esm/Accordion";
import "./styles.css";
import { useParams } from "react-router";

export interface DataObject {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Rules = () => {
  const [rules, setRules] = useState<DataObject | undefined>();
  const { id } = useParams<{ id: string }>();

  const searchById = (id: string): DataObject | undefined => {
    return data.find((obj) => obj.id === id);
  };

  useEffect(() => {
    if (id) {
      const journalData = searchById(id);
      setRules(journalData);
    }
  }, [id]);

  return (
    <div style={{ backgroundColor: "#f4f5f8", height: "100%" }}>
      <div className="rules-container">
        <h3 className="rules-title" style={{ paddingTop: "20px" }}>
          The journal you selected needs the following checks:
        </h3>
        {rules && (
          <div>
            {/* Iterate through each group in the mapping */}
            {Object.entries(fieldMapping).map(
              ([groupName, { fields, labels }]) => {
                // Check if all rules have a value of false or null
                const allRulesFalseOrNull = fields.every(
                  (field) => rules[field] === false || rules[field] === null
                );

                // Render the group only if not all rules have a value of false or null
                return !allRulesFalseOrNull ? (
                  <div key={groupName}>
                    <h5 style={{ padding: "0 10px", marginTop: "20px" }}>
                      {groupName}
                    </h5>

                    <Accordion style={{ padding: "0 10px" }}>
                      {fields.map((field, index) => {
                        // Check if the rule has a non-false and non-null value
                        if (rules[field] !== false && rules[field] !== null) {
                          return (
                            <Accordion.Item key={field} eventKey={`${index}`}>
                              <p>{`${labels[Object.keys(labels)[index]]}:`}</p>
                              <span>{`${rules[field]}`}</span>
                            </Accordion.Item>
                          );
                        }

                        return null;
                      })}
                    </Accordion>
                  </div>
                ) : null;
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};
