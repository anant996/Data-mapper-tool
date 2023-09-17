import React, { useState } from "react";
import "./Table.css";

function Table() {
  const [jsonData, setJsonData] = useState({
    tablename: "EMPLOYEE",
    columns: [
      {
        EmpName: "Column1",
        datatype: "String",
        value: "",
      },
      {
        Salary: "Column2",
        datatype: "Integer",
        value: "",
      },
      {
        Email: "Column3",
        datatype: "Text",
        value: "",
      },
    ],
  });

  const [isTableExpanded, setTableExpanded] = useState(false);
  const [areColumnsExpanded, setColumnsExpanded] = useState([false, false]);

  const toggleTable = () => {
    setTableExpanded(!isTableExpanded);
  };

  const toggleColumn = (columnIndex) => {
    const updatedColumns = [...areColumnsExpanded];
    updatedColumns[columnIndex] = !updatedColumns[columnIndex];
    setColumnsExpanded(updatedColumns);
  };

  const handleColumnChange = (e, columnIndex) => {
    const newValue = e.target.value;
    const updatedData = { ...jsonData };
    const currentValues = updatedData.columns.map((column) => column.value);
  
    // Check if the new value is unique among the current values
    if (!currentValues.includes(newValue) || newValue === "") {
      updatedData.columns[columnIndex].value = newValue;
      setJsonData(updatedData);
    }
  };

  const handleDownloadJSON = () => {
    const updatedJSON = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([updatedJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "updated_json.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="Table">
        <h1>
          Tables
          <button className="expand-button" onClick={toggleTable}>
            {isTableExpanded ? "-" : "+"}
          </button>
        </h1>
        {isTableExpanded && (
          <div className="container">
            <h2>Table Name: {jsonData.tablename}</h2>
            <h3>
              Columns
              <button className="expand-button" onClick={() => toggleColumn(0)}>
                {areColumnsExpanded[0] ? "-" : "+"}
              </button>
            </h3>
            {areColumnsExpanded[0] && (
              <div className="column-container">
                {jsonData.columns.map((column, index) => (
                  <div key={index}>
                    <p>
                      <strong>cName:</strong> {Object.keys(column)[0]}{" "}
                      <input
                        type="text"
                        value={column.value}
                        placeholder="Key"
                        onChange={(e) => handleColumnChange(e, index)}
                      />
                    </p>
                    <p>
                      <strong>Datatype:</strong> {column.datatype}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="center-button-container">
        <button onClick={handleDownloadJSON}>Download JSON</button>
      </div>
    </>
  );
}

export default Table;
