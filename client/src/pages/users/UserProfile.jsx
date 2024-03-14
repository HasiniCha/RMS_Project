import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import NavTop from "../../../../client/src/components/NavTop";
import NavLeft from "../../../../client/src/components/NavLeft";
import { Container, Row } from "react-bootstrap";
import TopicField from "../../../../client/src/components/TopicSection";
import { toastFunction } from "../../components/ToastFunction"
import TextField from "../../../../client/src/components/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Image from "react-bootstrap/Image";
import profileImage from "../../../../client/src/assets/pp.png";
import { useParams } from "react-router-dom";
import {
  fetchUserData,
  updateUserData,
} from "../../../../client/src/store/actions/RmsActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserData } from "../../../../client/src/store/Stores";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const value="244e";
  const [editMode, setEditMode] = useState(false);
  const [editedField, setEditedField] = useState("");
  const [filteredUserData, setFilteredUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!editMode) {
          await dispatch(fetchUserData(value));
          setFilteredUserData({
            ...userData.users,
          });
        }
   
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, editMode, value, userData.users]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      profileImage= URL.createObjectURL(selectedFile);
      
    }
  };
 
  const handleSave = async () => {
    try {
      setShowPassword(false);
      const updatedUserData = {
        ...filteredUserData,
        userID: userData.email,
      };
      await dispatch(updateUserData(value, updatedUserData));
      setEditMode(false);
      profileImage=URL.createObjectURL(image);
      toastFunction("Updated Successfully", false);
      
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilteredUserData({
      ...filteredUserData,
      [id]: value,
    });
  };

  const handleEditClick = (fieldName) => {
    setEditMode(true);
    setEditedField(fieldName);
    if(fieldName==='password')
    {setShowPassword(true);}
  };

  const uploadImgFunction = () => {
    navigate(`/uploadImage/${value}`);
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
                topic="   User Profile"
                showInputGroup1={false}
                showInputGroup2={true}
                showCreate={false}
                showDelete={false}
                showSave={true}
                showEdit={false}
                SaveClick={handleSave}
              />
              <div
                style={{
                  backgroundColor: "#E1D9D1",
                  padding: 20,
                  marginTop: "140px",
                  marginLeft:"175px",
                  marginRight:"175px",
                  marginBottom:"75px",
                  padding:"50px",
                  
                }}
              >
                <div className="text-center" style={{ marginTop: "-100px" }}>
                  <Image
                    src={profileImage}
                    roundedCircle
                    style={{
                      width: "140px",
                      height: "140px",
                      marginBottom:"10px"
                    }}
                    fluid
                  />
                  <div style={{ position: "relative", display: "inline-block", marginLeft:"5px"}}>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{
                        position: "relative",
                        marginBottom: "-30px",
                        marginLeft: "-50px",
                        transform: "translate(50%, 50%)",
                        fontSize: "2rem",
                        color: "black",
                      }}
                      onClick={() => document.getElementById("file-upload").click()}
                    />
                 
                  </div>
                  <p style={{marginLeft:"8px"}}><span>{filteredUserData.firstName}   </span>&nbsp;<span>{filteredUserData.lastName} </span><br /><span>{filteredUserData.designation} </span></p>
                </div>
                <div style={{ position: "relative" }}>
  <FontAwesomeIcon
    icon={faEdit}
    style={{ position: "absolute", top: "9px", right: "10px", cursor: "pointer" }}
    onClick={() => handleEditClick("email")}
  />
  <TextField
    id="email"
    type="text"
    text="Email:"
    value={filteredUserData.email || ""}
    disabled={!editMode || editedField !== "email"}
    onChange={handleInputChange}
    maxlength={50} 
  />
</div>

<div style={{ position: "relative" }}>
  <FontAwesomeIcon
    icon={showPassword ? faEyeSlash : faEye}
    style={{
      position: "absolute",
      top: "50%",
      right: "40px",
      transform: "translateY(-50%)",
      cursor: "pointer",
    }}
    onClick={togglePasswordVisibility}
  />
  <FontAwesomeIcon
    icon={faEdit}
    style={{
      position: "absolute",
      top: "9px",
      right: "10px", 
      cursor: "pointer",
    }}
    onClick={() => handleEditClick("password")}
  />
  <TextField
    id="password"
    type={showPassword ? "text" : "password"} 
    text="Password:"
    value={filteredUserData.password || ""}
    disabled={!editMode || editedField !== "password"}
    onChange={handleInputChange}
    maxlength={8}
  />
</div>

                <TextField
                  id="validFrom"
                  type="text"
                  text="Valid From:"
                  value={filteredUserData.validFrom || ""}
                  disabled={!editMode || editedField !== "validFrom"}
                  onChange={handleInputChange}
                />
                <TextField
                  id="validTill"
                  type="text"
                  text="Valid Till:"
                  value={filteredUserData.validTill || ""}
                  disabled={!editMode || editedField !== "validTill"}
                  onChange={handleInputChange}
                />
                <TextField
                  id="defaultCompany"
                  type="text"
                  text="Default Company:"
                  value={filteredUserData.defaultCompany || ""}
                  disabled={!editMode || editedField !== "defaultCompany"}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
