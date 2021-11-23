import React, { useState, useEffect } from "react";
import ContentLayoutLayered, {
  ContentLayoutInner,
} from "../../../components/Layout/ContentLayoutLayered";
import TablePermintaanSurveyor from "../../../components/Table/TablePermintaanSurveyor";
import TableIssue from "../../../components/Table/TableIssue/Surveyor";
import Style from "./styles.module.css";
import { Row } from "reactstrap";
import DataProvider from "../../../context/DataProvider.js";
import HasilSurveyProvider from "../../../context/HasilSurveyProvider";
import HasilSurveyDetailSurveyorAI from "../../HasilSurveyDetail/Surveyor/AI";
import HasilSurveyDetailSurveyorBTS from "../../HasilSurveyDetail/Surveyor/BTS";
import IssueSurveyDetailSurveyorAI from "../../IssueSurveyDetail/Surveyor/AI";
import IssueSurveyDetailSurveyorBTS from "../../IssueSurveyDetail/Surveyor/BTS";
import TableLogHasilSurveySurveyor from "../../../components/Table/TableLog/Surveyor/HasilSurvey";
import NewHasilSurveyBTS from "../../HasilSurveyDetail/Surveyor/BTS/NewHasilSurveyBTS";

const SubContentAi = ({ item, tab, setContent, data, setData, loading }) => {
  return (
    // <AiProvider>
    <Row>
      {
        {
          "Hasil Survey": (
            <TablePermintaanSurveyor
              tab={tab}
              setContent={setContent}
              data={data}
              setData={setData}
              loading={loading}
            />
          ),
          Issue: <TableIssue
            tab={tab}
            setContent={setContent}
            setData={setData}
          />,
          Log: <TableLogHasilSurveySurveyor
            tab={tab}
          />,
        }[item]
      }
    </Row>
    // </AiProvider>
  );
};

const SubContentBts = ({ item, tab, setContent, data, setData, loading }) => {
  return (
    // <BtsProvider>
    <Row>
      {
        {
          "Hasil Survey": (
            <TablePermintaanSurveyor
              tab={tab}
              setContent={setContent}
              data={data}
              setData={setData}
              loading={loading}
            />
          ),
          Issue: <TableIssue
            tab={tab}
            setContent={setContent}
            setData={setData}
          />,
          Log: <TableLogHasilSurveySurveyor
            tab={tab}
          />,
        }[item]
      }
    </Row>
    // </BtsProvider>
  );
};

const TabMenu = ({ setMenu, activeMenu }) => {
  const listTabHasilSurvey = ["Hasil Survey", "Issue", "Log"];
  return (
    <>
      <div className={"d-none d-md-block"}>
        <Row className={"mt-4 w-100"}>
          {listTabHasilSurvey.map((list, index) => (
            <div
              className={activeMenu === list ? Style.selected : Style.selection}
              key={index}
              onClick={setMenu}
              value={list}>
              {list}
            </div>
          ))}
        </Row>
      </div>

      <Row className={"mt-2 d-block d-md-none"}>
        <div className={"d-flex w-100 justify-content-center"}>
          {listTabHasilSurvey.map((list, index) => (
            <div
              className={activeMenu === list ? Style.selected : Style.selection}
              key={index}
              onClick={setMenu}
              value={list}>
              {list}
            </div>
          ))}
        </div>
      </Row>
    </>
  );
};

const Topmenu = ({ activeTab, toggleTab }) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        onClick={() => toggleTab("AI")}
        style={{
          padding: "0.3rem",
          color: `${activeTab === "AI" ? "#2C3780" : "grey"}`,
          backgroundColor: `${activeTab === "AI" ? "white" : "#2C3780"}`,
          borderRadius: "5px 5px 0px 0px",
          width: "10rem",
        }}>
        Akses Internet
      </div>
      <a href="/app/adminsurveyor/hasilsurvey/bts">
        <div
          style={{
            padding: "0.3rem",
            color: `${activeTab === "BTS" ? "#2C3780" : "grey"}`,
            backgroundColor: `${activeTab === "BTS" ? "white" : "#2C3780"}`,
            borderRadius: "5px 5px 0px 0px",
            width: "10rem",
          }}>
          BTS
        </div>
      </a>

    </div>
  );
};

const InnerMenu = ({ activeTab, setContent, data, menu, changeMenu, setData, loading }) => {

  if (activeTab === "AI") {
    return (
      <ContentLayoutInner
        tabmenu={
          <TabMenu setMenu={changeMenu}
            activeMenu={menu}
          />
        }
        content={
          <SubContentAi
            item={menu}
            tab={activeTab}
            setContent={setContent}
            data={data}
            setData={setData}
            loading={loading}
          />
        }
      />
    );
  } else {
    return (
      <ContentLayoutInner
        tabmenu={
          <TabMenu
            setMenu={changeMenu}
            activeMenu={menu}
          />
        }
        content={
          <SubContentBts
            item={menu}
            tab={activeTab}
            setContent={setContent}
            data={data}
            setData={setData}
            loading={loading}
          />
        }
      />
    );
  }
};

const HasilSurveySurveyor = () => {
  const contents = ["default", "hasil", "issue", "hasilbtsbaru"];
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

  const toggleTabReload = () => {
    fetchData();
    // if (activeTab === "AI") {
    //   setDataAI([]);
    // } else {
    //   setDataBTS([]);
    // }
  };

  const changeCurrentData = (val) => {
    setCurrentData(val);
  };

  const fetchData = async () => {
    let org = localStorage.getItem("org");
    let body = new FormData();
    body.append("surveyor", org);

    let request = await fetch(
      activeTab === "AI"
        ? `${process.env.REACT_APP_BE_URL}/survey/getsurveyorsubmitai/`
        : `${process.env.REACT_APP_BE_URL}/survey/getsurveyorsubmitbts/`,
      {
        method: "POST",
        body: body,
      }
    );
    let response = request.status === 200 && "json" in request ? await request.json() : [];
    // console.log(response.values)

    console.log(activeTab);

    if (activeTab === "AI") {
      setDataAI(response.values)
    }
    else {
      let request2 = await fetch(
        `${process.env.REACT_APP_BE_URL}/survey/getSurveyBTSNew/`,
        {
          method: "POST",
          body: body,
        }
      );
      let response2 = request2.status === 200 && "json" in request2 ? await request2.json() : [];
      if (response2.values.length > 0) {
        setDataBTS(response2.values.concat(response.values))
      } else {
        setDataBTS(response.values)
      }
    }
    setLoading(false);
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

  // console.log(dataBTS);

  return (
    <HasilSurveyProvider>
      <DataProvider>
        {
          content === contents[0] ? (
            <ContentLayoutLayered
              title="Hasil Survey"
              topmenu={
                <Topmenu
                  activeTab={activeTab}
                  toggleTab={toggleTab}
                />
              }
              content={
                <InnerMenu
                  activeTab={activeTab}
                  setContent={changeContent}
                  data={activeTab === "AI" ? dataAI : dataBTS}
                  menu={menu}
                  changeMenu={changeMenu}
                  setData={changeCurrentData}
                  loading={loading}
                />
              }
              // Show alert
              notification={notif}
              alert={alert}
              stringAlert={stringAlert}
            />
          ) : content === contents[1] ? (
            activeTab === "AI" ? (
              // render component , send active tab ai/bts , handle content for back button , and send data based on selected row
              <HasilSurveyDetailSurveyorAI
                tab={activeTab}
                setContent={changeContent}
                data={currentData}
                reload={toggleTabReload}
                handleAlert={handleAlert} // handle alert passing
              />
            ) : (
              <HasilSurveyDetailSurveyorBTS
                tab={activeTab}
                setContent={changeContent}
                data={currentData}
                reload={toggleTabReload}
                handleAlert={handleAlert} // handle alert passing
              />
            )
          ) : content === contents[3] ? (
            activeTab === "AI" ? (
              // render component , send active tab ai/bts , handle content for back button , and send data based on selected row
              <HasilSurveyDetailSurveyorAI
                tab={activeTab}
                setContent={changeContent}
                data={currentData}
                reload={toggleTabReload}
                handleAlert={handleAlert} // handle alert passing
              />
            ) : (
              <NewHasilSurveyBTS
                tab={activeTab}
                setContent={changeContent}
                data={currentData}
                reload={toggleTabReload}
                handleAlert={handleAlert} // handle alert passing
              />
            )
          ) : activeTab === "AI" ? (
            <IssueSurveyDetailSurveyorAI
              tab={activeTab}
              setContent={changeContent}
              data={currentData}
              reload={toggleTabReload}
            />
          ) : (
            // <IssueSurveyDetailSurveyorBTS
            //   tab={activeTab}
            //   setContent={changeContent}
            //   data={currentData}
            //   reload={toggleTabReload}
            // />
            <IssueSurveyDetailSurveyorAI
              tab={activeTab}
              setContent={changeContent}
              data={currentData}
              reload={toggleTabReload}
            />
          )
          // render component , send active tab ai/bts , handle content for back button
          // <IssueSurveyDetailAdmin tab={activeTab} setContent={changeContent} />
        }
      </DataProvider>
    </HasilSurveyProvider>
  );
};

export default HasilSurveySurveyor;
