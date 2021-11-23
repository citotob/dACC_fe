import React from "react";
import { VectorMap } from "react-jvectormap";
import "./jquery-jvectormap.scss";

const map = React.createRef(null);

const Vectormap = (props) => {
  const handleRegionClick = (e, data) => {
    if (data === "my_sr" || data === "bn" || data === "my_sb" || data === "tl") return "";
    props.onclikRegion(data);
  };

  // when I call useState from the parent component on onRegionClick. pake ini biar ilang tooltipnya
  // link https://github.com/kadoshms/react-jvectormap/issues/2
  setTimeout(() => {
    Array.from(document.getElementsByClassName("jvectormap-tip")).forEach((el) => {
      el.style.display = "none";
    });
  }, 100);

  return (
    <div style={{ width: props.width, height: 300 }}>
      <VectorMap
        map={props.value}
        backgroundColor="transparent"
        ref={map}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        regionStyle={{
          initial: {
            fill: props.color,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
            "fill-opacity": props.idRegion !== "" ? 0.5 : 1,
          },
          // hover: {
          //   fill: "#C42127",
          //   cursor: "pointer",
          // },
          selected: {
            fill: props.AI ? "#C42127" : "#2c3280",
            "fill-opacity": 1, //what colour clicked country will be
          },
          // selectedHover: {},
        }}
        containerClassName="map"
        onRegionClick={(e, d) => handleRegionClick(e, d)}
        selectedRegions={props.idRegion}
        regionsSelectableOne={true}
      />
    </div>
  );
};

export default Vectormap;
