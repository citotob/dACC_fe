import React, { useState, useEffect } from "react";
// import redux
import { changeBreadcrumbItem } from "../../store/breadcrumb/action";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink } from "reactstrap";

//style
import styles from "./style.module.scss";
//style dari table
// import style from "../../components/Pengguna/TableBootstrap/style.module.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Tabs functions
import classnames from "classnames";

// Import components
// import SurveyClusterMap from "../../components/SurveyCluster/CardMap/MapModule";
import SurveyClusterMap from "../../components/SurveyCluster/CardMap/MapClustering";

// import API
import API from "../../services/index";

//DUMMY DATA

function SurveyCluster() {
  // redux
  const dispatch = useDispatch();

  const location = useLocation();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  // Tabs functions (verifikasi, aktif, ditolak)
  const [customActiveTab, setcustomActiveTab] = useState("1");
  function toggleCustom(tab) {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  }

  // MAP
  const map = () => {
    return <SurveyClusterMap />;
  };

  // CATEGORY SELECTOR
  const listCategory = [
    "Sekolah",
    "Puskesmas",
    "Kantor Desa",
    "Balai Kerja",
    "Alun-Alun",
    "Kantor Babinsa",
    "Kantor Polsek",
    "Lain-Lain",
  ];
  // ====== STATE
  // const [isLoading, setIsLoading] = useState(true);
  const [kategori, setKategori] = useState("Pilih Kategori");
  // console.log("category", kategori);
  const [province, setProvince] = useState([]);
  const [selectedProvince, setselectedProvince] = useState([]);

  // List of location
  // const [listDataView, setListDataView] = useState({
  //   low: [],
  //   mid: [],
  //   high: [],
  // });

  //get province list from API
  const getProvinsi = () => {
    API.getProvinsi()
      .then((res) => {
        if (res.status === 200) {
          setProvince(res.data.data);
        }
      })
      .catch((err) => console.log(err.response));
  };

  const handleFilterAi = () => {
    let params = {
      category: kategori,
      province: selectedProvince,
    };
    // console.log("params nih", params);
    API.getFilterAi(params)
      .then((res) => {
        if (res.status === 200) {
          // setListDataView({
          //   low: res.data.values.low,
          //   mid: res.data.values.mid,
          //   high: res.data.values.high,
          // });
        }
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getProvinsi();
    dispatch(changeBreadcrumbItem("Survey Cluster"));
  }, []);

  useEffect(() => {
    handleFilterAi();
  }, [selectedProvince, kategori]);

  // console.log("Province list", province);
  // console.log("Province selected", selectedProvince);
  // ====== SELECTOR
  // const categorySelector = () => {
  //   return (
  //     <div className={styles.selectorButtonA}>
  //       <select
  //         className={`${styles.select}`}
  //         onChange={(e) => {
  //           setKategori(e.target.value);
  //           handleFilterAi();
  //         }}
  //       >
  //         <option selected>{kategori}</option>
  //         {listCategory.map((a, index) => (
  //           <option key={index}>{a}</option>
  //         ))}
  //       </select>
  //     </div>
  //   );
  // };

  // PROVINCE SELECTOR
  // const provinceSelector = () => {
  //   return (
  //     <div className={styles.selectorButtonB}>
  //       <select
  //         className={`${styles.select}`}
  //         onChange={(e) => {
  //           setselectedProvince(e.target.value);
  //           handleFilterAi();
  //         }}
  //       >
  //         <option value='Pilih Provinsi' selected>
  //           Pilih Provinsi
  //         </option>
  //         {province.length !== 0
  //           ? province?.map((item, i) => (
  //               <option key={item.id} value={item.id}>
  //                 {item.name}
  //               </option>
  //             ))
  //           : "Fetching Data..."}
  //       </select>
  //     </div>
  //   );
  // };

  // const kategoriBesar = () => {
  //   return (
  //     <div className={styles.categoryWrapper}>
  //       <div className={styles.categoryTitle}>Besar</div>
  //       <div className={styles.categoryBody}>
  //         <ul>
  //           {listDataView.high.length !== 0
  //             ? listDataView.high.map((item, id) => {
  //                 return <li>{item.name}</li>;
  //               })
  //             : null}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };
  // const kategoriSedang = () => {
  //   return (
  //     <div className={styles.categoryWrapper}>
  //       <div className={styles.categoryTitle}>Sedang</div>
  //       <div className={styles.categoryBody}>
  //         <ul>
  //           {listDataView.mid.length !== 0
  //             ? listDataView.mid.map((item, id) => {
  //                 return <li>{item.name}</li>;
  //               })
  //             : null}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };
  // const kategoriKecil = () => {
  //   return (
  //     <div className={styles.categoryWrapper}>
  //       <div className={styles.categoryTitle}>Kecil</div>
  //       <div className={styles.categoryBody}>
  //         <ul>
  //           {listDataView.low.length !== 0
  //             ? listDataView.low.map((item, id) => {
  //                 return <li>{item.name}</li>;
  //               })
  //             : null}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className={styles.pageFont}>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${styles.pageTitle} mr-4 `}>{PageTitle()}</span>
            </div>
          </div>
          <div>
            <Breadcrumbs title='Survey Clustering' breadcrumbItem='Map' />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <Card>
          <CardBody>
            <Nav tabs className='nav-tabs-custom mb-4'>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "1",
                  })}
                  onClick={() => {
                    toggleCustom("1");
                  }}
                >
                  <span className='d-none d-sm-block'>
                    Map Persebaran Survey Cluster
                  </span>
                </NavLink>
              </NavItem>
              <div className={`${styles.tableSearchWrapper} ml-auto `}></div>
            </Nav>

            <Row>
              <Col sm='12'>{map()}</Col>
            </Row>
            {/* <TabContent activeTab={customActiveTab}>
              <TabPane tabId='1' className='p-3'>
                <div className={styles.selectorButtonContainer}>
                  <Col md='6' lg='6' sm='6'>
                    {categorySelector()}
                  </Col>
                  <Col md='6' lg='6' sm='6'>
                    {provinceSelector()}
                  </Col>
                </div>
                <Row>
                  <Col sm='12'>{map()}</Col>
                </Row>
                {kategori !== "Pilih Kategori" ||
                selectedProvince !== "Pilih Provinsi" ? (
                  <div className='d-flex justify-content-start flex-row'>
                    <Col md='4' lg='4' sm='4'>
                      {kategoriBesar()}
                    </Col>
                    <Col md='4' lg='4' sm='4'>
                      {kategoriSedang()}
                    </Col>
                    <Col md='4' lg='4' sm='4'>
                      {kategoriKecil()}
                    </Col>
                  </div>
                ) : (
                  ""
                )}
              </TabPane>
            </TabContent> */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SurveyCluster;
