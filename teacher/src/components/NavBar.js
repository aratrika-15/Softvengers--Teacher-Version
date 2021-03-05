import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';


export const NavigationBar = () => (

    <Navbar expand="lg">
      <Navbar.Brand >SoftVengers</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
   
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

)