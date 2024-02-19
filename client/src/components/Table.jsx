import React from "react";
import { useNavigate } from 'react-router-dom';



import "bootstrap/dist/css/bootstrap.min.css";
import More from "../components/More";
import Check from "../components/checkbox";

const Table = ({ columns, data,  handleCheckboxChange, checkedValues }) => {
  const navigate = useNavigate();

  const handleArrowClick = (data) => {
    navigate(`/useroverview/${data.userid}`);
    console.log("Here table click:",data.userid);
};
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
          {data.map((userdata) => (
            <tr key={userdata.id}>
              <td style={{ display: "flex", alignItems: "center" }}>
                <Check
                  value={userdata.id}
                  isChecked={checkedValues.includes(userdata.id)}
                  onCheckboxChange={handleCheckboxChange}
                />
                <div style={{ margin: "8px" }}>
                <More value={userdata.id} handleArrowClick={handleArrowClick} />
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
