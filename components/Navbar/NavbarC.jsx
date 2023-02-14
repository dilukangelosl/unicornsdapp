import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaTwitter, FaDiscord } from "react-icons/fa";

import ConnectModal from "../Connect/ConnectModal";

export default function NavbarC() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">
            <img src="/zazzylogo.png" alt="logo" className="logo" />
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Link
                href="/"
                style={{ marginRight: "15px" }}
              >
               Mint
              </Nav.Link>

              <Nav.Link
                href="/comic"
                style={{ marginRight: "15px" }}
              >
               Mint Comic
              </Nav.Link>

              <Nav.Link
                href="https://www.ogcoinpro.com/"
                style={{ marginRight: "15px" }}
                target="_blank"
              >
               OG COIN PRO (BETA)
              </Nav.Link>

              <Nav.Link
                href="/referal"
                style={{ marginRight: "15px" }}
              
              >
               Mint Referal
              </Nav.Link>

           
              
              <ConnectModal />

              {/*
              <Nav.Link href="https://twitter.com/doodories">
                <FaDiscord />
              </Nav.Link>*/}
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
