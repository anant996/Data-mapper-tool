import React, { useState } from "react";
import "./Table.css";

function Table() {
  const [jsonData, setJsonData] = useState([
    {
      tablename: "EMPLOYEE",
      columns: [
        {
          columnName: "EmpName",
          datatype: "String",
          value: "",
        },
        {
          columnName: "Salary",
          datatype: "Integer",
          value: "",
        },
        {
          columnName: "Email",
          datatype: "Text",
          value: "",
        },
      ],
    },
    {
      tablename: "PRODUCT",
      columns: [
        {
          columnName: "ProductName",
          datatype: "String",
          value: "",
        },
        {
          columnName: "Price",
          datatype: "Float",
          value: "",
        },
        {
          columnName: "Category",
          datatype: "String",
          value: "",
        },
      ],
    },
  ]);

  const [isMainTableExpanded, setMainTableExpanded] = useState(false);
  const [isTableExpanded, setTableExpanded] = useState(Array(jsonData.length).fill(false));
  const [areColumnsExpanded, setColumnsExpanded] = useState(
    jsonData.map((table) => false)
  );

  const toggleMainTable = () => {
    setMainTableExpanded(!isMainTableExpanded);
  };

  const toggleTable = (tableIndex) => {
    const updatedIsTableExpanded = [...isTableExpanded];
    updatedIsTableExpanded[tableIndex] = !updatedIsTableExpanded[tableIndex];
    setTableExpanded(updatedIsTableExpanded);
  };

  const toggleColumnArray = (tableIndex) => {
    const updatedAreColumnsExpanded = [...areColumnsExpanded];
    updatedAreColumnsExpanded[tableIndex] = !updatedAreColumnsExpanded[tableIndex];
    setColumnsExpanded(updatedAreColumnsExpanded);
  };

  const handleColumnChange = (e, tableIndex, columnIndex) => {
    const newValue = e.target.value;
    const updatedData = [...jsonData];
    const currentValues = updatedData[tableIndex].columns.map((column) => column.value);

    if (currentValues.includes(newValue)) {
      e.target.classList.add("duplicate-column");
    } else {
      updatedData[tableIndex].columns[columnIndex].value = newValue;
      setJsonData(updatedData);
      e.target.classList.remove("duplicate-column");
    }
  };

  const generateMappingJSON = () => {
    const mapping = {};
    jsonData.forEach((table) => {
      const tableName = table.tablename;
      mapping[tableName] = {};
      table.columns.forEach((column) => {
        mapping[tableName][column.columnName] = column.value;
      });
    });
    return JSON.stringify(mapping, null, 2);
  };

  const handleDownloadJSON = () => {
    const mappingJSON = generateMappingJSON();
    const blob = new Blob([mappingJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mapping.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="MainTable">
        <h1 className="head-cent">
          TABLES
          <button className="expand-button" onClick={toggleMainTable}>
            {isMainTableExpanded ? "-" : "+"}
          </button>
        </h1>
        {isMainTableExpanded &&
          jsonData.map((table, tableIndex) => (
            <div className="Table" key={tableIndex}>
              <h2>
                {table.tablename}
                <button className="expand-button" onClick={() => toggleTable(tableIndex)}>
                  {isTableExpanded[tableIndex] ? "-" : "+"}
                </button>
              </h2>
              {isTableExpanded[tableIndex] && (
                <div className="container">
                  <h3>
                    Columns
                    <button
                      className="expand-button"
                      onClick={() => toggleColumnArray(tableIndex)}
                    >
                      {areColumnsExpanded[tableIndex] ? "-" : "+"}
                    </button>
                  </h3>
                  {areColumnsExpanded[tableIndex] && (
                    <div className="column-container">
                      {table.columns.map((column, columnIndex) => (
                        <div key={columnIndex}>
                          <p>
                            <strong>cName:</strong> {column.columnName}{" "}
                            <input
                              type="text"
                              value={column.value}
                              placeholder="Enter value"
                              onChange={(e) => handleColumnChange(e, tableIndex, columnIndex)}
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
          ))}
      </div>
      <div className="center-button-container">
        <button onClick={handleDownloadJSON}>Download JSON</button>
      </div>
    </>
  );
}

export default Table;
