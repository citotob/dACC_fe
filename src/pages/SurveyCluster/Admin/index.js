import React, { useState, useEffect } from "react";
import ContentLayoutSurveyCluster from "../../../components/Layout/ContentLayoutSurveyCluster";
// import Map from "../../../components/MapVectorSurveyCluster";
import Map from "../../../components/Webgis/map-clustering.js";
import get from "lodash.get";

const SurveyClusterAdmin = () => {
  const contents = ["default", "hasil", "issue"];
  const [menu, setMenu] = useState("Hasil Survey");
  const changeMenu = (e) => setMenu(e.target.getAttribute("value"));
  const [activeTab, setActiveTab] = useState("AI");
  const [content, setContent] = useState("default");
  const [dataAI, setDataAI] = useState([]);
  const [dataBTS, setDataBTS] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const handleClick = (e) => setMenu(e.target.getAttribute("value"));
  const changeContent = (val) => setContent(contents[val]);

  const [loading, setLoading] = useState(true);

  // alert
  const [notif, setNotif] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stringAlert, setStringAlert] = useState("");
  // timer
  const [timer, setTimer] = useState(null);

  const toggleTab = (tab) => {
    setDataAI([]);
    setDataBTS([]);
    setActiveTab(tab);
  };

  const changeCurrentData = (val) => {
    setCurrentData(val);
  };

  const fetchData = async () => {
    let body = new FormData();
    body.append("status", "Done");

    let request = await fetch(
      activeTab === "AI"
        ? `${process.env.REACT_APP_BE_URL}/survey/getsurveystatusai/`
        : `${process.env.REACT_APP_BE_URL}/survey/getsurveystatusbts/`,
      {
        method: "POST",
        body: body,
      }
    );
    let response = request.status === 200 && "json" in request ? await request.json() : await request.json();
    //
    setLoading(false);
    activeTab === "AI" ? setDataAI(get(response, "values", [])) : setDataBTS(get(response, "values", []));
  };

  useEffect(() => {
    fetchData();
    return () => {
      //
      //
    };
  }, [dataAI.length, dataBTS.length]);

  // handle alert to Content Layout Layered
  const handleAlert = (bool, string) => {
    clearTimeout(timer);

    setNotif(true);
    setAlert(bool);
    setStringAlert(string);

    setTimer(
      setTimeout(() => {
        setNotif(false);
      }, 10000)
    );
  }

  return (
    <>
      <ContentLayoutSurveyCluster
        title="Survey Clustering"
        content={
          <Map />
        }
        // detail={
        //   <Map />
        // }
        // Show alert
        notification={notif}
        alert={alert}
        stringAlert={stringAlert}
      />
    </>
  );
};

export default SurveyClusterAdmin;
