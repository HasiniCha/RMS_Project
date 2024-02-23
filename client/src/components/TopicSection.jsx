import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import SearchBar from  "../components/SearchBar";

const Topic = ({ topic, showInputGroup1, showInputGroup2  ,showCreate,showEdit,showSave,showDelete,DeleteClick,SaveClick,EditClick,search,setSearch}) => {
  const navigate = useNavigate();

  const createUser = () => {
    navigate('/createUser');
  };



  return (
    <div
      className="container"
      style={{
        backgroundColor: "#B5A28C",
        padding: 10,
        marginBottom: 40,
        borderRadius: "10px",
        paddingLeft: "30px",
        fontFamily: "sans-serif",
        paddingTop: 20,

      }}
    >
      <div className="row align-items-center">
        <div className="col-md-4">
          <h5>{topic}</h5>
        </div>
        {showInputGroup1 && (
          <div className="col-md-4">
           <SearchBar search={search} setSearch={setSearch}/>
          </div>
        )}

        {showInputGroup2 && (
          <div className="col-md-4">
            <ul className="nav justify-content-end">
              <li className="nav-item">
             {showCreate &&( <div
  style={{ width: "46px", height: "46px", marginRight: "" }}
  onClick={createUser}
>
  <FontAwesomeIcon icon={faPlus} />
</div>)}
              </li>
              <li className="nav-item">
             { showSave&&(  <div
                  style={{ width: "26px", height: "26px", marginRight: "10px" } }    onClick={SaveClick} 
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-floppy"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 2H9v3h2z" />
                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                  </svg>
                </div>)}
              </li>
              <li className="nav-item">
               {showEdit &&( <div
                  style={{ width: "26px", height: "26px", marginRight: "10px" }}  onClick={EditClick} 
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </div>)}
              </li>
              <li className="nav-item">
              {showDelete && (
    <div
        style={{ width: "26px", height: "26px", marginRight: "10px" }}
        onClick={DeleteClick} 
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
        >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
        </svg>
    </div>
)}

              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic;
