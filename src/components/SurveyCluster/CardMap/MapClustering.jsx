import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  Row,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
  Col,
  CardBody,
  Card,
} from "reactstrap";
import axios from "axios";
import _ from "underscore";
import styles from "./style.module.css";
import Skeleton from "react-loading-skeleton";

//import loader
import Loader from "react-loader-spinner";

// class Maps extends Component {
export default function Map() {
  // constructor(props) {
  //   this.mapRef = React.createRef();
  // }
  const [loading, setloading] = useState(false); // yang map
  const [load, setLoad] = useState(false); // yang bawah
  const loadSkeleton = <Skeleton count={5} />;

  const mapRef = useRef(null);

  const [category, setCategory] = useState("PILIH KATEGORI");
  const [provinsi, setProvinsi] = useState("PILIH PROVINSI");
  const [provId, setProvId] = useState("");

  const [boundBox, setBoundbox] = useState({});

  const listCategory = [
    "SEKOLAH",
    "PUSKESMAS",
    "KANTOR DESA",
    "BALAI KERJA",
    "ALUN-ALUN",
    "KANTOR BABINSA",
    "KANTOR POLSEK",
    "LAIN-LAIN",
  ];

  // const listProv = [
  //   "PAPUA",
  //   "PAPUA BARAT",
  //   "MALUKU",
  //   "MALUKU UTARA",
  //   "NUSA TENGGARA TIMUR",
  //   "NUSA TENGGARA BARAT",
  //   "SULAWESI UTARA",
  //   "SULAWESI TENGAH",
  //   "SULAWESI BARAT",
  //   "SULAWESI SELATAN",
  //   "SULAWESI TENGGARA",
  //   "GORONTALO",
  //   "BALI",
  //   "JAWA TENGAH",
  //   "JAWA TIMUR",
  //   "JAWA BARAT",
  //   "DI YOGYAKARTA",
  //   "DKI JAKARTA",
  //   "BANTEN",
  //   "KALIMANTAN TIMUR",
  //   "KALIMANTAN UTARA",
  //   "KALIMANTAN BARAT",
  //   "KALIMANTAN TENGAH",
  //   "KALIMANTAN SELATAN",
  //   "KEPULAUAN BANGKA BELITUNG",
  //   "BENGKULU",
  //   "LAMPUNG",
  //   "SUMATERA SELATAN",
  //   "SUMATERA BARAT",
  //   "SUMATERA UTARA",
  //   "JAMBI",
  //   "RIAU",
  //   "KEPULAUAN RIAU",
  //   "ACEH",
  // ].sort();

  // List of location
  const [listDataView, setListDatView] = useState({
    low: [],
    mid: [],
    high: [],
  });

  // const [isLoading, setIsLoading] = useState(true);

  // Map State
  const [zoom, setZoom] = useState(1.5);
  const [center, setCenter] = useState([118.0148634, -2.548926]);
  const [maxBounds, setMaxBounds] = useState([
    [91.549305, -13.817646],
    [145.909655, 9.339755],
  ]);

  // Toggle dropdown category
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // variable warna
  const biruBakti = "#406d96";
  const colorHigh = "#3C4856";
  const colorMid = "#92586F";
  const colorLow = "#C98BA2";

  //styling button
  const dropdownButtonStyle = {
    width: "300px",
    height: "30px",
    textIndent: "0.01px",
    textOverflow: '""',
    position: "relative",
    border: "none",
    borderRadius: "5px",
    color: "white",
    textAlignLast: "center",
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "18px",
    padding: "0px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const dropdownCategories = () => {
    return (
      <Dropdown
        className='dropdown-provinsi-select'
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle
          style={{ ...dropdownButtonStyle, background: `${biruBakti}` }}
          caret
        >
          <span style={{ color: "white", fontWeight: "bold" }}>{category}</span>
          {"  "}
          <i
            className='mdi mdi-24px mdi-chevron-down mt-1'
            style={{ color: "white" }}
          />
        </DropdownToggle>
        <DropdownMenu
          className='mx-auto'
          style={{
            maxHeight: "300px",
            width: "100%",
            overflowY: "auto",
            borderRadius: "15px",
          }}
        >
          <DropdownItem>
            <div
              className='text-center'
              onClick={() => {
                setCategory("PILIH KATEGORI");
              }}
            >
              <span style={{ color: `${biruBakti}` }}>PILIH KATEGORI</span>
            </div>
          </DropdownItem>
          {listCategory.map((a, index) => (
            <DropdownItem key={index}>
              <div
                className='text-center'
                onClick={() => {
                  setCategory(a);
                }}
              >
                <span style={{ color: `${biruBakti}` }}>{a}</span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  // Toggle dropdown provinsi
  const [dropdownProvinsiOpen, setDropdownProvinsiOpen] = useState(false);
  const toggleProvinsi = () =>
    setDropdownProvinsiOpen((prevState) => !prevState);

  const dropdownProvinces = () => {
    return (
      <Dropdown
        className='dropdown-provinsi-select'
        isOpen={dropdownProvinsiOpen}
        toggle={toggleProvinsi}
      >
        <DropdownToggle
          style={{ ...dropdownButtonStyle, background: `${biruBakti}` }}
          caret
        >
          <span style={{ color: "white", fontWeight: "bold" }}>{provinsi}</span>
          <i
            className='mdi mdi-24px mdi-chevron-down mt-1'
            style={{ color: "white" }}
          />
        </DropdownToggle>
        <DropdownMenu
          className='mx-auto'
          style={{
            maxHeight: "300px",
            width: "100%",
            overflowY: "auto",
            borderRadius: "15px",
          }}
        >
          <DropdownItem>
            <div
              className='text-center'
              onClick={() => {
                setProvinsi("PILIH PROVINSI");
                changeBoundBox("DEFAULT"); // Cek format on BoundBox.json
              }}
            >
              <span style={{ color: `${biruBakti}` }}>PILIH PROVINSI</span>
            </div>
          </DropdownItem>
          {listProvinsi.length !== 0
            ? listProvinsi.map((a, index) => (
                <DropdownItem key={index}>
                  <div
                    className='text-center'
                    onClick={() => {
                      setProvId(a.id);
                      setProvinsi(a.name);
                      changeBoundBox(a.name);
                    }}
                  >
                    <span style={{ color: `${biruBakti}` }}>{a.name}</span>
                  </div>
                </DropdownItem>
              ))
            : listProvinsi.map((a, index) => (
                <DropdownItem key={index}>
                  <div className='text-center'>
                    <span style={{ color: `${biruBakti}`, fontSize: "15px" }}>
                      No Data
                    </span>
                  </div>
                </DropdownItem>
              ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  const ListHighCluster = () => {
    return (
      <Col xs='12' md='8' lg='4'>
        <Dropdown className='dropdown-provinsi-select'>
          <DropdownToggle
            style={{
              ...dropdownButtonStyle,
              background: `${colorHigh}`,
              marginBottom: "12px",
            }}
          >
            {"BESAR"}
          </DropdownToggle>
        </Dropdown>
        {load ? (
          loadSkeleton
        ) : !_.isEmpty(listDataView.high) ? (
          listDataView.high.map((data, index) => (
            <Row
              key={index}
              className='d-flex justify-content-center justify-content mt-1'
            >
              {data}
            </Row>
          ))
        ) : (
          <Row className='d-flex justify-content-center justify-content mt-1'>
            -
          </Row>
        )}
      </Col>
    );
  };

  const ListMidCluster = () => {
    return (
      <Col xs='12' md='8' lg='4'>
        <Dropdown className='dropdown-provinsi-select'>
          <DropdownToggle
            style={{
              ...dropdownButtonStyle,
              background: `${colorMid}`,
              marginBottom: "12px",
            }}
          >
            {"SEDANG"}
          </DropdownToggle>
        </Dropdown>
        {load ? (
          loadSkeleton
        ) : !_.isEmpty(listDataView.mid) ? (
          listDataView.mid.map((data, index) => (
            <Row
              key={index}
              className='d-flex justify-content-center justify-content mt-1'
            >
              {data}
            </Row>
          ))
        ) : (
          <Row className='d-flex justify-content-center justify-content mt-1'>
            -
          </Row>
        )}
      </Col>
    );
  };

  const ListLowCluster = () => {
    return (
      <Col xs='12' md='8' lg='4'>
        <Dropdown className='dropdown-provinsi-select'>
          <DropdownToggle
            style={{
              ...dropdownButtonStyle,
              background: `${colorLow}`,
              marginBottom: "12px",
            }}
          >
            {"KECIL"}
          </DropdownToggle>
        </Dropdown>
        {load ? (
          loadSkeleton
        ) : !_.isEmpty(listDataView.low) ? (
          listDataView.low.map((data, index) => (
            <Row
              key={index}
              className='d-flex justify-content-center justify-content mt-1'
            >
              {data}
            </Row>
          ))
        ) : (
          <Row className='d-flex justify-content-center justify-content mt-1'>
            -
          </Row>
        )}
      </Col>
    );
  };

  // create map
  const Map = ReactMapboxGl({
    maxZoom: 20,
    minZoom: 1,
    accessToken:
      "pk.eyJ1IjoiamF3YXN0cmVzcyIsImEiOiJjanBjc3cwOWIxNzVrM3Fta2R1NGZmdW12In0.ra1FXvu_TM9MmhiL7VZuqA",
  });

  let hoveredStateId = null;

  const containerCSS = {
    boxSizing: "border-box",
    height: "100%",
    backgroundColor: "white",
    display: "block",
    width: "100%",
  };

  const mapCSS = {
    boxSizing: "border-box",
    height: "30rem",
    backgroundColor: "white",
    display: "block",
    width: "100%",
  };

  const changeBoundBox = async (provinsi) => {
    const boundBox = await import(`./BoundBox.json`);
    const provinsiJson = getProvinsiJson(provinsi);
    const bound = boundBox[`${provinsiJson}`].bbox;

    setMaxBounds(bound);
  };

  const getProvinsiJson = (provinsi) => {
    let provinsiJson;

    switch (provinsi) {
      case "KEPULAUAN BANGKA BELITUNG":
        provinsiJson = "BABEL";
        break;
      case "DKI JAKARTA":
        provinsiJson = "JAKARTA";
        break;
      case "JAWA BARAT":
        provinsiJson = "JAWA_BARAT";
        break;
      case "JAWA TENGAH":
        provinsiJson = "JAWA_TENGAH";
        break;
      case "JAWA TIMUR":
        provinsiJson = "JAWA_TIMUR";
        break;
      case "KALIMANTAN BARAT":
        provinsiJson = "KALIMANTAN_BARAT";
        break;
      case "KALIMANTAN SELATAN":
        provinsiJson = "KALIMANTAN_SELATAN";
        break;
      case "KALIMANTAN TENGAH":
        provinsiJson = "KALIMANTAN_TENGAH";
        break;
      case "KALIMANTAN TIMUR":
        provinsiJson = "KALIMANTAN_TIMUR";
        break;
      case "KALIMANTAN UTARA":
        provinsiJson = "KALIMANTAN_UTARA";
        break;
      case "KEPULAUAN RIAU":
        provinsiJson = "KEPRI";
        break;
      case "MALUKU UTARA":
        provinsiJson = "MALUKU_UTARA";
        break;
      case "NUSA TENGGARA BARAT":
        provinsiJson = "NTB";
        break;
      case "NUSA TENGGARA TIMUR":
        provinsiJson = "NTT";
        break;
      case "PAPUA BARAT":
        provinsiJson = "PAPUA_BARAT";
        break;
      case "SULAWESI BARAT":
        provinsiJson = "SULAWESI_BARAT";
        break;
      case "SULAWESI SELATAN":
        provinsiJson = "SULAWESI_SELATAN";
        break;
      case "SULAWESI TENGAH":
        provinsiJson = "SULAWESI_TENGAH";
        break;
      case "SULAWESI TENGGARA":
        provinsiJson = "SULAWESI_TENGGARA";
        break;
      case "SULAWESI UTARA":
        provinsiJson = "SULAWESI_UTARA";
        break;
      case "SUMATERA BARAT":
        provinsiJson = "SUMATERA_BARAT";
        break;
      case "SUMATERA SELATAN":
        provinsiJson = "SUMATERA_SELATAN";
        break;
      case "SUMATERA UTARA":
        provinsiJson = "SUMATERA_UTARA";
        break;
      case "DI YOGYAKARTA":
        provinsiJson = "YOGYAKARTA";
        break;
      default:
        provinsiJson = provinsi;
        break;
    }

    return provinsiJson;
  };

  const reverseGetProvinsiJson = (provinsi) => {
    let provinsiJson;

    switch (provinsi) {
      case "BABEL":
        provinsiJson = "KEPULAUAN BANGKA BELITUNG";
        break;
      case "JAKARTA":
        provinsiJson = "DKI JAKARTA";
        break;
      case "JAWA_BARAT":
        provinsiJson = "JAWA BARAT";
        break;
      case "JAWA_TENGAH":
        provinsiJson = "JAWA TENGAH";
        break;
      case "JAWA_TIMUR":
        provinsiJson = "JAWA TIMUR";
        break;
      case "KALIMANTAN_BARAT":
        provinsiJson = "KALIMANTAN BARAT";
        break;
      case "KALIMANTAN_SELATAN":
        provinsiJson = "KALIMANTAN SELATAN";
        break;
      case "KALIMANTAN_TENGAH":
        provinsiJson = "KALIMANTAN TENGAH";
        break;
      case "KALIMANTAN_TIMUR":
        provinsiJson = "KALIMANTAN TIMUR";
        break;
      case "KALIMANTAN_UTARA":
        provinsiJson = "KALIMANTAN UTARA";
        break;
      case "KEPRI":
        provinsiJson = "KEPULAUAN RIAU";
        break;
      case "MALUKU_UTARA":
        provinsiJson = "MALUKU UTARA";
        break;
      case "NTB":
        provinsiJson = "NUSA TENGGARA BARAT";
        break;
      case "NTT":
        provinsiJson = "NUSA TENGGARA TIMUR";
        break;
      case "PAPUA_BARAT":
        provinsiJson = "PAPUA BARAT";
        break;
      case "SULAWESI_BARAT":
        provinsiJson = "SULAWESI BARAT";
        break;
      case "SULAWESI_SELATAN":
        provinsiJson = "SULAWESI SELATAN";
        break;
      case "SULAWESI_TENGAH":
        provinsiJson = "SULAWESI TENGAH";
        break;
      case "SULAWESI_TENGGARA":
        provinsiJson = "SULAWESI TENGGARA";
        break;
      case "SULAWESI_UTARA":
        provinsiJson = "SULAWESI UTARA";
        break;
      case "SUMATERA_BARAT":
        provinsiJson = "SUMATERA BARAT";
        break;
      case "SUMATERA_SELATAN":
        provinsiJson = "SUMATERA SELATAN";
        break;
      case "SUMATERA_UTARA":
        provinsiJson = "SUMATERA UTARA";
        break;
      case "YOGYAKARTA":
        provinsiJson = "DI YOGYAKARTA";
        break;
      default:
        provinsiJson = provinsi;
        break;
    }

    return provinsiJson;
  };

  const listData = (data) => {
    return (
      <div>
        {data.map(function (d, idx) {
          return <li key={idx}>{reverseGetProvinsiJson(d.code)}</li>;
        })}
      </div>
    );
  };

  // capitalize first char each word
  function capitalize(s) {
    return s.toLowerCase().replace(/\b./g, function (a) {
      return a.toUpperCase();
    });
  }

  // dropdown province
  const [listProvinsi, setListProvinsi] = useState([]);
  useEffect(() => {
    async function fetchDataProv() {
      return fetch(`${process.env.REACT_APP_BE_URL}/location/provinsi/`)
        .then((result) => result.json())
        .then(async (result) => {
          setListProvinsi(result.data);
        })
        .catch((e) => console.log("error", e));
    }
    fetchDataProv();
  }, []);

  // get list data view cluster, when province or category change
  useEffect(() => {
    if (category === "PILIH KATEGORI" && provinsi === "PILIH PROVINSI") {
      //do nothing
    } else if (category !== "PILIH KATEGORI" && provinsi === "PILIH PROVINSI") {
      setLoad(true);
      const requestBody = {
        category: capitalize(category),
        province: "",
      };

      axios
        // .get(`${process.env.REACT_APP_BE_URL}/survey/getpenugasan/count/provinsi`) // for testing
        .post(`${process.env.REACT_APP_BE_URL}/util/filterAi/`, requestBody)
        .then(async (res) => {
          if (res.data.success) {
            getListDataView(res.data.values);
          } else {
            getListDataView(null);
          }
        })
        .catch((e) => getListDataView(null));
    } else {
      setLoad(true);
      let selectedCat;
      category === "PILIH KATEGORI"
        ? (selectedCat = "")
        : (selectedCat = capitalize(category));
      const requestBody = {
        category: selectedCat,
        province: provId,
      };

      axios
        // .get(`${process.env.REACT_APP_BE_URL}/survey/getpenugasan/count/provinsi`) // for testing
        .post(`${process.env.REACT_APP_BE_URL}/util/filterAi/`, requestBody)
        .then(async (res) => {
          if (res.data.success) {
            getListDataView(res.data.values);
          } else {
            getListDataView(null);
          }
        })
        .catch((e) => getListDataView(null));
    }
  }, [provinsi, category, provId]);

  // get list data view cluster
  const getListDataView = useCallback(
    (result) => {
      if (result !== null) {
        setLoad(false);
        //  for list data low, mid, or high
        setListDatView((prev) => ({
          ...prev,
          low: _.map(result.low, function (value) {
            return value.name;
          }),
          mid: _.map(result.mid, function (value) {
            return value.name;
          }),
          high: _.map(result.high, function (value) {
            return value.name;
          }),
        }));
      } else {
        //if data not provided yet
        setListDatView({
          low: [],
          mid: [],
          high: [],
        });
        setLoad(false);
      }
    },
    [provinsi, category, provId]
  );

  return (
    <>
      <Row className='d-flex justify-content-center  mt-1'>
        <Col xs='12' md='8' lg='4'>
          {dropdownCategories()}
        </Col>
        <Col xs='12' md='8' lg='4'>
          {dropdownProvinces()}
        </Col>
      </Row>

      <CardBody>
        <Fragment>
          <div style={containerCSS}>
            {load ? (
              <div
                className='w-100 h-100 d-flex justify-content-center align-items-center'
                style={{ minHeight: "30rem", width: "100%" }}
              >
                <Loader
                  type='Puff'
                  color='#A8D0DA'
                  height={60}
                  width={60}
                  loading={loading}
                />
              </div>
            ) : listDataView ? (
              <Map
                ref={mapRef}
                // zoom={[6]}
                // center={[124.1622609, -9.4498569]} // NTT
                zoom={[zoom]}
                center={center}
                maxBounds={maxBounds}
                style={"mapbox://styles/mapbox/light-v10"}
                containerStyle={mapCSS}
                onStyleLoad={async (map, load) => {
                  const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                  });

                  if (
                    category === "PILIH KATEGORI" &&
                    provinsi === "PILIH PROVINSI"
                  ) {
                    // TODO: Zoom out to Indonesia view

                    // Nothing selected
                    const INDONESIA = await import("./files/INDONESIA.json");

                    map.addSource("indonesiaSource", {
                      type: "geojson",
                      data: INDONESIA,
                    });

                    map.addLayer({
                      id: "indonesiaLayer",
                      type: "fill",
                      maxzoom: 10,
                      source: "indonesiaSource",
                      layout: {
                        visibility: "visible",
                      },
                      paint: {
                        "fill-color": `${biruBakti}`,
                        "fill-opacity": 0.6,
                      },
                    });
                  } else if (
                    category !== "PILIH KATEGORI" &&
                    provinsi === "PILIH PROVINSI"
                  ) {
                    // Category selected, provinsi doesnt. National Distribution
                    const requestBody = {
                      category: capitalize(category),
                      province: "",
                    };

                    axios
                      .post(
                        `${process.env.REACT_APP_BE_URL}/util/filterAi/`,
                        requestBody
                      )
                      .then(async (res) => {
                        const importedJson = await import(
                          `./files/INDONESIA.json`
                        );
                        // mapping provinsi data to provinsi layer
                        _.map(importedJson.features, function (p) {
                          // for High
                          _.map(res.data.values.high, function (key, value) {
                            if (p.properties.idfetch === key.name) {
                              p.properties.name = key.name;
                              p.properties.cluster = "Besar";
                              p.properties.count = key.count;
                            }
                          });

                          // for Mid
                          _.map(res.data.values.mid, function (key, value) {
                            if (p.properties.idfetch === key.name) {
                              p.properties.name = key.name;
                              p.properties.cluster = "Sedang";
                              p.properties.count = key.count;
                            }
                          });

                          // for Low
                          _.map(res.data.values.low, function (key, value) {
                            if (p.properties.idfetch === key.name) {
                              p.properties.name = key.name;
                              p.properties.cluster = "Kecil";
                              p.properties.count = key.count;
                            }
                          });
                        });

                        return importedJson;
                      })
                      .then((result) => {
                        map.addSource("sourceCluster", {
                          type: "geojson",
                          data: result,
                        });

                        map.addLayer({
                          id: "layerCluster",
                          type: "fill",
                          maxzoom: 10,
                          source: "sourceCluster",
                          layout: {
                            visibility: "visible",
                          },
                          paint: {
                            "fill-color": [
                              "match",

                              // For clustering
                              ["get", "cluster"],
                              "Besar",
                              `${colorHigh}`,
                              "Sedang",
                              `${colorMid}`,
                              `${colorLow}`, // Low
                            ],
                            "fill-opacity": 0.6,
                          },
                        });

                        map.addControl(new mapboxgl.FullscreenControl());

                        map.on("click", "layerCluster", function (e) {
                          console.log(e.features[0].properties);
                        });

                        map.on("mousemove", "layerCluster", function (e) {
                          let popInfo = `
                        <span style="display: block;">Provinsi : ${
                          e.features[0].properties.name ?? "-"
                        }</span>
                        <span style="display: block;">Cluster: ${
                          e.features[0].properties.cluster ?? "Kecil"
                        }</span>
                        <span style="display: block;">Lokasi Sudah disurvey: ${
                          e.features[0].properties.count ?? 0
                        }</span>
                        `;
                          map.getCanvas().style.cursor = "pointer";

                          if (e.features.length > 0) {
                            if (hoveredStateId) {
                              map.setFeatureState(
                                { source: "sourceCluster", id: hoveredStateId },
                                { hover: "default" }
                              );
                              popup
                                .setLngLat(e.lngLat)
                                .setHTML(popInfo)
                                .addTo(map);
                            }

                            hoveredStateId = e.features[0].properties.id;

                            map.setFeatureState(
                              { source: "sourceCluster", id: hoveredStateId },
                              { hover: "hover" }
                            );
                          }
                        });

                        map.on("mouseleave", "layerCluster", function () {
                          map.getCanvas().style.cursor = "";
                          popup.remove();
                        });
                      });
                  } else {
                    // There is provinsi selected, regardless category selected or not
                    const requestBody = {
                      category:
                        capitalize(category) === "Pilih Kategori"
                          ? ""
                          : capitalize(category),
                      province: provId,
                    };

                    axios
                      .post(
                        `${process.env.REACT_APP_BE_URL}/util/filterAi/`,
                        requestBody
                      )
                      .then(async (res) => {
                        const jsonFile =
                          provinsi === "PILIH PROVINSI"
                            ? "INDONESIA"
                            : getProvinsiJson(provinsi);
                        const importedJson = await import(
                          `./files/${jsonFile}.json`
                        );

                        // mapping provinsi data to provinsi layer
                        _.map(importedJson.features, function (p) {
                          // for High
                          _.map(res.data.values.high, function (key, value) {
                            if (p.properties.kabupaten === key.name) {
                              p.properties.name = key.name;
                              p.properties.cluster = "Besar";
                              p.properties.count = key.count;
                            }
                          });

                          // for Mid
                          _.map(res.data.values.mid, function (key, value) {
                            if (p.properties.kabupaten === key.name) {
                              p.properties.name = key.name;
                              p.properties.cluster = "Sedang";
                              p.properties.count = key.count;
                            }
                          });

                          // for Low
                          _.map(res.data.values.low, function (key, value) {
                            if (p.properties.kabupaten === key.name) {
                              p.properties.name = key.name;
                              p.properties.cluster = "Kecil";
                              p.properties.count = key.count;
                            }
                          });
                        });

                        return importedJson;
                      })
                      .then((result) => {
                        map.addSource("sourceCluster", {
                          type: "geojson",
                          data: result,
                        });

                        map.addLayer({
                          id: "layerCluster",
                          type: "fill",
                          maxzoom: 10,
                          source: "sourceCluster",
                          layout: {
                            visibility: "visible",
                          },
                          paint: {
                            "fill-color": [
                              "match",

                              // For clustering
                              ["get", "cluster"],
                              "Besar",
                              `${colorHigh}`,
                              "Sedang",
                              `${colorMid}`,
                              `${colorLow}`, // Low
                            ],
                            "fill-opacity": 0.6,
                          },
                        });

                        map.addControl(new mapboxgl.FullscreenControl());

                        map.on("click", "layerCluster", function (e) {
                          console.log(e.features[0].properties);
                        });

                        map.on("mousemove", "layerCluster", function (e) {
                          let popInfo = `
                        <span style="display: block;">Kabupaten : ${
                          e.features[0].properties.name ?? "-"
                        }</span>
                        <span style="display: block;">Cluster: ${
                          e.features[0].properties.cluster ?? "Kecil"
                        }</span>
                        <span style="display: block;">Lokasi Sudah disurvey: ${
                          e.features[0].properties.count ?? 0
                        }</span>
                        `;
                          map.getCanvas().style.cursor = "pointer";

                          if (e.features.length > 0) {
                            hoveredStateId =
                              e.features[0].properties.kabupaten_;

                            if (hoveredStateId) {
                              map.setFeatureState(
                                { source: "sourceCluster", id: hoveredStateId },
                                { hover: "default" }
                              );
                              popup
                                .setLngLat(e.lngLat)
                                .setHTML(popInfo)
                                .addTo(map);
                            }

                            map.setFeatureState(
                              { source: "sourceCluster", id: hoveredStateId },
                              { hover: "hover" }
                            );
                          }
                        });

                        map.on("mouseleave", "layerCluster", function () {
                          map.getCanvas().style.cursor = "";
                          popup.remove();
                        });
                      });
                  }
                }}
              ></Map>
            ) : (
              <p>No Map Data Found</p>
            )}{" "}
          </div>
        </Fragment>
      </CardBody>

      <Row className='d-flex justify-content-center mb-3 mt-1'>
        {(category !== "PILIH KATEGORI" || provinsi !== "PILIH PROVINSI") && (
          <Fragment>
            <ListHighCluster />
            <ListMidCluster />
            <ListLowCluster />
          </Fragment>
        )}
      </Row>
    </>
  );
}

// export default Maps;
