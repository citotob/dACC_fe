import React, { useEffect, useState } from "react";
import Map from "./Map/Home/MapsVector";
import ModalDesa from "./Map/Home/ModalListDesa";
import {
  Container,
  Button,
  Row,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
  Col,
  CardBody,
  CardTitle,
  Card,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import Axios from "axios";

import "./stylemap.css";
import Toggle from "react-toggle";

export default function CardMap() {
  const [prov, setProv] = useState("PILIH PROVINSI");
  // const [listProv, setListProv] = useState([]);
  const [desa, setDesa] = useState([]);
  const [data, setData] = useState([
    {
      count_AI: 0,
      count_BTS: 0,
      issue_AI: 0,
      issue_BTS: 0,
      provinsi: "",
      surveyed_AI: 0,
      surveyed_BTS: 0,
      unsurveyed_AI: 0,
      unsurveyed_BTS: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [idRegion, setIdRegion] = useState("");
  const [AI, setAI] = useState(true);
  const [BTS, setBTS] = useState(false);

  let idUser = window.localStorage.getItem("idUser");

  const [modalDesa, setModalDesa] = useState(false);

  const toggleDesa = () => setModalDesa(!modalDesa);

  const onclikRegion = (param) => {
    switch (param) {
      case "ID_pa":
        setProv("PAPUA");
        break;
      case "ID_pb":
        setProv("PAPUA BARAT");
        break;
      case "ID_ma":
        setProv("MALUKU");
        break;
      case "ID_mu":
        setProv("MALUKU UTARA");
        break;
      case "ID_nt":
        setProv("NUSA TENGGARA TIMUR");
        break;
      case "ID_nb":
        setProv("NUSA TENGGARA BARAT");
        break;
      case "ID_sa":
        setProv("SULAWESI UTARA");
        break;
      case "ID_st":
        setProv("SULAWESI TENGAH");
        break;
      case "ID_sr":
        setProv("SULAWESI BARAT");
        break;
      case "ID_sn":
        setProv("SULAWESI SELATAN");
        break;
      case "ID_sg":
        setProv("SULAWESI TENGGARA");
        break;
      case "ID_go":
        setProv("GORONTALO");
        break;
      case "ID_ba":
        setProv("BALI");
        break;
      case "ID_jt":
        setProv("JAWA TENGAH");
        break;
      case "ID_jl":
        setProv("JAWA TIMUR");
        break;
      case "ID_jb":
        setProv("JAWA BARAT");
        break;
      case "ID_yo":
        setProv("DI YOGYAKARTA");
        break;
      case "ID_jk":
        setProv("DKI JAKARTA");
        break;
      case "ID_bt":
        setProv("BANTEN");
        break;
      case "ID_ki":
        setProv("KALIMANTAN TIMUR");
        break;
      case "ID_ku":
        setProv("KALIMANTAN UTARA");
        break;
      case "ID_kb":
        setProv("KALIMANTAN BARAT");
        break;
      case "ID_kt":
        setProv("KALIMANTAN TENGAH");
        break;
      case "ID_ks":
        setProv("KALIMANTAN SELATAN");
        break;
      case "ID_bb":
        setProv("KEPULAUAN BANGKA BELITUNG");
        break;
      case "ID_be":
        setProv("BENGKULU");
        break;
      case "ID_la":
        setProv("LAMPUNG");
        break;
      case "ID_ss":
        setProv("SUMATERA SELATAN");
        break;
      case "ID_sb":
        setProv("SUMATERA BARAT");
        break;
      case "ID_su":
        setProv("SUMATERA UTARA");
        break;
      case "ID_ja":
        setProv("JAMBI");
        break;
      case "ID_ri":
        setProv("RIAU");
        break;
      case "ID_kr":
        setProv("KEPULAUAN RIAU");
        break;
      case "ID_ac":
        setProv("ACEH");
        break;

      default:
        break;
    }
    setIdRegion(param);
  };

  const selectedDropdownProv = (param) => {
    switch (param) {
      case "PAPUA":
        setIdRegion("ID_pa");
        break;
      case "PAPUA BARAT":
        setIdRegion("ID_pb");
        break;
      case "MALUKU":
        setIdRegion("ID_ma");
        break;
      case "MALUKU UTARA":
        setIdRegion("ID_mu");
        break;
      case "NUSA TENGGARA TIMUR":
        setIdRegion("ID_nt");
        break;
      case "NUSA TENGGARA BARAT":
        setIdRegion("ID_nb");
        break;
      case "SULAWESI UTARA":
        setIdRegion("ID_sa");
        break;
      case "SULAWESI TENGAH":
        setIdRegion("ID_st");
        break;
      case "SULAWESI BARAT":
        setIdRegion("ID_sr");
        break;
      case "SULAWESI SELATAN":
        setIdRegion("ID_sn");
        break;
      case "SULAWESI TENGGARA":
        setIdRegion("ID_sg");
        break;
      case "GORONTALO":
        setIdRegion("ID_go");
        break;
      case "BALI":
        setIdRegion("ID_ba");
        break;
      case "JAWA TENGAH":
        setIdRegion("ID_jt");
        break;
      case "JAWA TIMUR":
        setIdRegion("ID_jl");
        break;
      case "JAWA BARAT":
        setIdRegion("ID_jb");
        break;
      case "DI YOGYAKARTA":
        setIdRegion("ID_yo");
        break;
      case "DKI JAKARTA":
        setIdRegion("ID_jk");
        break;
      case "BANTEN":
        setIdRegion("ID_bt");
        break;
      case "KALIMANTAN TIMUR":
        setIdRegion("ID_ki");
        break;
      case "KALIMANTAN UTARA":
        setIdRegion("ID_ku");
        break;
      case "KALIMANTAN BARAT":
        setIdRegion("ID_kb");
        break;
      case "KALIMANTAN TENGAH":
        setIdRegion("ID_kt");
        break;
      case "KALIMANTAN SELATAN":
        setIdRegion("ID_ks");
        break;
      case "KEPULAUAN BANGKA BELITUNG":
        setIdRegion("ID_bb");
        break;
      case "BENGKULU":
        setIdRegion("ID_be");
        break;
      case "LAMPUNG":
        setIdRegion("ID_la");
        break;
      case "SUMATERA SELATAN":
        setIdRegion("ID_ss");
        break;
      case "SUMATERA BARAT":
        setIdRegion("ID_sb");
        break;
      case "SUMATERA UTARA":
        setIdRegion("ID_su");
        break;
      case "JAMBI":
        setIdRegion("ID_ja");
        break;
      case "RIAU":
        setIdRegion("ID_ri");
        break;
      case "KEPULAUAN RIAU":
        setIdRegion("ID_kr");
        break;
      case "ACEH":
        setIdRegion("ID_ac");
        break;

      default:
        break;
    }
  };

  const listProv = [
    "PAPUA",
    "PAPUA BARAT",
    "MALUKU",
    "MALUKU UTARA",
    "NUSA TENGGARA TIMUR",
    "NUSA TENGGARA BARAT",
    "SULAWESI UTARA",
    "SULAWESI TENGAH",
    "SULAWESI BARAT",
    "SULAWESI SELATAN",
    "SULAWESI TENGGARA",
    "GORONTALO",
    "BALI",
    "JAWA TENGAH",
    "JAWA TIMUR",
    "JAWA BARAT",
    "DI YOGYAKARTA",
    "DKI JAKARTA",
    "BANTEN",
    "KALIMANTAN TIMUR",
    "KALIMANTAN UTARA",
    "KALIMANTAN BARAT",
    "KALIMANTAN TENGAH",
    "KALIMANTAN SELATAN",
    "KEPULAUAN BANGKA BELITUNG",
    "BENGKULU",
    "LAMPUNG",
    "SUMATERA SELATAN",
    "SUMATERA BARAT",
    "SUMATERA UTARA",
    "JAMBI",
    "RIAU",
    "KEPULAUAN RIAU",
    "ACEH",
  ].sort();

  const getDataProv = () => {
    if (prov === "PILIH PROVINSI") {
      setData([
        {
          count_AI: 0,
          count_BTS: 0,
          issue_AI: 0,
          issue_BTS: 0,
          provinsi: "",
          surveyed_AI: 0,
          surveyed_BTS: 0,
          unsurveyed_AI: 0,
          unsurveyed_BTS: 0,
        },
      ]);
      setLoading(false);
      setIdRegion("");
    } else {
      setLoading(true);
      Axios.get(`${process.env.REACT_APP_BE_URL}/survey/getpenugasan/count/provinsi`)
        .then((res) => {
          const dataProv = res.data.values.filter((e) => {
            return e.provinsi === prov;
          });
          if (dataProv.length === 0) {
            setData([
              {
                count_AI: 0,
                count_BTS: 0,
                issue_AI: 0,
                issue_BTS: 0,
                provinsi: "",
                surveyed_AI: 0,
                surveyed_BTS: 0,
                unsurveyed_AI: 0,
                unsurveyed_BTS: 0,
              },
            ]);
          } else {
            setData(dataProv);
          }
          Axios.post(`${process.env.REACT_APP_BE_URL}/survey/getsurvey/provinsi/ai/`, {
            provinsi: prov,
          })
            .then((res) => {
              setDesa(res.data.values);
            })
            .catch((err) => {
              setDesa([]);
            });
          setLoading(false);
        })
        .catch((err) => {
          setData([]);
        });
    }
  };

  // const getLisProvinces = () => {
  //   API.getAllProvince()
  //     .then((res) => {
  //       setListProv(res.data.data);
  //     })
  //     .catch((err) => setListProv([]));
  // };

  useEffect(() => {
    getDataProv();
    // getLisProvinces();
  }, [prov]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const dropdownProvinces = () => {
    return (
      <Dropdown className="dropdown-provinsi-select" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "25px",
            borderColor: "#C42127",
            borderWidth: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          caret>
          <span style={{ color: "#C42127", fontWeight: "bold" }}>{prov}</span>
          {"  "}
          <i className="mdi mdi-24px mdi-chevron-down" style={{ color: "#C42127" }} />
        </DropdownToggle>
        <DropdownMenu
          className="mx-auto"
          style={{ maxHeight: "300px", width: "100%", overflowY: "auto", borderRadius: "15px" }}>
          <DropdownItem>
            <div
              className="text-center"
              onClick={() => {
                setProv("PILIH PROVINSI");
                selectedDropdownProv("PILIH PROVINSI");
              }}>
              <span style={{ color: "#C42127" }}>PILIH PROVINSI</span>
            </div>
          </DropdownItem>
          {listProv.length !== 0
            ? listProv.map((a) => (
                <DropdownItem>
                  <div
                    className="text-center"
                    onClick={() => {
                      setProv(a);
                      selectedDropdownProv(a);
                    }}>
                    <span style={{ color: "#C42127" }}>{a}</span>
                  </div>
                </DropdownItem>
              ))
            : listProv.map((a) => (
                <DropdownItem>
                  <div className="text-center">
                    <span style={{ color: "#C42127", fontSize: "15px" }}>No Data</span>
                  </div>
                </DropdownItem>
              ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  const handleAI = () => {
    setAI(true);
    setBTS(false);
  };
  const handleBTS = () => {
    setBTS(true);
    setAI(false);
  };

  const customSkleton = <Skeleton circle={true} height={15} width={15} />;

  return (
    <div className="card-body" style={{ backgroundColor: "white" }}>
      <ModalDesa toggle={toggleDesa} modal={modalDesa} desa={desa} />
      <Row>
        <Col lg="6">
          <h6>
            <b>Map Persebaran Lokasi Survey</b>
          </h6>
        </Col>
        <Col lg="6">
          <div className={"d-flex justify-content-end"}>
            <Button size="sm" className={AI ? "btnAI" : ""} onClick={handleAI}>
              Akses Internet
            </Button>
            <Button
              size="sm"
              onClick={handleBTS}
              className={BTS ? "ml-2 mr-1 btnBTS" : "ml-2 mr-1"}>
              BTS
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mb-3 mt-1">
        <Col xs="12" md="8" lg="4">
          {dropdownProvinces()}
        </Col>
      </Row>
      <div className="p-2 mx-3">
        <Row className="d-flex justify-content-end">
          <Col lg="12">
            <div className="p-1">
              {/* <CardBody className="p-1 pt-0"> */}
              {AI ? (
                <CardTitle
                  className="text-center font-weight-bold mb-1"
                  style={{ color: "#2c3280" }}>
                  TOTAL AI |{" "}
                  <Button
                    style={{ borderRadius: "20px", fontSize: "10px", backgroundColor: "#2c3280", padding:'1px 4px 1px 4px', margin:'0px' }}
                    onClick={toggleDesa}>
                    List Desa
                  </Button>
                </CardTitle>
              ) : (
                <CardTitle
                  className="text-center font-weight-bold mb-1"
                  style={{ color: "#C42127" }}>
                  TOTAL BTS |{" "}
                  <Button
                    style={{ borderRadius: "20px", fontSize: "10px", backgroundColor: "#C42127", padding:'1px 4px 1px 4px', margin:'0px' }}
                    onClick={toggleDesa}>
                    List Desa
                  </Button>
                </CardTitle>
              )}
              <Row>
                <Col md="12" lg="3" className="title-map text-center">
                  Total Lokasi :{" "}
                  {loading == true
                    ? customSkleton
                    : data.length !== 0
                    ? AI
                      ? data[0].count_AI ?? 0
                      : data[0].count_BTS ?? 0
                    : "Server Error"}
                </Col>
                <Col md="12" lg="3" className="title-map text-center">
                  Lokasi Sudah disurvey :{" "}
                  {loading == true
                    ? customSkleton
                    : data.length !== 0
                    ? AI
                      ? data[0].surveyed_AI ?? 0
                      : data[0].surveyed_BTS ?? 0
                    : "Tidak ada Data"}
                </Col>
                <Col md="12" lg="3" className="title-map text-center">
                  Lokasi Belum disurvey :{" "}
                  {loading == true
                    ? customSkleton
                    : data.length !== 0
                    ? AI
                      ? data[0].unsurveyed_AI ?? 0
                      : data[0].unsurveyed_BTS ?? 0
                    : "Tidak ada Data"}
                </Col>
                <Col md="12" lg="3" className="title-map text-center">
                  Total Isu Temuan :{" "}
                  {loading == true
                    ? customSkleton
                    : data.length !== 0
                    ? AI
                      ? data[0].issue_AI ?? 0
                      : data[0].issue_BTS ?? 0
                    : "Tidak ada Data"}
                </Col>
              </Row>
              {/* </CardBody> */}
            </div>
          </Col>
        </Row>
        {/* <Map selectedProv={onclikRegion} idRegion={idRegion} /> */}
        <div style={{ zIndex: "90" }}>
          <Map onclikRegion={onclikRegion} idRegion={idRegion} AI={AI} />
        </div>
      </div>
    </div>
  );
}
