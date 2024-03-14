import React, { useState, useEffect } from "react";
import NavTop from "../../../../client/src/components/NavTop";
import NavLeft from "../../../../client/src/components/NavLeft";
import TopicField from "../../../../client/src/components/TopicSection";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserData } from "../../../../client/src/store/actions/RmsActions";
import { selectUserData } from "../../../../client/src/store/Stores";
import { useNavigate } from "react-router-dom";

const UploadImg = () => {
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [filteredUserData, setFilteredUserData] = useState({});
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const { value } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!editMode) {
          await dispatch(fetchUserData(value));
          setFilteredUserData(userData.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, editMode, value, userData.users]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
  
     
      const userDataWithImage = {
        ...filteredUserData,
        image: image 
      };
  
    
      formData.append("userData", JSON.stringify(userDataWithImage));
  
      await dispatch(updateUserData(value,formData)); 
      setImage(null);
      console.log(image)
      navigate(`/userProfile/:value`);
    } catch (error) {
      console.error("Error saving data:", error);
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
              <TopicField
                topic="UserProfile"
                showInputGroup1={false}
                showInputGroup2={true}
                showCreate={false}
                showDelete={false}
                showSave={true}
                showEdit={false}
                SaveClick={handleSave} // Pass the handleSave function to TopicField
              />
              <div>
                <label htmlFor="file-upload" className="custom-file-upload">
                  Upload Image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              {image && (
                <div>
                  <p>Preview:</p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UploadImg;
