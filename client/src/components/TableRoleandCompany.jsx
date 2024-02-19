import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Check from "../components/checkbox";

const Table = ({ columns, data, grant, checkedValues }) => {
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
          {data.map((userdata, index) => (
            <tr key={index}>
              <td>{userdata.id}</td>
              <td>{userdata.name}</td>
              <td>
                <Check
                  value={userdata.id}
                  isChecked={checkedValues.includes(userdata.id)}
                  onCheckboxChange={(isChecked) => grant(isChecked, userdata.id)}
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
