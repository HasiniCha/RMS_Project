import React from "react";
import CreateUser from "./pages/CreateUsers";
import { Route,Routes } from "react-router-dom"
import UserList from './pages/UserList'
import Tab from './pages/UserOverview'

function App() {
  return (
  <Routes>
    <Route path="/" element={<CreateUser />} />
    <Route path="/userlist" element={<UserList />} />
    <Route path="/useroverview/:value" element={<Tab />} />
 
  </Routes> 
  
    
  );
}

export default App;
