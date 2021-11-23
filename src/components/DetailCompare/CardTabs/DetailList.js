import React from "react";

function DetailList(props) {
  return (
    <div className='d-flex flex-row mb-2 px-0'>
      {!props.sector ? (
        <>
          <span className='col-4 px-0'>{props.label}</span>
          <span className='col-8 px-0'>: {`${props.value}`}</span>
        </>
      ) : props.type === "list" ? (
        <>
          <span className='col-3 px-0'>{props.label}</span>
          <div className='col-9 px-0'>
            <div className='d-flex flex-column px-0'>
              <div className='d-flex flex-row px-0'>
                <span className='px-0 col-2'>Topography</span>
                <span className='col-10 mb-2'>
                  : {`${props.value.topografi}`}
                </span>
              </div>
              <div className='d-flex flex-row px-0'>
                <span className='px-0 col-2'>Landscape</span>
                <span className='col-10 mb-2'>
                  : {`${props.value.landscape}`}
                </span>
              </div>
              <div className='d-flex flex-row px-0'>
                <span className='px-0 col-2'>Demography</span>
                <span className='col-10 mb-2'>
                  : {`${props.value.demografi}`}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default DetailList;

// <Row>
//     <Col lg={3} style={style.items}>

//     </Col>
//     <Col lg={9} style={style.items}>
//       : Abdul Jabbar Aziz
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Nomor Telepon PIC Desa
//     </Col>
//     <Col lg={9} style={style.items}>
//       : 0821189294499 / 085281497762
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Tanggal Pelaksanaan
//     </Col>
//     <Col lg={9} style={style.items}>
//       : 06/08/2020
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Akses Darat
//     </Col>
//     <Col lg={9} style={style.items}>
//       : Sewa / Travel
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Akses Laut
//     </Col>
//     <Col lg={9} style={style.items}>
//       : Penyebrangan sungai / rakit
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Akses Udara
//     </Col>
//     <Col lg={9} style={style.items}>
//       : -
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Durasi Perjalanan dari Kecamatan
//     </Col>
//     <Col lg={9} style={style.items}>
//       : -
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Nama Kota Kecamatan
//     </Col>
//     <Col lg={9} style={style.items}>
//       : Lamonae-Wiwirano, Konawe Utara
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Elevation
//     </Col>
//     <Col lg={9} style={style.items}>
//       : 334 m
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Tipe Bisnis
//     </Col>
//     <Col lg={9} style={style.items}>
//       : Government
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Alamat
//     </Col>
//     <Col lg={9} style={style.items}>
//       : Desa Puuwiwirano Kecamatan ROUTA Kabupaten Konawe Provinsi Sulawesi
//       Tenggara
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Sumber Listrik
//     </Col>
//     <Col lg={9} style={style.items}>
//       : solar cell
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       ID Pelanggan PLN
//     </Col>
//     <Col lg={9} style={style.items}>
//       : -
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Kapasitas Listrik
//     </Col>
//     <Col lg={9} style={style.items}>
//       : -
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Sumber Listrik Cadangan
//     </Col>
//     <Col lg={9} style={style.items}>
//       : Tidak Ada
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Jam Operasional Listrik
//     </Col>
//     <Col lg={9} style={style.items}>
//       : 18:00 - 06: 00
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Jam Operasional Lokal
//     </Col>
//     <Col lg={9} style={style.items}>
//       : Desa Puuwiwirano Kecamatan ROUTA Kabupaten KOnawe Provinsi Sulawesi
//       Tenggara
//     </Col>
//   </Row>
//   <Row>
//     <Col lg={3} style={style.items}>
//       Catatan
//     </Col>
//     <Col lg={9} style={style.items}>
//       :
//     </Col>
//   </Row>

// PIC
