import React, { useState } from "react";

import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//Import Style
import style from "./style.module.scss";

import Card1 from "./card1.js";
import CardMap from "../CardMap";
import get from "lodash/get";

import PopupImage from "../../PopupImage";
import { fotoBts } from "../../../assets/images/foto-BTS.png";

const Section1 = ({ data }) => {
  const moment = require("moment");
  // console.log("data dari section 1", data);
  return (
    <CardBody>
      <span className={style.section}>Section 1</span>
      <CardTitle className={`mb-5 mt-2 text26`}>
        Data Calon Pelanggan
      </CardTitle>
      <div className={`font-weight-bold`}>
        <Card1 label='PIC' value={data?.pic?.namaPic} />
        <Card1 label='Nomor Telepon PIC Desa' value={data?.pic?.phonePic} />
        <Card1
          label='Tanggal Pelaksanaan'
          value={moment(data?.tanggalPelaksanaan).format("DD/MM/YYYY")}
        />
        <Card1
          label='Akses Darat'
          value={
            data?.modaTransportasi?.darat === "[]"
              ? "-"
              : data?.modaTransportasi?.darat?.slice(1, -1)
          }
        />
        <Card1
          label='Akses Laut'
          value={
            data?.modaTransportasi?.laut === "[]"
              ? "-"
              : data?.modaTransportasi?.laut?.slice(1, -1)
          }
        />
        <Card1
          label='Akses Udara'
          value={
            data?.modaTransportasi?.udara === "[]"
              ? "-"
              : data?.modaTransportasi?.udara?.slice(1, -1)
          }
        />
        <Card1
          label='Durasi Perjalanan dari Kecamatan'
          value={`${get(data, "modaTransportasi.durasiPerjalanan", "-")} jam`}
        />
        <Card1
          label='Nama Kota Kecamatan'
          value={get(data, "modaTransportasi.namaKotaKecamatan", "-")}
        />
        <Card1
          label='Elevasi'
          value={data?.elevation ? `${data?.elevation} meter` : "-"}
        />
        <Card1 label='Tipe Bisnis' value={get(data, "tipeBisnis", "-")} />
        <Card1 label='Alamat' value={get(data, "alamatLokasi", "-")} />
        <Card1
          label='Sumber Listrik'
          value={get(data, "power.sumber_listrik", "-")}
        />
        <Card1
          label='ID Pelanggan PLN'
          value={get(data, "power.idPelangganPLN", "-")}
        />
        <Card1
          label='Kapasitas Listrik'
          value={get(data, "power.kapasitas_listrik", "-")}
        />
        <Card1
          label='Sumber Listrik Cadangan'
          value={get(data, "power.sumber_cadangan", "-")}
        />
        <Card1
          label='Jam Operasional Listrik'
          value={get(data, "power.jamOperasionalListrik", "-")}
        />
        <Card1
          label='Jam Operasional Lokal'
          value={get(data, "power.jamOperasionalLokal", "-")}
        />
        <Card1 label='Catatan' value={get(data, "note", "-")} />
      </div>
    </CardBody>
  );
};

const Section2 = ({ data }) => {
  // console.log("data dari dalam section 2 cardtabs :", data)
  return (
    <CardBody>
      <span className={style.section}>Section 2</span>
      <CardTitle className={`mb-5 mt-2 text26`}>
        Keterangan Perangkat IT di Lokasi
      </CardTitle>
      <div className={`font-weight-bold`}>
        <Card1
          label='Komputer'
          value={data?.device?.pc ? `${data?.device?.pc} buah` : "-"}
        />
        <Card1
          label='Tablet'
          value={data?.device?.tablet ? `${data?.device?.tablet} buah` : "-"}
        />
        <Card1
          label='Smartphone'
          value={
            data?.device?.smartPhone ? `${data?.device?.smartPhone} buah` : "-"
          }
        />
        <Card1
          label='Laptop'
          value={data?.device?.laptop ? `${data?.device?.laptop} buah` : "-"}
        />
      </div>
    </CardBody>
  );
};

const Fotolokasi = (props) => {
  const [image, setImage] = useState("");
  const [modalImage, setModalImage] = useState(false);
  let toggleImage = (img) => {
    setImage(img);
    setModalImage(!modalImage);
  };
  let source =
    "https://images.bisnis-cdn.com/posts/2021/04/12/1379743/menara-bts-hutchison-3-indonesia.jpeg";
  return (
    <div className='d-flex flex-column col-12 text-center'>
      <span>{props.title}</span>
      <span>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <Button color='' onClick={() => toggleImage(source)}>
          <img alt='' style={{ width: "354px" }} src={source}></img>
        </Button>
      </span>
    </div>
  );
};

const Section3 = ({ data }) => {
  let listFoto = data?.listFoto;
  let longitude = data?.longitude;
  let latitude = data?.latitude;
  // console.log("longlat dari section 3", latitude)
  return (
    <CardBody>
      <CardTitle className={`mb-2 mt-1`} style={{ fontSize: "26px" }}>
        Lampiran
      </CardTitle>
      <div style={{ fontWeight: "bold" }} className='d-flex flex-wrap'>
        <Fotolokasi
          title=''
          url='https://images.bisnis-cdn.com/posts/2021/04/12/1379743/menara-bts-hutchison-3-indonesia.jpeg'
          long={longitude}
          lat={latitude}
        />
      </div>
    </CardBody>
  );
};

const Section4 = ({ data }) => {
  let network = data?.network;
  // console.log("network di section 4", data);
  return (
    <CardBody>
      <span className={style.section}>Section 4</span>
      <CardTitle className={`mb-5 mt-2 text26`}>
        Network
      </CardTitle>
      <div className={`font-weight-bold`}>
        <Card1 label='Tipe' value={get(network, "tipe", "-")} />
        <Card1 label='Download' value={get(network, "download", "-")} />
        <Card1 label='Upload' value={get(network, "upload", "-")} />
      </div>
    </CardBody>
  );
};

const SectionMap = ({ data }) => {
  let network = data?.network;
  // console.log("network di section 4", data);
  return (
    <CardBody>
      <div className={`font-weight-bold`}>
        <CardMap />
      </div>
    </CardBody>
  );
};

const CardTabs = (props) => {
  const [activeTab, setactiveTab] = useState("3");
  // const [visibility, setVisibility] = useState(true);
  const data = props.datatable;
  const i = props.i;
  console.log("data dari dalam cardtabs :", data);

  const Tabs = ({ data, i }) => {
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
              {/* <NavItem>
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
              </NavItem> */}
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    setactiveTab("2");
                  }}
                >
                  <span className='font-weight-bold mb-4'>Informasi</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    setactiveTab("3");
                  }}
                >
                  <span className='font-weight-bold mb-4'>Lampiran</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "4" })}
                  onClick={() => {
                    setactiveTab("4");
                  }}
                >
                  <span className="font-weight-bold mb-4">Lampiran</span>
                </NavLink>
              </NavItem> */}
            </Nav>
          </Col>
          <Col xl='10' lg='8' md='8' sm='8'>
            <Card>
              <CardBody className={style.cardBody}>
                <TabContent activeTab={activeTab}>
                  {/* <TabPane tabId="1">
                    <Section1 data={data} />
                  </TabPane>
                  <TabPane tabId="2">
                    <Section2 data={data} />
                  </TabPane> */}
                  <TabPane tabId='3'>
                    <Section3 />
                    <SectionMap />
                  </TabPane>
                  {/* <TabPane tabId="4">
                    <Section4 data={data} />
                  </TabPane> */}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      // </Container>
    );
  };
  return <Tabs data={data} i={i} />;
};

export default CardTabs;
