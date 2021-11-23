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

const CardTabs = (props) => {
  const [activeTab, setactiveTab] = useState("1");
  const data = props.datatable;

  const sectionTitles = [
    { no: 1, title: "Section 1 : Data Calon Pelanggan" },
    { no: 2, title: "Section 2 : Keterangan Perangkat IT di Lokasi" },
    { no: 3, title: "Section 3 : Foto-foto Kondisi Lapangan" },
  ];

  const Tabs = () => {
    return (
      <div className='checkout-tabs'>
        <Row>
          <Col xl='2' lg='4' md='4' sm='4'>
            <Nav
              className={`d-flex flex-column justify-content-center align-items-center ${style.navLinkScrollBar}`}
              pills
            >
              {sectionTitles.map((title, i) => {
                return (
                  <NavItem key={i}>
                    <NavLink
                      className={classnames({
                        active: activeTab === `${title.no}`,
                      })}
                      onClick={() => {
                        setactiveTab(`${title.no}`);
                      }}
                    >
                      <span className={`font-weight-bold`}>{title.title}</span>
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </Col>
          <Col xl='10' lg='8' md='8' sm='8'>
            <Card>
              <CardBody className={style.cardBody}>
                <TabContent activeTab={activeTab}>
                  {/* <TabContent activeTab='18'> */}
                  <TabPane tabId='1'>
                    <Section1 />
                  </TabPane>
                  <TabPane tabId='2'>
                    <Section2 />
                  </TabPane>
                  <TabPane tabId='3'>
                    <Section3 />
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
  return (
    <>
      <Tabs />
    </>
  );
};

export default CardTabs;
