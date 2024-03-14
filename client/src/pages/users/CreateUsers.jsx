import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL, USER_URL } from "../../../../client/src/utils/Constants";
import TextField from "../../components/TextField";
import TopicField from "../../components/TopicSection";
import Button from "react-bootstrap/Button";
import NavTop from "../../components/NavTop";
import NavLeft from "../../components/NavLeft";
import Dropdown from "../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { toastFunction } from "../../components/ToastFunction";
import axios from "axios";
import { createUser } from "../../../../client/src/store/actions/RmsActions";
import {  fetchCompanyData,fetchRoleData} from '../../../../client/src/store/actions/RmsActions'; 
import { selectUserData } from '../../../../client/src/store/Stores';


const Main = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [selectedOption, setSelectedOption] = useState('');


  const [formData, setFormData] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    defaultCompany:"",
    designation: "",
    primaryRole:"",
    email: "",
    password: "",
    validFrom: "",
    validTill: "",
    companies: [],
    roles: [],
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  //input_change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "defaultCompany" ) {
     
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        companies: [...prevState.companies, value]
      }));
    }else if (id === "primaryRole") {
      // If it's the email field, update both email and userID with the same value
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        roles:[...prevState.roles,value]
      }));
    }else if (id === "email") {
      // If it's the email field, update both email and userID with the same value
      setFormData((prevState) => ({
        ...prevState,
        email: value,
        userID: value,
      }));
    } else {
      // For other fields, update normally
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  // Form validation
  const validateForm = () => {
    const {
      userId,
      firstName,
      lastName,
      defaultCompany,
      designation,
      primaryRole,
      email,
      password,
      validFrom,
      validTill,
    } = formData;

    // Field validation
    if (
      !firstName ||
      !lastName ||
      !designation ||
      !email ||
      !validFrom ||
      !validTill
    ) {
      toastFunction("All fields are required", true);
      return false;
    }

    // User ID validation
    // if (userId.length < 8) {
    //   toastFunction("User ID must be at least 8 characters long", true);
    //   return false;
    // }

  

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toastFunction(
        "Password must be at least 8 characters long and contain at least one number, and one special character",
        true
      );
      return false;
    }

    // Valid From and Valid Till validation
    const validFromDate = new Date(validFrom);
    const validTillDate = new Date(validTill);
    if (validTillDate <= validFromDate) {
      toastFunction("Valid Till should be later than Valid From", true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(createUser(formData));
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      toastFunction("Something went wrong!", true);
    }
    setFormSubmitted(true);
  };
  //refersh page
  useEffect(() => {
    if (formSubmitted) {
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    }
    dispatch(fetchCompanyData());
    dispatch(fetchRoleData());
  }, [formSubmitted]);

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
                topic="Create Users"
                showInputGroup1={false}
                showInputGroup2={false}
              />
              <Form style={{ margin: 10 }} onSubmit={handleSubmit}>
                <TextField
                  id="userID"
                  type="text"
                  text="User ID:"
                  value={formData.userID}
                  onChange={handleInputChange}
                  disabled={true}
                  maxlength={50} 
                 
                />
                <TextField
                  id="firstName"
                  type="text"
                  text="First Name:"
                  onChange={handleInputChange}
                  maxlength={20} 
                />
                <TextField
                  id="lastName"
                  type="text"
                  text="Last Name:"
                  onChange={handleInputChange}
                  maxlength={20} 
                />
                   <Dropdown
                  id="defaultCompany"
                  text="Default Company:"
                  options={userData.company.map(company => ({ value: company.id, label: company.name }))}
                  selectedOption={formData.defaultCompany}
                  handleChange={handleInputChange}
                />
                <TextField
                  id="designation"
                  type="text"
                  text="Designation:"
                  onChange={handleInputChange}
                  maxlength={40} 
                />
                   <Dropdown
                  id="primaryRole"
                  text="Primary Role:"
                  options={userData.roles.map(role => ({ value: role.id, label: role.name }))}
                  selectedOption={formData.primaryRole}
                  handleChange={handleInputChange}
                />
                <TextField
                  id="email"
                  type="email"
                  text="Email:"
                  onChange={handleInputChange}
                  maxlength={50} 
                />
                <TextField
                  id="password"
                  type="password"
                  text="Password:"
                  onChange={handleInputChange}
                />
                <TextField
                  id="validFrom"
                  type="datetime-local"
                  text="Valid From:"
                  onChange={handleInputChange}
                />
                <TextField
                  id="validTill"
                  type="datetime-local"
                  text="Valid Till:"
                  onChange={handleInputChange}
                />
                <div className="mb-3 row">
                  <div className="col-sm-10 offset-sm-2">
                    <Button
                      className="float-end"
                      variant="secondary"
                      style={{
                        backgroundColor: "#B5A28C",
                        color: "white",
                        border: "none",
                      }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
