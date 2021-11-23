import React from "react";

import { Row, Col, Card, CardBody } from "reactstrap";

// IMPORT STYLE
import style from "./style.module.scss";

import get from "lodash/get";

function CardDetail(props) {
  const data = props?.datatable;
  console.log("detail props di card detail", data);

  return (
    <div>
      <Card>
        <CardBody className={`${style.cardBody}`}>
          <div className={style.cardTitleWrapper}>
            <span className={style.cardTitle}>Detail</span>
          </div>
          <div className={style.detailSurvey}>
            <Row className='mt-4'>
              <Col lg={3} md={3} sm={3}>
                Provinsi
              </Col>
              <Col lg={9} md={9} sm={9}>
                : {get(data?.provinsi, "name", "-")}
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col lg={3} md={3} sm={3}>
                Kabupaten/Kota
              </Col>
              <Col lg={9} md={9} sm={9}>
                : {get(data?.kabupaten, "name", "-")}
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col lg={3} md={3} sm={3}>
                Kecamatan
              </Col>
              <Col lg={9} md={9} sm={9}>
                : {get(data?.kecamatan, "name", "-")}
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col lg={3} md={3} sm={3}>
                Desa
              </Col>
              <Col lg={9} md={9} sm={9}>
                : {get(data?.desa, "name", "-")}
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col lg={3} md={3} sm={3}>
                Longitude
              </Col>
              <Col lg={9} md={9} sm={9}>
                : {get(data, "longitude", "-")}
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col lg={3} md={3} sm={3}>
                Latitude
              </Col>
              <Col lg={9} md={9} sm={9}>
                : {get(data, "latitude", "-")}
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardDetail;
