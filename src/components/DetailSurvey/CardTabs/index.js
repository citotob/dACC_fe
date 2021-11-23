import React, { useState } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//Import Style
import style from "./style.module.scss";

// import components
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";

const CardTabs = (props) => {
  const [activeTab, setactiveTab] = useState("1");
  // const [visibility, setVisibility] = useState(true);
  const data = props.datatable;
  console.log("data dari dalam cardtabs :", data);

  const Tabs = ({ data }) => {
    return (
      // <Container fluid>
      <div className='checkout-tabs'>
        <Row>
          <Col xl='2' lg='4' md='4' sm='4'>
            <Nav
              // className='flex-column'
              className={`d-flex justify-content-center align-items-center ${style.navLinkScrollBar}`}
              pills
            >
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    setactiveTab("1");
                  }}
                >
                  <span className={`font-weight-bold`}>
                    Section 1: Data Calon Pelanggan
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    setactiveTab("2");
                  }}
                >
                  <span className='font-weight-bold mb-4'>
                    Section 2: Keterangan Perangkat IT di Lokasi
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    setactiveTab("3");
                  }}
                >
                  <span className='font-weight-bold mb-4'>
                    Section 3: Foto Lokasi
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "4" })}
                  onClick={() => {
                    setactiveTab("4");
                  }}
                >
                  <span className='font-weight-bold mb-4'>
                    Section 4: Network
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xl='10' lg='8' md='8' sm='8'>
            <Card>
              <CardBody className={style.cardBody}>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <Section1 data={data} />
                  </TabPane>
                  <TabPane tabId='2'>
                    <Section2 data={data} />
                  </TabPane>
                  <TabPane tabId='3'>
                    <Section3 data={data} />
                  </TabPane>
                  <TabPane tabId='4'>
                    <Section4 data={data} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      // </Container>
    );
  };
  return <Tabs data={data} />;
};

export default CardTabs;
