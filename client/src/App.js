import React from "react";
import CreateUser from "./pages/users/CreateUsers";
import { Route,Routes } from "react-router-dom"
import UserList from './pages/users/UserList'
import Tab from './pages/users/UserOverview'

function App() {
  return (
  <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="/createUser" element={<CreateUser />} />
    <Route path="/userOverview/:value" element={<Tab />} />
 
  </Routes> 
  
    
  );
}

export default App;
