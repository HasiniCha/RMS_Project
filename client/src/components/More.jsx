import React, { useState } from "react";




const More = ({value,handleArrowClick}) => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [ClickedValues, setClickedValues] = useState("");



  

  
  const handleEditClick = () => {
  
    console.log("Edit icon clicked");
  };

 

  const handleDivClick = (value) => {
    setClickedValues(value);
    setShowEditBox(!showEditBox);
    console.log("Here is in div click:", value);
  };
                
  
  return (
    <div style={{ position: "relative" }} onClick={() => handleDivClick(value)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-three-dots"
        viewBox="0 0 16 16"
      
      >
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
      </svg>

      {showEditBox && (
        <div
          style={{
            border: "1px solid black",
            padding: "5px",
            position: "absolute",
            top: "-30px",
            left: "20px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "10px" }} onClick={handleEditClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </div>
          <div onClick={handleArrowClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-up-right"
              viewBox="0 0 16 16"
              style={{ marginBottom: "2px" }}
            >
              <path
                fillRule="evenodd"
                d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
              />
              <path
                fillRule="evenodd"
                d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default More;
