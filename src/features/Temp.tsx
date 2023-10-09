import React, { useState } from "react";
import jsonData from "./journal_specs_test.json"; // Adjust the path as needed

// Type for the object structure
interface DataObject {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Function to search for an object by id
function searchById(id: number): DataObject | undefined {
  return jsonData.find((obj: DataObject) => obj.id === id);
}

// Component to display the fields on your page
const Temp: React.FC<{ id: number }> = ({ id }) => {
  const [result, setResult] = useState<DataObject | undefined>(undefined);

  const handleDisplay = () => {
    const foundObject = searchById(id);
    setResult(foundObject);
  };

  return (
    <div>
      <button onClick={handleDisplay}>Display Fields</button>
      {result && (
        <ul>
          {/* Create a list item for each attribute */}
          {Object.entries(result).map(([key, value]) => (
            <li key={key}>{`${value}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Temp;
