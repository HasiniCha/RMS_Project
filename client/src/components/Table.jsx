import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import More from "../components/More";
import Check from "../components/checkbox";

const Table = ({ columns, data,  handleCheckboxChange, checkedValues ,search}) => {
 

  return (
    <div className="d-flex align-items-stretch">
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.filter((userdata)=>{return search.toLowerCase()===''? userdata:userdata.firstName.toLowerCase().includes(search);})
          .map((userdata) => (
            <tr key={userdata.id}>
              <td style={{ display: "flex", alignItems: "center" }}>
                <Check
                  value={userdata.id}
                  isChecked={checkedValues.includes(userdata.id)}
                  onCheckboxChange={handleCheckboxChange}
                />
                <div style={{ margin: "8px" }}>
                <More value={userdata.id}  />
                </div>
              </td>
              {columns.map((column, index) => (
                <td key={index}>{userdata[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
