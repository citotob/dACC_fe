import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
// import redux
import { setBtsFormTab } from "../../../store/btsFormTab/action";

// import component
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";
import Section6 from "./Sections/Section6";
import Section7 from "./Sections/Section7";
import Section8 from "./Sections/Section8";
import Section9 from "./Sections/Section9";
import Section10 from "./Sections/Section10";
import Section11 from "./Sections/Section11";
import Section12 from "./Sections/Section12";
import Section13 from "./Sections/Section13";
import Section14 from "./Sections/Section14";
import Section15 from "./Sections/Section15";
import Section16 from "./Sections/Section16";
import Section17 from "./Sections/Section17";
import Section18 from "./Sections/Section18";
import Section19 from "./Sections/Section19";
import Section20 from "./Sections/Section20";
import Section21 from "./Sections/Section21";
import Section22 from "./Sections/Section22";
import Section23 from "./Sections/Section23";
import Section24 from "./Sections/Section24";
import Section25 from "./Sections/Section25";
import Section26 from "./Sections/Section26";
import Section27 from "./Sections/Section27";
import Section28 from "./Sections/Section28";
import Section29 from "./Sections/Section29";
import Section30 from "./Sections/Section30";
import Section31 from "./Sections/Section31";
import Section32 from "./Sections/Section32";
import Section33 from "./Sections/Section33";
import Section34 from "./Sections/Section34";
import Section35 from "./Sections/Section35";
import Section36 from "./Sections/Section36";
import Section37 from "./Sections/Section37";
import Section38 from "./Sections/Section38";
import Section39 from "./Sections/Section39";
import Section40 from "./Sections/Section40";
import Section41 from "./Sections/Section41";
import Section42 from "./Sections/Section42";
import Section43 from "./Sections/Section43";
import Section44 from "./Sections/Section44";

const CardTabs = (props) => {
  const [activeTab, setactiveTab] = useState("1");
  // const [visibility, setVisibility] = useState(true);
  const data = props.datatable;
  const localActiveTab = window.localStorage.getItem("detailCurrentTab");
  window.localStorage.setItem("detailCurrentTab", activeTab);

  //redux
  const formType = useSelector((state) => state.BtsFormTypeReducer.formType);
  const dispatch = useDispatch();

  const sectionTitlesSSR = [
    { no: 1, title: "Section 1 : Informasi Survey" },
    { no: 2, title: "Section 2 : Informasi Umum" },
    { no: 3, title: "Section 3 : Informasi Geografi dan Tower Data" },
    { no: 4, title: "Section 4 : Transmisi VSAT" },
    { no: 5, title: "Section 5 : Informasi Umum Lahan" },
    { no: 6, title: "Section 6 : Coverage Seluler Di Site" },
    { no: 7, title: "Section 7 : Kondisi Lahan" },
    { no: 8, title: "Section 8 : Sarana Catuan Listrik Dan Pendukungnya" },
    { no: 9, title: "Section 9 : Perijinan" },
    { no: 10, title: "Section 10 : Informasi Demografi" },
    { no: 11, title: "Section 11 : Foto Foto Lahan Yang Akan Dibangun" },
    { no: 12, title: "Section 12 : Layout Site (Sesuai Penawaran Tender)" },
    { no: 13, title: "Section 13 : Foto Foto Kandidat Lahan" },
    { no: 14, title: "Section 14 : Informasi Coverage and Obstacle" },
    { no: 15, title: "Section 15 : Foto Capture G-NETTRACK 0.5 KM" },
    { no: 16, title: "Section 16 : Foto Capture G-NETTRACK 2KM" },
    { no: 17, title: "Section 17 : Foto Capture G-NETTRACK Rute Jalan" },
    { no: 18, title: "Section 18 : Location Mapping" },
    // { no: 19, title: "Section 19 : Foto-Foto Panoramic Area" },
    { no: 19, title: "Section 19 : Foto-Foto Pengguna Potensial" },
    { no: 20, title: "Section 20 : Foto-Foto Akses ke Site" },
    { no: 21, title: "Section 21 : General Comment" },
  ];

  const sectionTitlesMW = [
    { no: 22, title: "Section 22 : Informasi Desain Link Microwave" },
    { no: 23, title: "Section 23 : Path Profile & Desktop Contour" },
    { no: 24, title: "Section 24 : Hasil Survey LOS" },
    { no: 25, title: "Section 25 : Foto Foto GPS dan Tower" },
    { no: 26, title: "Section 26 : Foto Tower SITE A" },
    { no: 27, title: "Section 27 : Proposed Lokasi Antenna MW SITE A" },
    { no: 28, title: "Section 28 : Foto Panoramic SITE A" },
    { no: 29, title: "Section 29 : Foto Tower di SITE B" },
    { no: 30, title: "Section 30 : Proposed Lokasi Antenna MW SITE B" },
    { no: 31, title: "Section 31 : Foto Panoramic SITE B" },
    { no: 32, title: "Section 32 : Foto Line Of Sight (LOS)" },
    { no: 33, title: "Section 33 : Path Profile" },
    { no: 34, title: "Section 34 : Peta Lokasi keseluruhan / Global Map" },
    { no: 35, title: "Section 35 : Perkiraan Link Budget (Capture-an Tools)" },
  ];

  const sectionTitlesFO = [
    { no: 36, title: "Section 36 : Informasi Umum" },
    { no: 37, title: "Section 37 : Hasil Survey" },
    { no: 38, title: "Section 38 : Lokasi HH/Pole" },
    { no: 39, title: "Section 39 : Kondisi Fasilitas" },
    { no: 40, title: "Section 40 : Kondisi Terminasi di STO" },
    { no: 41, title: "Section 41 : Foto Titik Terminasi di STO" },
    { no: 42, title: "Section 42 : Hasil Survey Dan Catatan" },
    { no: 43, title: "Section 43 : Rute Fiber Optik Di Google Map" },
    { no: 44, title: "Section 44 : As Plan Drawing" },
  ];

  useEffect(() => {
    if (localActiveTab) {
      setactiveTab(localActiveTab);
    } else {
      setactiveTab((activeTab) => (activeTab = "1"));
    }

    if (parseInt(localActiveTab) > 21) {
      dispatch(setBtsFormTab("mw"));
    }
    if (parseInt(localActiveTab) > 35) {
      dispatch(setBtsFormTab("fo"));
    }
  }, []);

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
              {formType === "ssr" &&
                sectionTitlesSSR.map((title, i) => {
                  // if (data["page" + title.no]) {
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
                        <span className={`font-weight-bold`}>
                          {title.title}
                        </span>
                      </NavLink>
                    </NavItem>
                  );
                  // }
                })}
              {formType === "mw" &&
                sectionTitlesMW.map((title, i) => {
                  // if (data["page" + title.no]) {
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
                        <span className={`font-weight-bold`}>
                          {title.title}
                        </span>
                      </NavLink>
                    </NavItem>
                  );
                  // }
                })}
              {formType === "fo" &&
                sectionTitlesFO.map((title, i) => {
                  // if (data["page" + title.no]) {
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
                        <span className={`font-weight-bold`}>
                          {title.title}
                        </span>
                      </NavLink>
                    </NavItem>
                  );
                  // }
                })}
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
                  <TabPane tabId='5'>
                    <Section5 data={data} />
                  </TabPane>
                  <TabPane tabId='6'>
                    <Section6 data={data} />
                  </TabPane>
                  <TabPane tabId='7'>
                    <Section7 data={data} />
                  </TabPane>
                  <TabPane tabId='8'>
                    <Section8 data={data} />
                  </TabPane>
                  <TabPane tabId='9'>
                    <Section9 data={data} />
                  </TabPane>
                  <TabPane tabId='10'>
                    <Section10 data={data} />
                  </TabPane>
                  <TabPane tabId='11'>
                    <Section11 data={data} />
                  </TabPane>
                  <TabPane tabId='12'>
                    <Section12 data={data} />
                  </TabPane>
                  <TabPane tabId='13'>
                    <Section13 data={data} />
                  </TabPane>
                  <TabPane tabId='14'>
                    <Section14 data={data} />
                  </TabPane>
                  <TabPane tabId='15'>
                    <Section15 data={data} />
                  </TabPane>
                  <TabPane tabId='16'>
                    <Section16 data={data} />
                  </TabPane>
                  <TabPane tabId='17'>
                    <Section17 data={data} />
                  </TabPane>
                  <TabPane tabId='18'>
                    <Section18 data={data} />
                  </TabPane>
                  <TabPane tabId='19'>
                    <Section19 data={data} />
                  </TabPane>
                  <TabPane tabId='20'>
                    <Section20 data={data} />
                  </TabPane>
                  <TabPane tabId='21'>
                    <Section21 data={data} />
                  </TabPane>
                  <TabPane tabId='22'>
                    <Section22 data={data} />
                  </TabPane>
                  <TabPane tabId='23'>
                    <Section23 data={data} />
                  </TabPane>
                  <TabPane tabId='24'>
                    <Section24 data={data} />
                  </TabPane>
                  <TabPane tabId='25'>
                    <Section25 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='26'>
                    <Section26 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='27'>
                    <Section27 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='28'>
                    <Section28 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='29'>
                    <Section29 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='30'>
                    <Section30 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='31'>
                    <Section31 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='32'>
                    <Section32 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='33'>
                    <Section33 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='34'>
                    <Section34 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='35'>
                    <Section35 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='36'>
                    <Section36 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='37'>
                    <Section37 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='38'>
                    <Section38 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='39'>
                    <Section39 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='40'>
                    <Section40 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='41'>
                    <Section41 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='42'>
                    <Section42 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='43'>
                    <Section43 setactiveTab={setactiveTab} data={data} />
                  </TabPane>
                  <TabPane tabId='44'>
                    <Section44 setactiveTab={setactiveTab} data={data} />
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
