import React, { useEffect } from "react";
import MapModule from "./MapModule";
import axios from "axios";

//IMPORT CUSTOM STYLING
import style from "../style.module.css";
import get from "lodash/get";

var toGeoJSON = require("togeojson");

function Index({ lat, long, namaLokasi }) {
  // const [lokasi, setLokasi] = useState();
  // let lokasi = "";
  // if (namaLokasi?.desa) {
  //   lokasi = namaLokasi?.desa;
  // } else if (namaLokasi?.kecamatan) {
  //   lokasi = namaLokasi?.kecamatan;
  // } else if (namaLokasi?.kabupaten) {
  //   lokasi = namaLokasi?.kabupaten;
  // } else {
  //   lokasi = namaLokasi?.provinsi;
  // }
  // console.log(lat, long, lokasi);

  useEffect(() => {
    axios
      .get(`https://developers.google.com/kml/documentation/KML_Samples.kml`)
      .then((res) => {
        let testGeoJson = toGeoJSON.kml(res);
        if (res.data.success && res.status === 200) {
          console.log("Testing KML Success :  > ", testGeoJson);
        }
      })
      .catch((err) => {
        console.error("Testing KML FAIL :  > ", err.response);
      });
  }, []);

  return (
    <div>
      {/* BOX PUTIH  */}
      <div className={`${style.cardMediumWrapper} px-4`}>
        <div className={`${style.cardMediumTitle}`}>
          <div
            className={`${style.cardMediumLabel} text-center`}
            style={{ fontColor: "#406D96" }}
          >
            <div className='pb-1'>
              {get(namaLokasi, "namaLokasi", "Lokasi Tidak Tersedia")}
            </div>
            <div className='pb-3'>
              {get(namaLokasi, "data", "-6.200000")} ||{" "}
              {get(namaLokasi, "data", "106.816666")}{" "}
            </div>
          </div>
        </div>
        <MapModule lati='-6.200000' long='106.816666' lokasi={namaLokasi} />
      </div>
    </div>
  );
}

export default Index;
