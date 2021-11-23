import React from "react";
import MapModule from "./MapModule";

//IMPORT CUSTOM STYLING
import style from "../style.module.css";

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
  return (
    <div>
      {/* BOX PUTIH  */}
      <div className={`${style.cardMediumWrapper} px-4`}>
        <div className={`${style.cardMediumTitle}`}>
          <div
            className={`${style.cardMediumLabel} text-center`}
            style={{ fontColor: "#406D96" }}
          >
            <div className="pb-1">
              {namaLokasi !== ""
                ? namaLokasi.toUpperCase()
                : "Lokasi Tidak Tersedia"}
            </div>
            <div className="pb-3">
              {lat !== undefined ? lat : "-"} ||{" "}
              {long !== undefined ? long : "-"}{" "}
            </div>
          </div>
        </div>
        <MapModule lati={lat} long={long} lokasi={namaLokasi} />
      </div>
    </div>
  );
}

export default Index;
