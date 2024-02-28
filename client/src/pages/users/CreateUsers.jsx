import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BASE_URL,USER_URL} from "../../utils/Constants";
import TextField from "../../components/TextField";
import TopicField from "../../components/TopicSection";
import Button from "react-bootstrap/Button";
import NavTop from "../../components/NavTop";
import NavLeft from "../../components/NavLeft";
import { useDispatch , useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { toastFunction } from "../../components/ToastFunction";
import axios from "axios";
import { createUser } from '../../store/actions/RmsActions';

const Main = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [formData, setFormData] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    password: "",
    validFrom: "",
    validTill: "",
    companies: "",
    roles: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  //input_change
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Check if the input being changed is the email field
    if (id === "email") {
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
    designation,
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

  // First Name validation
  if (firstName.length > 20) {
    toastFunction("First Name cannot exceed 20 characters", true);
    return false;
  }

  // Last Name validation
  if (lastName.length > 20) {
    toastFunction("Last Name cannot exceed 20 characters", true);
    return false;
  }

  // Designation validation
  if (designation.length > 40) {
    toastFunction("Designation cannot exceed 40 characters", true);
    return false;
  }

  // Email validation
  if (email.length > 50) {
    toastFunction("Email cannot exceed 50 characters", true);
    return false;
  }

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
                />
                <TextField
                  id="firstName"
                  type="text"
                  text="First Name:"
                  onChange={handleInputChange}
                />
                <TextField
                  id="lastName"
                  type="text"
                  text="Last Name:"
                  onChange={handleInputChange}
                />
                <TextField
                  id="designation"
                  type="text"
                  text="Designation:"
                  onChange={handleInputChange}
                />
                <TextField
                  id="email"
                  type="email"
                  text="Email:"
                  onChange={handleInputChange}
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
