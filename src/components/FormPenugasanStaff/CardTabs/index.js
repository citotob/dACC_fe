import React, { useEffect, useState, Suspense } from "react";

import { useLocation } from "react-router-dom";
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
import { destroyBtsForm } from "../../../helpers/destroyReduxSessions/destroyBtsForm";
// IndexedDB
import Localbase from "localbase";

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

import { setBtsMain } from "../../../store/formSurveyStaff/action";

const CardTabs = () => {
  // const Section1 = React.lazy(() => import("./Sections/Section1"));
  // const Section2 = React.lazy(() => import("./Sections/Section2"));
  // const Section3 = React.lazy(() => import("./Sections/Section3"));
  // const Section4 = React.lazy(() => import("./Sections/Section4"));
  // const Section5 = React.lazy(() => import("./Sections/Section5"));
  // const Section6 = React.lazy(() => import("./Sections/Section6"));
  // const Section7 = React.lazy(() => import("./Sections/Section7"));
  // const Section8 = React.lazy(() => import("./Sections/Section8"));
  // const Section9 = React.lazy(() => import("./Sections/Section9"));
  // const Section10 = React.lazy(() => import("./Sections/Section10"));
  // const Section11 = React.lazy(() => import("./Sections/Section11"));
  // const Section12 = React.lazy(() => import("./Sections/Section12"));
  // const Section13 = React.lazy(() => import("./Sections/Section13"));
  // const Section14 = React.lazy(() => import("./Sections/Section14"));
  // const Section15 = React.lazy(() => import("./Sections/Section15"));
  // const Section16 = React.lazy(() => import("./Sections/Section16"));
  // const Section17 = React.lazy(() => import("./Sections/Section17"));
  // const Section18 = React.lazy(() => import("./Sections/Section18"));
  // const Section19 = React.lazy(() => import("./Sections/Section19"));
  // const Section20 = React.lazy(() => import("./Sections/Section20"));
  // const Section21 = React.lazy(() => import("./Sections/Section21"));
  // const Section22 = React.lazy(() => import("./Sections/Section22"));
  // const Section23 = React.lazy(() => import("./Sections/Section23"));
  // const Section24 = React.lazy(() => import("./Sections/Section24"));
  // const Section25 = React.lazy(() => import("./Sections/Section25"));
  // const Section26 = React.lazy(() => import("./Sections/Section26"));
  // const Section27 = React.lazy(() => import("./Sections/Section27"));
  // const Section28 = React.lazy(() => import("./Sections/Section28"));
  // const Section29 = React.lazy(() => import("./Sections/Section29"));
  // const Section30 = React.lazy(() => import("./Sections/Section30"));
  // const Section31 = React.lazy(() => import("./Sections/Section31"));
  // const Section32 = React.lazy(() => import("./Sections/Section32"));
  // const Section33 = React.lazy(() => import("./Sections/Section33"));
  // const Section34 = React.lazy(() => import("./Sections/Section34"));
  // const Section35 = React.lazy(() => import("./Sections/Section35"));
  // const Section36 = React.lazy(() => import("./Sections/Section36"));
  // const Section37 = React.lazy(() => import("./Sections/Section37"));
  // const Section38 = React.lazy(() => import("./Sections/Section38"));
  // const Section39 = React.lazy(() => import("./Sections/Section39"));
  // const Section40 = React.lazy(() => import("./Sections/Section40"));
  // const Section41 = React.lazy(() => import("./Sections/Section41"));
  // const Section42 = React.lazy(() => import("./Sections/Section42"));
  // const Section43 = React.lazy(() => import("./Sections/Section43"));
  // const Section44 = React.lazy(() => import("./Sections/Section44"));

  let db = new Localbase("db");
  const [activeTab, setactiveTab] = useState("");
  const location = useLocation();
  const kodeSurvey = location?.state?.datatable._id;
  let strBtsMain = "btsMain";
  //redux
  const formType = useSelector((state) => state.BtsFormTypeReducer.formType);
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);

  let stringFormCurrentTab = "formCurrentTab";
  const localActiveTab = window.localStorage.getItem(
    stringFormCurrentTab.concat(kodeSurvey)
  );
  window.localStorage.setItem(
    stringFormCurrentTab.concat(kodeSurvey),
    activeTab
  );

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

  // useEffect(() => {
  //   if (formType === "mw") {
  //     if (parseInt(localActiveTab) > 22) {
  //       setactiveTab(localActiveTab);
  //     } else {
  //       setactiveTab("23");
  //     }
  //   } else if (formType === "ssr") {
  //     setactiveTab("1");
  //   }
  // }, [formType]);

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

    db.collection(eval("strBtsMain").concat(kodeSurvey)).get();
  }, []);

  return (
    <div className='checkout-tabs'>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {btsMain && (
        <Row>
          <Col xl='2' lg='4' md='4' sm='4'>
            <Nav
              // className='flex-column'
              className={`d-flex justify-content-center align-items-center ${style.navLinkScrollBar} nav-link-scroll`}
              pills
            >
              {formType === "ssr" &&
                sectionTitlesSSR.map((title, i) => {
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
                })}
              {formType === "mw" &&
                sectionTitlesMW.map((title, i) => {
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
                })}
              {formType === "fo" &&
                sectionTitlesFO.map((title, i) => {
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
                })}
            </Nav>
          </Col>
          <Col xl='10' lg='8' md='8' sm='8'>
            <Card>
              <CardBody className={style.cardBody}>
                <TabContent activeTab={activeTab}>
                  {/* <TabContent activeTab='3'> */}
                  {activeTab === "1" ? (
                    <TabPane tabId='1'>
                      <Section1 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "2" ? (
                    <TabPane tabId='2'>
                      <Section2 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "3" ? (
                    <TabPane tabId='3'>
                      <Section3 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "4" ? (
                    <TabPane tabId='4'>
                      <Section4 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "5" ? (
                    <TabPane tabId='5'>
                      <Section5 setactiveTab={setactiveTab} db={db} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "6" ? (
                    <TabPane tabId='6'>
                      <Section6 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "7" ? (
                    <TabPane tabId='7'>
                      <Section7 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "8" ? (
                    <TabPane tabId='8'>
                      <Section8 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "9" ? (
                    <TabPane tabId='9'>
                      <Section9 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "10" ? (
                    <TabPane tabId='10'>
                      <Section10 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "11" ? (
                    <TabPane tabId='11'>
                      <Section11 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "12" ? (
                    <TabPane tabId='12'>
                      <Section12 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "13" ? (
                    <TabPane tabId='13'>
                      <Section13 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "14" ? (
                    <TabPane tabId='14'>
                      <Section14 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "15" ? (
                    <TabPane tabId='15'>
                      <Section15 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "16" ? (
                    <TabPane tabId='16'>
                      <Section16 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "17" ? (
                    <TabPane tabId='17'>
                      <Section17 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "18" ? (
                    <TabPane tabId='18'>
                      <Section18 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "19" ? (
                    <TabPane tabId='19'>
                      <Section19 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "20" ? (
                    <TabPane tabId='20'>
                      <Section20 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "21" ? (
                    <TabPane tabId='21'>
                      <Section21 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "22" ? (
                    <TabPane tabId='22'>
                      <Section22 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "23" ? (
                    <TabPane tabId='23'>
                      <Section23 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "24" ? (
                    <TabPane tabId='24'>
                      <Section24 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "25" ? (
                    <TabPane tabId='25'>
                      <Section25 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "26" ? (
                    <TabPane tabId='26'>
                      <Section26 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "27" ? (
                    <TabPane tabId='27'>
                      <Section27 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "28" ? (
                    <TabPane tabId='28'>
                      <Section28 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "29" ? (
                    <TabPane tabId='29'>
                      <Section29 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "30" ? (
                    <TabPane tabId='30'>
                      <Section30 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "31" ? (
                    <TabPane tabId='31'>
                      <Section31 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "32" ? (
                    <TabPane tabId='32'>
                      <Section32 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "33" ? (
                    <TabPane tabId='33'>
                      <Section33 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "34" ? (
                    <TabPane tabId='34'>
                      <Section34 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "35" ? (
                    <TabPane tabId='35'>
                      <Section35 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "36" ? (
                    <TabPane tabId='36'>
                      <Section36 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "37" ? (
                    <TabPane tabId='37'>
                      <Section37 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "38" ? (
                    <TabPane tabId='38'>
                      <Section38 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "39" ? (
                    <TabPane tabId='39'>
                      <Section39 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "40" ? (
                    <TabPane tabId='40'>
                      <Section40 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "41" ? (
                    <TabPane tabId='41'>
                      <Section41 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "42" ? (
                    <TabPane tabId='42'>
                      <Section42 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "43" ? (
                    <TabPane tabId='43'>
                      <Section43 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                  {activeTab === "44" ? (
                    <TabPane tabId='44'>
                      <Section44 setactiveTab={setactiveTab} db={db} />
                    </TabPane>
                  ) : (
                    <></>
                  )}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {/* </Suspense> */}
    </div>
  );
};

export default CardTabs;
