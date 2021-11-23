import React from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Container } from "reactstrap";
import Vector from "./Vectormap";

const MapsVector = (props) => {
  const handleProv = (param) => {
    props.onclikRegion(param);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12} style={{ padding: "0px" }}>
              <Card style={{ border: "none" }}>
                <CardBody style={{ margin: "0px" }}>
                  <div id="chicago" className="vector-map-height">
                    <Vector
                      value="indonesia"
                      width="500"
                      color={props.AI ? "#2c3280" : "#C42127"}
                      onclikRegion={handleProv}
                      idRegion={props.idRegion}
                      AI={props.AI}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MapsVector;
