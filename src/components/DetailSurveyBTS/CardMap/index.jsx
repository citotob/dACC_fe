import React from "react";
import MapModule from "./MapModule";

//IMPORT CUSTOM STYLING
import style from "../style.module.css";

function Index({ lat, long, namaLokasi }) {
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
              {namaLokasi !== undefined
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
