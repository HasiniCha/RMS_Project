import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "../components/TextField";
import TopicField from "../components/TopicSection";
import Button from "react-bootstrap/Button";
import NavTop from "../components/NavTop";
import NavLeft from "../components/NavLeft";
import { Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/constant";
import {toastFunction} from "../components/toastFunction";

const Main = () => {
  const [formData, setFormData] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    password: "",
    validFrom: "",
    validTill: "",
    companies:"",
    roles:""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  
  //input_change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
  
    // Check if the input being changed is the email field
    if (id === 'email') {
      // If it's the email field, update both email and userID with the same value
      setFormData(prevState => ({
        ...prevState,
        email: value,
        userID: value, // Assuming userID is also updated with the email value
      }));
    } else {
      // For other fields, update normally
      setFormData(prevState => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  // Form validation
  const validateForm = () => {
    const { firstName, lastName, designation, email, password, validFrom, validTill } = formData;
    if (!firstName || !lastName || !designation || !email || !password || !validFrom || !validTill) {
      toastFunction("All fields are required",true);
      return false;
    }

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      
 toastFunction("Password must be at least 8 characters long and contain at least  one number, and one special character",true);
      return false;
    }

    return true;
  };

  //handle form submit and post data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await api.post("/users", formData);
      if (response.status === 201) {
      
          toastFunction("Added Details Successfully",false);
        setFormSubmitted(true);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);         
        toastFunction("Something went wrong!",true);
    }
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
              <TopicField topic="Create Users" showInputGroup1={false} showInputGroup2={false} />
              <Form style={{ margin: 10 }} onSubmit={handleSubmit}>
                <TextField
                  id="userID"
                  type="text"
                  text="User ID:"
                  value={formData.userID}
                  onChange={handleInputChange}
                  disabled={true}
                />
                <TextField id="firstName" type="text" text="First Name:" onChange={handleInputChange} />
                <TextField id="lastName" type="text" text="Last Name:" onChange={handleInputChange} />
                <TextField id="designation" type="text" text="Designation:" onChange={handleInputChange} />
                <TextField id="email" type="email" text="Email:" onChange={handleInputChange} />
                <TextField id="password" type="password" text="Password:" onChange={handleInputChange} />
                <TextField id="validFrom" type="datetime-local" text="Valid From:" onChange={handleInputChange} />
                <TextField id="validTill" type="datetime-local" text="Valid Till:" onChange={handleInputChange} />
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
