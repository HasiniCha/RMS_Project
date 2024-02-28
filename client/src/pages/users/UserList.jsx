import React, { useState, useEffect } from "react";
import TopicField from "../../components/TopicSection";
import { Col } from "react-bootstrap";
import NavTop from "../../components/NavTop";
import NavLeft from "../../components/NavLeft";
import Table from "../../components/Table";
import { Container,Row, } from "react-bootstrap";
import {toastFunction} from '../../components/ToastFunction';
import {BASE_URL, USER_URL} from "../../utils/Constants";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData,deleteUser } from '../../store/actions/RmsActions'; 
import { selectUserData } from '../../store/Stores';


const Main = () => {
 
   const dispatch = useDispatch();
   const userData = useSelector(selectUserData);

 
  const [tableData] = useState([
    [""],
    ["firstName"],
    ["lastName"],
    ["designation"],
    ["email"],
    ["validFrom"],
    ["validTill"],
  ]);

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
    checkedValues.forEach((id) => deleteUsers(id));
   
  };
    


useEffect(() => {
  dispatch(fetchData());
}, [dispatch]);



  const deleteUsers = async (id) => {
    try{
      dispatch(deleteUser(id));
      
    }catch(error){
      console.log(error);
    }
    toastFunction("Deleted Successfully", false);
    
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
              <Table columns={tableData} data={userData.users}  handleCheckboxChange={handleCheckboxChange} checkedValues={checkedValues} search={search} />

            </div>
          </Col>
        </Row>
      </Container>
    
    </div>
  );
};

export default Main;
