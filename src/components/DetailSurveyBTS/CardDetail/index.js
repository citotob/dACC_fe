import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Row, Col, Card, CardBody } from 'reactstrap';

// IMPORT STYLE
import style from './style.module.scss';

import get from 'lodash/get';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';

function CardDetail(props) {
  const moment = require('moment');
  const data = props?.datatable;
  const btsData = props?.btsData;
  let tanggal = get(data?.data[0], 'tanggal_pembuatan', '-');

  const location = useLocation();
  const kodeSurvey = location.state.datatable.data[0]._id;
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('DETAIL SURVEY BTS', 105, 20, { align: 'center' });
    doc.setFontSize(10);

    // Kode Survey
    doc.text('Kode Survey', 30, 60);
    doc.text('Kode Survey LALALALALA', 40, 60);

    doc.text(`: ${get(data?.data[0], 'kodeHasilSurvey', '-')}`, 90, 60);
    // Provinsi
    doc.text('Provinsi', 30, 70);
    doc.text(`: ${get(data?.data[0], 'lokasi.provinsi.name', '-')}`, 90, 70);
    // Kabupaten
    doc.text('Kabupaten', 30, 80);
    doc.text(`: ${get(data?.data[0], 'lokasi.kabupaten.name', '-')}`, 90, 80);
    // Kecamatan
    doc.text('Kecamatan', 30, 90);
    doc.text(`: ${get(data?.data[0], 'lokasi.kecamatan.name', '-')}`, 90, 90);
    // Desa
    doc.text('Lokasi Survey', 30, 100);
    doc.text(`: ${get(data?.data[0], 'lokasi.desa.name', '-')}`, 90, 100);
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

    doc.save('Detail Survey BTS.pdf');
  };

  // console.log(`console log nya props`, props);

  const downloadPDF = () => {
    var element = document.getElementById('detail-survey');
    var opt = {
      margin: [0.25, 0.25],
      image: { type: 'jpeg', quality: 1 },
      filename: 'myfile.pdf',
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  const activeTab = props?.datatable?.kode.toUpperCase().includes('AI')
    ? 'Akses Internet'
    : 'BTS';

  return (
    <div>
      <Card>
        <CardBody className={`${style.cardBody}`} id="detail-survey">
          <div className={style.cardTitleWrapper}>
            <span className={style.cardTitle}>Detail Survey BTS</span>
          </div>
          <div className={style.detailSurvey}>
            <Row className="mt-4">
              <Col lg={2} md={2} sm={2}>
                Kode Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                {/* kalau pakai API getSurveyorSubmitBTS */}
                {/* : {data !== undefined ? data?.kode : ": -"}{" "} */}
                {/* kalau pakkai API getSurveyBTSNew */}:{' '}
                {get(data?.data[0], 'kodeHasilSurvey', '-')}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Jenis Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                :{' '}
                <button className={style.jenisSurveyButton} disabled>
                  {/* kalau pakai API getSurveyorSubmitBTS */}
                  {/* {data?.kode.includes("AI") ? "Akses Internet" : "BTS"} */}
                  {/* kalau pakkai API getSurveyBTSNew */}
                  {data?.kode.includes('AI') ? 'Akses Internet' : 'BTS'}
                </button>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Provinsi
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {get(data, 'lokasi.provinsi.name', '-')}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Nama Instansi Surveyor
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {get(data?.data[0], 'page1.disiapkanoleh', '-')}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Kabupaten/Kota
              </Col>
              <Col lg={4} md={4} sm={4}>
                : {get(data, 'lokasi.kabupaten.name', '-')}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Nama Pelaksana
              </Col>
              <Col lg={4} md={4} sm={4}>
                {/* kalau pakai API getSurveyorSubmitBTS */}
                {/* : {data !== undefined ? data?.data[0]?.user?.username : ": -"} */}
                {/* kalau pakkai API getSurveyBTSNew */} :{' '}
                {get(data?.data[0], 'page1.namasurveyor', '-')}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Kecamatan
              </Col>
              <Col lg={4} md={4} sm={4}>
                {/* kalau pakai API getSurveyorSubmitBTS */}
                {/* : {data !== undefined ? data?.lokasi?.kecamatan?.name : ": -"} */}
                {/* kalau pakkai API getSurveyBTSNew */} :{' '}
                {get(data, 'lokasi.kecamatan.name', '-')}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Tanggal Survey Masuk
              </Col>
              <Col lg={4} md={4} sm={4}>
                {/* kalau pakai API getSurveyorSubmitBTS */}
                {/* :{" "}
                {data !== undefined
                  ? moment(data?.data[0]?.status[0]?.tanggal_pembuatan).format(
                      "DD/MM/YYYY"
                    )
                  : ": -"} */}
                {/* kalau pakkai API getSurveyBTSNew */} :{' '}
                {moment(tanggal).format('DD/MM/YYYY')}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={2} md={2} sm={2}>
                Lokasi Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                {/* kalau pakai API getSurveyorSubmitBTS */}
                {/* : {data !== undefined ? data?.lokasi?.desa?.name : ": -"} */}
                {/* kalau pakkai API getSurveyBTSNew */} :{' '}
                {get(data, 'lokasi.desa.name', '-')}
              </Col>
              <Col lg={2} md={2} sm={2}>
                Status Survey
              </Col>
              <Col lg={4} md={4} sm={4}>
                {data !== undefined
                  ? ': ' + data?.data[0]?.status.slice(-1).pop().status
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
