import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TabContent,
  TabPane,
  NavLink,
  NavItem,
  Nav,
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  Label,
} from "reactstrap";

// IMPORT STYLE
import style from "./style.module.scss";
import classnames from "classnames";

import get from "lodash/get";

function CardForm(props) {
  const history = useHistory();
  const moment = require("moment");
  const data = props?.datatable;

  // Modal input states
  const [inputOperator1, setInputOperator1] = useState({
    operator: "pilih",
    mcc: "",
    mnc: "",
    tac: "",
    type: "",
    enb: "",
    cid: "",
    pci: "",
    f: "",
    b: "",
    ta: "",
    rsrp: "",
    rsrq: "",
    snr: "",
    cqi: "",
    rssi: "",
  });

  const [inputOperator2, setInputOperator2] = useState({
    operator: "pilih",
    mcc: "",
    mnc: "",
    tac: "",
    type: "",
    enb: "",
    cid: "",
    pci: "",
    f: "",
    b: "",
    ta: "",
    rsrp: "",
    rsrq: "",
    snr: "",
    cqi: "",
    rssi: "",
  });

  const [inputInformasi, setInputInformasi] = useState({
    longitude: "",
    latitude: "",
    speed: "",
    hdg: "",
    gpsacc: "",
    height: "",
    altitude: "",
    ground: "",
    ul: "",
    dl: "",
    data: "",
  });

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState();

  // states for tabs
  const [activeTab, setactiveTab] = useState("1");

  // upload file function
  function handleChange(e) {
    switch (e.target.name) {
      case "doc":
        let fileExtension = e.target.files[0].name.split(".").pop();
        if (fileExtension !== "pdf") {
          setErrorDocFormat("Format Dokumen harus .pdf");
          setDocUpload("");
        } else {
          setErrorDocFormat("");
          setDocUpload(e.target.files[0]);
        }
        break;
    }
  }
  const Section1 = ({ data }) => {
    const moment = require("moment");
    // console.log("data dari section 1", data);
    return (
      <CardBody>
        <CardTitle className={`mb-5 mt-2 text26`} >
          Operator Sim 1
        </CardTitle>
        <Row>
          <Col sm='12'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className='form-group'>
                <label htmlFor='operator'>Operator Sim 1</label>
                <select
                  className='form-control'
                  id='operator'
                  value={inputOperator1.operator}
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      operator: e.target.value,
                    });
                  }}
                >
                  <option value='pilih'>Pilih Operator</option>
                  <option value='aaa'>aaa</option>
                  <option value='bbb'>bbb</option>
                  <option value='ccc'>ccc</option>
                  <option value='ddd'>ddd</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='mcc'>MCC</label>
                <input
                  value={inputOperator1.mcc}
                  type='text'
                  className='form-control'
                  id='mcc'
                  placeholder='MCC'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      mcc: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='mnc'>MNC</label>
                <input
                  value={inputOperator1.mnc}
                  type='text'
                  className='form-control'
                  id='mnc'
                  placeholder='MNC'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      mnc: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='tac'>TAC</label>
                <input
                  value={inputOperator1.tac}
                  type='text'
                  className='form-control'
                  id='tac'
                  placeholder='TAC'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      tac: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='type'>Type</label>
                <input
                  value={inputOperator1.type}
                  type='text'
                  className='form-control'
                  id='type'
                  placeholder='Type'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      type: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='enb'>eNB</label>
                <input
                  value={inputOperator1.enb}
                  type='text'
                  className='form-control'
                  id='enb'
                  placeholder='eNB'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      enb: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='cid'>CID</label>
                <input
                  value={inputOperator1.cid}
                  type='text'
                  className='form-control'
                  id='cid'
                  placeholder='CID'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      cid: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='pci'>PCI</label>
                <input
                  value={inputOperator1.pci}
                  type='text'
                  className='form-control'
                  id='pci'
                  placeholder='PCI'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      pci: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='f'>F</label>
                <input
                  value={inputOperator1.f}
                  type='text'
                  className='form-control'
                  id='f'
                  placeholder='F'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      f: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='b'>B</label>
                <input
                  value={inputOperator1.b}
                  type='text'
                  className='form-control'
                  id='b'
                  placeholder='B'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      b: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ta'>TA</label>
                <input
                  value={inputOperator1.ta}
                  type='text'
                  className='form-control'
                  id='ta'
                  placeholder='TA'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      ta: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rsrp'>RSRP</label>
                <input
                  value={inputOperator1.rsrp}
                  type='text'
                  className='form-control'
                  id='rsrp'
                  placeholder='RSRP'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      rsrp: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rsrq'>RSRQ</label>
                <input
                  value={inputOperator1.rsrq}
                  type='text'
                  className='form-control'
                  id='rsrq'
                  placeholder='RSRQ'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      rsrq: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='snr'>SNR</label>
                <input
                  value={inputOperator1.snr}
                  type='text'
                  className='form-control'
                  id='snr'
                  placeholder='SNR'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      snr: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='cqi'>CQI</label>
                <input
                  value={inputOperator1.cqi}
                  type='text'
                  className='form-control'
                  id='cqi'
                  placeholder='CQI'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      cqi: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rssi'>RSSI</label>
                <input
                  value={inputOperator1.rssi}
                  type='text'
                  className='form-control'
                  id='rssi'
                  placeholder='RSSI'
                  onChange={(e) => {
                    setInputOperator1({
                      ...inputOperator1,
                      rssi: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </form>
          </Col>
        </Row>
        <div
          className={`d-flex flex-row mx-auto justify-content-end my-3 ${style.modalButtonWrapper}`}
        >
          <button className={`${style.yesButton}`}>Simpan</button>
        </div>
      </CardBody>
    );
  };

  const Section2 = ({ data }) => {
    // console.log("data dari dalam section 2 cardtabs :", data)
    return (
      <CardBody>
        <CardTitle className={`mb-5 mt-2 text26`} >
          Operator Sim 2
        </CardTitle>
        <Row>
          <Col sm='12'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className='form-group'>
                <label htmlFor='operator'>Operator Sim 2</label>
                <select
                  className='form-control'
                  id='operator'
                  value={inputOperator2.operator}
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      operator: e.target.value,
                    });
                  }}
                >
                  <option value='pilih'>Pilih Operator</option>
                  <option value='aaa'>aaa</option>
                  <option value='bbb'>bbb</option>
                  <option value='ccc'>ccc</option>
                  <option value='ddd'>ddd</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='mcc'>MCC</label>
                <input
                  value={inputOperator2.mcc}
                  type='text'
                  className='form-control'
                  id='mcc'
                  placeholder='MCC'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      mcc: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='mnc'>MNC</label>
                <input
                  value={inputOperator2.mnc}
                  type='text'
                  className='form-control'
                  id='mnc'
                  placeholder='MNC'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      mnc: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='tac'>TAC</label>
                <input
                  value={inputOperator2.tac}
                  type='text'
                  className='form-control'
                  id='tac'
                  placeholder='TAC'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      tac: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='type'>Type</label>
                <input
                  value={inputOperator2.type}
                  type='text'
                  className='form-control'
                  id='type'
                  placeholder='Type'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      type: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='enb'>eNB</label>
                <input
                  value={inputOperator2.enb}
                  type='text'
                  className='form-control'
                  id='enb'
                  placeholder='eNB'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      enb: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='cid'>CID</label>
                <input
                  value={inputOperator2.cid}
                  type='text'
                  className='form-control'
                  id='cid'
                  placeholder='CID'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      cid: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='pci'>PCI</label>
                <input
                  value={inputOperator2.pci}
                  type='text'
                  className='form-control'
                  id='pci'
                  placeholder='PCI'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      pci: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='f'>F</label>
                <input
                  value={inputOperator2.f}
                  type='text'
                  className='form-control'
                  id='f'
                  placeholder='F'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      f: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='b'>B</label>
                <input
                  value={inputOperator2.b}
                  type='text'
                  className='form-control'
                  id='b'
                  placeholder='B'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      b: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ta'>TA</label>
                <input
                  value={inputOperator2.ta}
                  type='text'
                  className='form-control'
                  id='ta'
                  placeholder='TA'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      ta: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rsrp'>RSRP</label>
                <input
                  value={inputOperator2.rsrp}
                  type='text'
                  className='form-control'
                  id='rsrp'
                  placeholder='RSRP'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      rsrp: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rsrq'>RSRQ</label>
                <input
                  value={inputOperator2.rsrq}
                  type='text'
                  className='form-control'
                  id='rsrq'
                  placeholder='RSRQ'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      rsrq: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='snr'>SNR</label>
                <input
                  value={inputOperator2.snr}
                  type='text'
                  className='form-control'
                  id='snr'
                  placeholder='SNR'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      snr: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='cqi'>CQI</label>
                <input
                  value={inputOperator2.cqi}
                  type='text'
                  className='form-control'
                  id='cqi'
                  placeholder='CQI'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      cqi: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='rssi'>RSSI</label>
                <input
                  value={inputOperator2.rssi}
                  type='text'
                  className='form-control'
                  id='rssi'
                  placeholder='RSSI'
                  onChange={(e) => {
                    setInputOperator2({
                      ...inputOperator2,
                      rssi: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </form>
          </Col>
        </Row>
        <div
          className={`d-flex flex-row mx-auto justify-content-end my-3 ${style.modalButtonWrapper}`}
        >
          <button className={`${style.yesButton}`}>Simpan</button>
        </div>
      </CardBody>
    );
  };

  const Section3 = ({ data }) => {
    // console.log("data dari dalam section 2 cardtabs :", data)
    return (
      <CardBody>
        <CardTitle className={`mb-5 mt-2 text26`} >
          Informasi
        </CardTitle>
        <Row>
          <Col sm='12'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className='form-group'>
                <label htmlFor='longitude'>Longitude</label>
                <input
                  value={inputInformasi.longitude}
                  type='text'
                  className='form-control'
                  id='longitude'
                  placeholder='Longitude'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      longitude: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='latitude'>Latitude</label>
                <input
                  value={inputInformasi.latitude}
                  type='text'
                  className='form-control'
                  id='latitude'
                  placeholder='Latitude'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      latitude: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='speed'>Speed</label>
                <input
                  value={inputInformasi.speed}
                  type='text'
                  className='form-control'
                  id='speed'
                  placeholder='Speed'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      speed: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='hdg'>Hdg</label>
                <input
                  value={inputInformasi.hdg}
                  type='text'
                  className='form-control'
                  id='hdg'
                  placeholder='Hdg'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      hdg: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='gpsacc'>GPS Acc</label>
                <input
                  value={inputInformasi.gpsacc}
                  type='text'
                  className='form-control'
                  id='gpsacc'
                  placeholder='GPS Acc'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      gpsacc: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='height'>Height</label>
                <input
                  value={inputInformasi.height}
                  type='text'
                  className='form-control'
                  id='height'
                  placeholder='Height'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      height: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='altitude'>Altitude</label>
                <input
                  value={inputInformasi.altitude}
                  type='text'
                  className='form-control'
                  id='altitude'
                  placeholder='Altitude'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      altitude: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ground'>Ground</label>
                <input
                  value={inputInformasi.ground}
                  type='text'
                  className='form-control'
                  id='ground'
                  placeholder='Ground'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      ground: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='ul'>UL</label>
                <input
                  value={inputInformasi.ul}
                  type='text'
                  className='form-control'
                  id='ul'
                  placeholder='UL'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      ul: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='dl'>DL</label>
                <input
                  value={inputInformasi.dl}
                  type='text'
                  className='form-control'
                  id='dl'
                  placeholder='DL'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      dl: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='data'>Data</label>
                <input
                  value={inputInformasi.data}
                  type='text'
                  className='form-control'
                  id='data'
                  placeholder='Data'
                  onChange={(e) => {
                    setInputInformasi({
                      ...inputInformasi,
                      data: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              {/* ============ upload lampiran ============ */}
              <Label for='basicpill-firstname-input14'>Lampiran</Label>
              <Label
                style={{
                  color: "red",
                  marginLeft: "15px",
                  fontSize: "11px",
                }}
              >
                {errorDocFormat === "" ? "" : errorDocFormat}
              </Label>
              <input
                type='file'
                className='form-control'
                name={"doc"}
                onChange={(e) => handleChange(e)}
                className='form-control'
                style={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  height: "43px",
                }}
                accept='application/pdf'
              />
              {/* ============ upload KML ============ */}
              <Label for='basicpill-firstname-input14'>KML File</Label>
              <Label
                style={{
                  color: "red",
                  marginLeft: "15px",
                  fontSize: "11px",
                }}
              >
                {errorDocFormat === "" ? "" : errorDocFormat}
              </Label>
              <input
                type='file'
                className='form-control'
                name={"doc"}
                onChange={(e) => handleChange(e)}
                className='form-control'
                style={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  height: "43px",
                }}
                accept='application/pdf'
              />
            </form>
          </Col>
        </Row>
        <div
          className={`d-flex flex-row mx-auto justify-content-end my-3 ${style.modalButtonWrapper}`}
        >
          <button className={`${style.yesButton}`}>Simpan</button>
        </div>
      </CardBody>
    );
  };

  // tab navigation buttons
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
                  <span className={`font-weight-bold`}>Operator Sim 1</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    setactiveTab("2");
                  }}
                >
                  <span className='font-weight-bold mb-4'>Operator Sim 2</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    setactiveTab("3");
                  }}
                >
                  <span className='font-weight-bold mb-4'>Informasi</span>
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
    <span>
      <Tabs data={data} />
    </span>
  );
}

export default CardForm;

// batal button
{
  /* <button
className={`${style.buttonKembali}`}
onClick={() => {
  history.push("/admin/gnettrack");
}}
>
Batal
</button> */
}
