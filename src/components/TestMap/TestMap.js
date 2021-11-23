import React from "react";

const TestMap = (props) => {
  let kode = props?.data?.kode_survei;
  console.log(`console log nya kode`, kode);
  return (
    <div>
      <iframe
        title='cesiummap'
        id='mapIframe'
        style={{ width: "100%", height: "600px" }}
        src={`https://cesium.naufalibnusalam.com/?kode="${kode}"`}
      />
    </div>
  );
};

export default TestMap;
