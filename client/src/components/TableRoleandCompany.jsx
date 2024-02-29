import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Check from "../components/checkbox";

const Table = ({ columns, data, grant, checkedValues ,grantedCodes}) => {
  return (
    <div className="d-flex align-items-stretch">
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((userdata) => (
            <tr key={userdata.id}>
              <td>{userdata.id}</td>
              <td>{userdata.name}</td>
              <td>
                <Check
                  value={userdata.id}
                  isChecked={checkedValues.includes(userdata.name)}
                  onCheckboxChange={(isChecked) => grant(isChecked, userdata.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
