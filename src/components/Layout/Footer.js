import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = (props) => {
  return (
    <React.Fragment>
      <footer
        className="footer"
        style={{ backgroundColor: "transparent", textAlign: "center" }}
      >
        <Container fluid={true}>
          <Row>
            <Col md={12}>
              © {new Date().getFullYear()} dACC : Sistem Akuntasi
            </Col>
            <Col md={12}></Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
