import React from "react";
import CreateUser from "../src/pages/users/CreateUsers";
import { Route,Routes } from "react-router-dom";
import UserList from '../src/pages/users/UserList';
import Tab from '../src/pages/users/UserOverview';
import Profile from '../src/pages/users/UserProfile';
import ProfileImg from '../src/pages/users/UploadImage';

function App() {

  return (
  <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="/createUser" element={<CreateUser />} />
    <Route path="/userOverview/:value" element={<Tab />} />
    <Route path="/userProfile/:value" element={<Profile />} />
    <Route path="/uploadImage/:value" element={<ProfileImg />} />
 
  </Routes> 
  
    
  );
}

export default App;
