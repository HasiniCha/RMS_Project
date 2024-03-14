import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Col } from "react-bootstrap";
import NavTop from "../../../../client/src/components/NavTop";
import NavLeft from "../../../../client/src/components/NavLeft";
import { Container, Row } from "react-bootstrap";
import TopicField from "../../../../client/src/components/TopicSection";
import TextField from "../../../../client/src/components/TextField";
import Dropdown from "../../../../client/src/components/DropDown";
import TableCompany from "../../../../client/src/components/TableRoleandCompany";
import { useParams } from "react-router-dom";
import {
  BASE_URL,
  USER_URL,
  COMPANY_URL,
  ROLE_URL,
} from "../../../../client/src/utils/Constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  fetchCompanyData,
  fetchRoleData,
  updateUserData,
} from "../../../../client/src/store/actions/RmsActions";
import { selectUserData } from "../../../../client/src/store/Stores";

const Data = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const [filteredUserData, setFilteredUserData] = useState(userData);

  const [checkedCompanyValues, setCheckedCompanyValues] = useState([]);
  const [checkedRoleValues, setCheckedRoleValues] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [display, setDisplay] = useState([false]);

  let { value } = useParams();

  const grant = (isChecked, value, table) => {
    if (table === "company") {
      if (isChecked) {
        setCheckedCompanyValues((prevValues) => [...prevValues, value]);
      } else {
        setCheckedCompanyValues((prevValues) =>
          prevValues.filter((val) => val !== value)
        );
      }
    } else if (table === "role") {
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
      dispatch(fetchUserData(id));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (activeTab === "General") {
      try {
        const updatedUserData = {
          id: id,
          ...filteredUserData,
          userID: userData.email,
        };
        await dispatch(updateUserData(id, updatedUserData));

        setEditMode(false);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else if (activeTab === "Companies") {
      const updatedUserData = {
        ...filteredUserData,
        companies: checkedCompanyValues,
      };

      await dispatch(updateUserData(id, updatedUserData));
    } else if (activeTab === "Roles") {
      const updatedUserData = {
        ...filteredUserData,
        roles: checkedRoleValues,
      };
      await dispatch(updateUserData(id, updatedUserData));
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (editMode === false) {
          await dispatch(fetchUserData(id));
          setFilteredUserData({
            userID: userData.users.email,
            firstName: userData.users.firstName,
            lastName: userData.users.lastName,
            defaultCompany: userData.users.defaultCompany,
            designation: userData.users.designation,
            primaryRole: userData.users.primaryRole,
            email: userData.users.email,
            password: userData.users.password,
            validFrom: userData.users.validFrom,
            validTill: userData.users.validTill,
            companies: userData.users.companies,
            roles: userData.users.roles,
          });
        }

        dispatch(fetchCompanyData());
        dispatch(fetchRoleData());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, id, filteredUserData, editMode]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilteredUserData({
      ...filteredUserData,
      [id]: value,
    });
  };

  const [activeTab, setActiveTab] = useState("General");

  const [roleTableData] = useState([["Role Code"], ["Role Name"], ["Grant"]]);
  const [companyTableData] = useState([
    ["Company Code"],
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
                showEdit={activeTab === "General" ? !editMode : false}
                showSave={activeTab === "General" ? editMode : true}
                showDelete={false}
                SaveClick={handleSave}
                EditClick={handleEditClick}
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
                          value={filteredUserData.email}
                          disabled
                        />
                        <TextField
                          id="firstName"
                          type="text"
                          text="First Name:"
                          value={filteredUserData.firstName}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="lastName"
                          type="text"
                          text="Last Name:"
                          value={filteredUserData.lastName}
                          onChange={handleInputChange}
                        />
                        <Dropdown
                          id="defaultCompany"
                          text="Default Company:"
                          options={userData.company.map((company) => ({
                            value: company.id,
                            label: company.name,
                          }))}
                          selectedOption={filteredUserData.defaultCompany}
                          handleChange={handleInputChange}
                        />
                        <TextField
                          id="designation"
                          type="text"
                          text="Designation:"
                          value={filteredUserData.designation}
                          onChange={handleInputChange}
                        />

                        <Dropdown
                          id="primaryRole"
                          text="Primary Role:"
                          options={userData.roles.map((role) => ({
                            value: role.id,
                            label: role.name,
                          }))}
                          selectedOption={filteredUserData.primaryRole}
                          handleChange={handleInputChange}
                        />

                        <TextField
                          id="email"
                          type="text"
                          text="Email:"
                          value={filteredUserData.email}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="validFrom"
                          type="text"
                          text="Valid From:"
                          value={filteredUserData.validFrom}
                          onChange={handleInputChange}
                        />
                        <TextField
                          id="validTill"
                          type="text"
                          text="Valid Till:"
                          value={filteredUserData.validTill}
                          onChange={handleInputChange}
                        />
                      </>
                    ) : (
                      <>
                        <TextField
                          id="userID"
                          type="text"
                          text="User ID:"
                          value={filteredUserData.email}
                          disabled
                        />
                        <TextField
                          id="firstName"
                          type="text"
                          text="First Name:"
                          value={filteredUserData.firstName}
                          disabled
                        />
                        <TextField
                          id="lastName"
                          type="text"
                          text="Last Name:"
                          value={filteredUserData.lastName}
                          disabled
                        />

                        <TextField
                          id="defaultCompany"
                          type="text"
                          text="Default Company:"
                          value={filteredUserData.defaultCompany}
                          disabled
                        />

                        <TextField
                          id="designation"
                          type="text"
                          text="Designation:"
                          value={filteredUserData.designation}
                          disabled
                        />
                        <TextField
                          id="primaryRole"
                          type="text"
                          text="Primary Role:"
                          value={filteredUserData.primaryRole}
                          disabled
                        />
                        <TextField
                          id="email"
                          type="text"
                          text="Email:"
                          value={filteredUserData.email}
                          disabled
                        />
                        <TextField
                          id="validFrom"
                          type="text"
                          text="Valid From:"
                          value={filteredUserData.validFrom}
                          disabled
                        />
                        <TextField
                          id="validTill"
                          type="text"
                          text="Valid Till:"
                          value={filteredUserData.validTill}
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
                    grantedCodes={filteredUserData.companies}
                    defaultValue={filteredUserData.defaultCompany}
                    columns={companyTableData}
                    data={userData.company}
                    checkedValues={checkedCompanyValues}
                    display={display}
                    grant={(isChecked, value) =>
                      grant(isChecked, value, "company")
                    }
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
                    grantedCodes={filteredUserData.roles}
                    defaultValue={filteredUserData.primaryRole}
                    columns={roleTableData}
                    data={userData.roles}
                    grant={(isChecked, value) =>
                      grant(isChecked, value, "role")
                    }
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
