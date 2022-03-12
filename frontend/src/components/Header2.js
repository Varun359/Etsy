import React from "react";
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCookies, CookiesProvider, Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { ContactsOutlined } from "@ant-design/icons";
const Header2 = () => {
  let redirectVar = null;
  const [cookie, setCookie, removeCookie] = useCookies(["cookie"]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <a class="navbar-brand" href="#">
          {/* <img
            src="/docs/4.0/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          /> */}
          <img
            className="header_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png"
            width="60"
            height="30"
            class="d-inline-block align-top"
            alt=""
          ></img>
        </a>
        {/* <LinkContainer to="/">
          <Navbar.Brand>Etsy</Navbar.Brand>
        </LinkContainer> */}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Nav>

          <Nav>
            <>
              <Nav.Link>Your account</Nav.Link>
              <NavDropdown id="collasible-nav-dropdown">
                <LinkContainer to="/userProfile">
                  <NavDropdown.Item>
                    {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                    My Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    removeCookie("cookie");
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>

            <LinkContainer to="./shopCreate">
              <Nav.Link>Shop Manager</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header2;
