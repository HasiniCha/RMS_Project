import React from 'react';
import { Nav, Col } from 'react-bootstrap';

function LeftNavbar() {
  return (
    <Col sm={3} style={{padding:60, minHeight: '100vh' ,backgroundColor:"black" }}>
      <Nav defaultActiveKey="/home" className="flex-column">
      <h4 style={{color:'grey'}}>Left nav bar<br /><br /> </h4>
      <p style={{color:'grey'}}></p>
        {/* <Nav.Link href="/home">Left Nav Link 1</Nav.Link>
        <Nav.Link href="/home">Left Nav Link 2</Nav.Link>
        <Nav.Link href="/home">Left Nav Link 3</Nav.Link>
        <Nav.Link href="/home">Left Nav Link 1</Nav.Link>
        <Nav.Link href="/home">Left Nav Link 2</Nav.Link>
        <Nav.Link href="/home">Left Nav Link 3</Nav.Link> */}
      </Nav>
    </Col>
  );
}

export default LeftNavbar;

  
