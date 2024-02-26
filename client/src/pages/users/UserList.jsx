import React, { useState, useEffect } from "react";
import TopicField from "../../components/TopicSection";
import { Col } from "react-bootstrap";
import NavTop from "../../components/NavTop";
import NavLeft from "../../components/NavLeft";
import Table from "../../components/Table";
import { Container,Row, } from "react-bootstrap";
import {toastFunction} from '../../components/ToastFunction';
import api from "../../utils/Constants";




const Main = () => {

 
  const [tableData] = useState([
    [""],
    ["firstName"],
    ["lastName"],
    ["designation"],
    ["email"],
    ["validFrom"],
    ["validTill"],
  ]);

  const [userData, setUserData] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [search, setSearch] = useState('');

  


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
      toastFunction("Deleted Successfully",false)
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
              <TopicField  topic="Users" showInputGroup1={true} showInputGroup2={true} showCreate={true} showDelete={true} showSave={false} showEdit={false} DeleteClick={handleDeleteSelected} search={search} setSearch={setSearch}  />
              <Table columns={tableData} data={userData}  handleCheckboxChange={handleCheckboxChange} checkedValues={checkedValues} search={search} />

            </div>
          </Col>
        </Row>
      </Container>
    
    </div>
  );
};

export default Main;
