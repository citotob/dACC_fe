import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

// IMPORT STYLE
import style from "./style.module.scss";

function CardDetail(props) {
  const moment = require("moment");
  const data = props?.datatable;
  let activeTab = props?.activeTab.toUpperCase();

  return (
    <div>
      <Card>
        <CardBody className={`${style.cardBody}`}>
          <div className={style.cardTitleWrapper}>
            <span className={style.cardTitle}>Input Detail Survey</span>
          </div>
          <div className={style.detailSurvey}>
            <Row className='mt-4'>
              <Col lg={2} md={2} sm={2}>
                Kode Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.kode : " -"}{" "}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Jenis Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{" "}
                <button className={style.jenisSurveyButton} disabled>
                  {activeTab}
                </button>
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col lg={2} md={2} sm={2}>
                Provinsi
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{" "}
                {data !== undefined ? data?.lokasisurvey?.provinsi?.name : " -"}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Nama Instansi Surveyor
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.assignto?.name : " -"}
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col lg={2} md={2} sm={2}>
                Kabupaten/Kota
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{" "}
                {data !== undefined
                  ? data?.lokasisurvey?.kabupaten?.name
                  : " -"}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Nama Pelaksana
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.assignto1?.name : " -"}
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col lg={2} md={2} sm={2}>
                Kecamatan
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{" "}
                {data !== undefined
                  ? data?.lokasisurvey?.kecamatan?.name
                  : " -"}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Tanggal Survey Masuk
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{" "}
                {data !== undefined
                  ? moment(data?.tanggal_penugasan).format("DD/MM/YYYY")
                  : " -"}
              </Col>
            </Row>
            <Row className='mt-1'>
              <Col lg={2} md={2} sm={2}>
                Lokasi Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.lokasisurvey?.desa?.name : " -"}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Status Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{" "}
                {data !== undefined
                  ? data?.status.slice(-1).pop().status
                  : " -"}
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardDetail;
