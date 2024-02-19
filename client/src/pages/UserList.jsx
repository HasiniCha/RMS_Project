import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopicField from "../components/TopicSection";
import { Col } from "react-bootstrap";
import NavTop from "../components/NavTop";
import NavLeft from "../components/NavLeft";
import Table from "../components/Table";
import { Container,Row, } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import api from "../utils/constant";


const Main = () => {

 
  const [tableData] = useState([
    [""],
    ["firstName"],
    ["lastName"],
    ["Companies"],
    ["designation"],
    ["email"],
    ["validFrom"],
    ["validTill"],
  ]);

  const [userData, setUserData] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckboxChange = (isChecked, value) => {
    if (isChecked) {
      setCheckedValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckedValues((prevValues) =>
        prevValues.filter((val) => val !== value)
      );
    }
  };

  const handleDeleteSelected = () => {
    checkedValues.forEach((id) => deleteUser(id));
    toast.success('Deleted Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    
      });
  };
    
  const fetchData = async () => {
  try {
    const response = await api.get(`/users`);
   
    setUserData(response.data);
  } catch(error) {
    console.error("Error fetching data:", error);
  }
}
  useEffect(() => {
   
    fetchData();
  }, []); 

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <div>
      <NavTop />
      <Container fluid>
        <Row>
          <NavLeft />
          <Col sm={9} style={{ padding: "35px" }}>
            <div
              style={{
                border: "4px solid #B5A28C",
                padding: 10,
                borderRadius: "10px",
              }}
            >
              <TopicField  topic="Users" showInputGroup1={true} showInputGroup2={true} showCreate={true} showDelete={true} showSave={false} showEdit={false} DeleteClick={handleDeleteSelected}  />
              <Table columns={tableData} data={userData}  handleCheckboxChange={handleCheckboxChange} checkedValues={checkedValues}  />

            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
    </div>
  );
};

export default Main;
