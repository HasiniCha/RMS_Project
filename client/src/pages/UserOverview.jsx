import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Col } from "react-bootstrap";
import NavTop from "../components/NavTop";
import NavLeft from "../components/NavLeft";
import { Container, Row } from "react-bootstrap";
import TopicField from "../components/TopicSection";
import TextField from "../components/TextField";
import api from "../utils/constant";
import TableCompany from "../components/TableRoleandCompany";
import { useParams } from 'react-router-dom';

const Data = () => {
  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [checkedCompanyValues, setCheckedCompanyValues] = useState([]);
  const [checkedRoleValues, setCheckedRoleValues] = useState([]); 
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [display, setDisplay] = useState([false]);
  
 
  let { value } = useParams();

  

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const grant = (isChecked, value, table) => {
    if (table === 'company') {
      if (isChecked) {
        setCheckedCompanyValues((prevValues) => [...prevValues, value]);
      } else {
        setCheckedCompanyValues((prevValues) =>
          prevValues.filter((val) => val !== value)
        );
      }
    } else if (table === 'role') {
      if (isChecked) {
        setCheckedRoleValues((prevValues) => [...prevValues, value]);
      } else {
        setCheckedRoleValues((prevValues) =>
          prevValues.filter((val) => val !== value)
        );
      }
    }
    handleGrant();
  };

  const handleGrant = () => {
    checkedCompanyValues.forEach((id) => Displaygranted(id));
    checkedRoleValues.forEach((id) => Displaygranted(id));
  };

  const Displaygranted = () => {
    setDisplay(!display);
  };

  const id = value;

  const fetchData = async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      const responseCompany = await api.get(`/company`);
      const responseRole = await api.get(`/roles`);

      setUserData({
        userID:response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        designation: response.data.designation,
        email: response.data.email,
        password:response.data.password,
        validFrom: response.data.validFrom,
        validTill: response.data.validTill,
        companies:response.data.companies,
        roles:response.data.roles
      });
       
      setCompanyData(responseCompany.data);
      setRoleData(responseRole.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Here overView",value);
  };

  const handleSave = async () => {
    if (activeTab === "General") {
      try {
        const updatedUserData = {
          id: id,
          ...userData,
          userID:userData.email,
        };
        await api.put(`/users/${id}`, updatedUserData);
        setEditMode(false);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else if (activeTab === "Companies") {
      const updatedUserData = {
        ...userData,
        companies:checkedCompanyValues
      };
      await api.put(`/users/${id}`, updatedUserData);
  
    } else if (activeTab === "Roles") {
      const updatedUserData = {
        ...userData,
 roles:checkedRoleValues
      };
      await api.put(`/users/${id}`, updatedUserData);
    }
  }

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  };

  const [activeTab, setActiveTab] = useState("General");

  const [roleTableData] = useState([["Role"], ["RoleName"], ["Grant"]]);
  const [companyTableData] = useState([
    ["CompanyCode"],
    ["Company"],
    ["Grant"],
  ]);

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
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
              <TopicField
                topic="User Overview"
                showInputGroup1={false}
                showInputGroup2={true}
                showCreate={activeTab === "General" ? true : false}
                showEdit={activeTab === "General" ? !editMode:false}
                showSave={activeTab === "General" ? editMode:true}
                showDelete={false}
                SaveClick={handleSave}
                EditClick={handleEditClick}
                SearchBar={handleSearch}
              />
              <Tabs
                id="fill-tab-example"
                className="mb-3"
                fill
                activeKey={activeTab}
                onSelect={handleSelect}
              >
                <Tab
                  eventKey="General"
                  title="General"
                  style={
                    activeTab === "General"
                      ? { backgroundColor: "#E1D9D1", padding: 20 }
                      : null
                  }
                >
                  <div style={{ margin: 10, padding: 20 }}>
                    {editMode ? (
                      <>
      <TextField
                  id="userID"
                  type="text"
                  text="User ID:"
                  value={userData.email}
                  disabled
                />
                        <TextField
                          id="firstName"
                          type="text"
                          text="First Name:"
                          value={userData.firstName}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="lastName"
                          type="text"
                          text="Last Name:"
                          value={userData.lastName}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="designation"
                          type="text"
                          text="Designation:"
                          value={userData.designation}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="email"
                          type="text"
                          text="Email:"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="validFrom"
                          type="text"
                          text="Valid From:"
                          value={userData.validFrom}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="validTill"
                          type="text"
                          text="Valid Till:"
                          value={userData.validTill}
                          onChange={handleInputChange}
                        />
                      </>
                    ) : (
                      <>
                      <TextField
                  id="userID"
                  type="text"
                  text="User ID:"
                  value={userData.email}
                  disabled
                />
                        <TextField
                          id="firstName"
                          type="text"
                          text="First Name:"
                          value={userData.firstName}
                          disabled
                        />
                        <TextField
                          id="lastName"
                          type="text"
                          text="Last Name:"
                          value={userData.lastName}
                          disabled
                        />
                        <TextField
                          id="designation"
                          type="text"
                          text="Designation:"
                          value={userData.designation}
                          disabled
                        />
                        <TextField
                          id="email"
                          type="text"
                          text="Email:"
                          value={userData.email}
                          disabled
                        />
                        <TextField
                          id="validFrom"
                          type="text"
                          text="Valid From:"
                          value={userData.validFrom}
                          disabled
                        />
                        <TextField
                          id="validTill"
                          type="text"
                          text="Valid Till:"
                          value={userData.validTill}
                          disabled
                        />
                      </>
                    )}
                  </div>
                </Tab>
                <Tab
                  eventKey="Companies"
                  title="Companies"
                  style={
                    activeTab === "Companies"
                      ? { backgroundColor: "#E1D9D1", padding: 20 }
                      : null
                  }
                >
                  <TableCompany
                    columns={companyTableData}
                    data={companyData}
                    checkedValues={checkedCompanyValues}
                    display={display}
                    grant={(isChecked, value) => grant(isChecked, value, 'company')}
                  />
                </Tab>
                <Tab
                  eventKey="Roles"
                  title="Roles"
                  style={
                    activeTab === "Roles"
                      ? { backgroundColor: "#E1D9D1", padding: 20 }
                      : null
                  }
                >
                  <TableCompany
                    columns={roleTableData}
                    data={roleData}
                    grant={(isChecked, value) => grant(isChecked, value, 'role')}
                    display={display}
                    checkedValues={checkedRoleValues}
                  />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Data;
