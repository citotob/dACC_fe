import React from 'react';

import { Row, Col, Card, CardBody } from 'reactstrap';

// IMPORT STYLE
import style from './style.module.scss';

import get from 'lodash/get';
import { jsPDF } from 'jspdf';

function CardDetail(props) {
  const moment = require('moment');
  const data = props?.datatable;
  console.log('data table dalam cardDetail issue dari api :', data);
  let tanggal = get(data?.data[0], 'tanggal_pembuatan', '-');

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('DETAIL SURVEY AI', 105, 30, { align: 'center' });
    doc.setFontSize(12);

    // Kode Survey
    doc.text('Kode Survey', 30, 60);
    doc.text(`: ${get(data?.data[0], 'kodeHasilSurvey', '-')}`, 90, 60);
    // Provinsi
    doc.text('Provinsi', 30, 70);
    doc.text(`: ${get(data, 'lokasi.provinsi.name', '-')}`, 90, 70);
    // Kabupaten
    doc.text('Kabupaten', 30, 80);
    doc.text(`: ${get(data, 'lokasi.kabupaten.name', '-')}`, 90, 80);
    // Kecamatan
    doc.text('Kecamatan', 30, 90);
    doc.text(`: ${get(data, 'lokasi.kecamatan.name', '-')}`, 90, 90);
    // Desa
    doc.text('Lokasi Survey', 30, 100);
    doc.text(`: ${get(data, 'lokasi.desa.name', '-')}`, 90, 100);
    // Jenis Survey
    doc.text('Jenis Survey', 30, 110);
    doc.text(
      `: ${data?.kode.includes('AI') ? 'Akses Internet' : 'BTS'}`,
      90,
      110
    );
    // Nama Instansi Surveyor
    doc.text('Nama Instansi Surveyor', 30, 120);
    doc.text(`: ${get(data?.data[0], 'user.organization.name', '-')}`, 90, 120);
    // Nama Pelaksana
    doc.text('Nama Pelaksana', 30, 130);
    doc.text(`: ${get(data?.data[0], 'user.name', '-')}`, 90, 130);
    // Tanggal Survey Masuk
    doc.text('Tanggal Survey Masuk', 30, 140);
    doc.text(`: ${moment(tanggal).format('DD/MM/YYYY')}`, 90, 140);
    // Status Survey
    doc.text('Status Survey', 30, 150);
    doc.text(
      `: ${
        data !== undefined
          ? ': ' + data?.data[0]?.status.slice(-1).pop().status
          : ': -'
      }`,
      90,
      150
    );

    doc.save('Detail Survey AI.pdf');
  };
  return (
    <div>
      <Card>
        <CardBody className={`${style.cardBody}`}>
          <div className={style.cardTitleWrapper}>
            <span className={style.cardTitle}>Detail Survey AI</span>
            <span>
              {/* <button
                className={style.unduhButton}
                onClick={() => handleDownloadPDF()}
              >
                Unduh PDF
              </button> */}
            </span>
          </div>
          <div className={style.detailSurvey}>
            <Row className="mt-4">
              <Col lg={2} md={2} sm={2}>
                Kode Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.kode : ': -'}{' '}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Jenis Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{' '}
                <button className={style.jenisSurveyButton} disabled>
                  {data?.kode.includes('AI') ? 'Akses Internet' : 'BTS'}
                </button>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Provinsi
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.lokasi?.provinsi?.name : ': -'}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Nama Instansi Surveyor
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{' '}
                {data !== undefined
                  ? data?.data[0]?.user.organization?.name
                  : ': -'}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Kabupaten/Kota
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.lokasi?.kabupaten?.name : ': -'}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Nama Pelaksana
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.data[0]?.user?.username : ': -'}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Kecamatan
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.lokasi?.kecamatan?.name : ': -'}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Tanggal Survey Masuk
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{' '}
                {data !== undefined
                  ? moment(data?.data[0]?.status[0]?.tanggal_pembuatan).format(
                      'DD/MM/YYYY'
                    )
                  : ': -'}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Lokasi Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {data !== undefined ? data?.lokasi?.desa?.name : ': -'}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Status Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{' '}
                {data !== undefined
                  ? data?.data[0]?.status.slice(-1).pop().status
                  : ': -'}
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardDetail;
