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
              © {new Date().getFullYear()} SMASLAB by Badan Aksesibilitas
              Telekomunikasi dan Informasi
            </Col>
            <Col md={12}></Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
