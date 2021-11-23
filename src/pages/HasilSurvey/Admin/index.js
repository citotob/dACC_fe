import React, { useState, useEffect } from "react";
import ContentLayoutLayered, {
  ContentLayoutInner,
} from "../../../components/Layout/ContentLayoutLayered";
import TablePermintaanSurvey from "../../../components/Table/TablePermintaanSurvey";
import TableIssue from "../../../components/Table/TableIssue/Admin";
import Style from "./styles.module.css";
import { Row } from "reactstrap";
import DataProvider from "../../../context/DataProvider";
import HasilSurveyProvider from "../../../context/HasilSurveyProvider";
import HasilSurveyDetailAdminAI from "../../HasilSurveyDetail/Admin/AI";
import HasilSurveyDetailAdminBTS from "../../HasilSurveyDetail/Admin/BTS";
import IssueSurveyDetailAdminAI from "../../IssueSurveyDetail/Admin/AI";
import IssueSurveyDetailAdminBTS from "../../IssueSurveyDetail/Admin/BTS";
import TableLogHasilSurveyAdmin from "../../../components/Table/TableLog/Admin/HasilSurvey/index.js";
import get from "lodash.get";

const SubContentAi = ({ item, tab, setContent, data, setData, loading }) => {
  return (
    <Row>
      {
        {
          "Hasil Survey": (
            <TablePermintaanSurvey
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
          Log: <TableLogHasilSurveyAdmin
            tab={tab}
          />,
        }[item]
      }
    </Row>
  );
};

const SubContentBts = ({ item, tab, setContent, data, setData, loading }) => {
  return (
    <Row>
      {
        {
          "Hasil Survey": (
            <TablePermintaanSurvey
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
          Log: <TableLogHasilSurveyAdmin
            tab={tab}
          />,
        }[item]
      }
    </Row>
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
      <div
        onClick={() => toggleTab("BTS")}
        style={{
          padding: "0.3rem",
          color: `${activeTab === "BTS" ? "#2C3780" : "grey"}`,
          backgroundColor: `${activeTab === "BTS" ? "white" : "#2C3780"}`,
          borderRadius: "5px 5px 0px 0px",
          width: "10rem",
        }}>
        BTS
      </div>
    </div>
  );
};

const InnerMenu = ({ activeTab, setContent, data, menu, changeMenu, setData, loading }) => {

  if (activeTab === "AI") {
    return (
      <ContentLayoutInner
        tabmenu={
          <TabMenu
            setMenu={changeMenu}
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

const HasilSurveyAdmin = () => {
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
    
    let response = await request.status === 200 && "json" in request ? await request.json() : await request.json();
    // new flow :
    if (activeTab === "AI") {
      setDataAI(get(response, "values", []))
    }
    else {
      // setDataBTS(response.values)
      let request2 = await fetch(
        `${process.env.REACT_APP_BE_URL}/survey/getSurveyBTSApproved/`,
        {
          method: "POST",
        }
      );
      let response2 = request2.status === 200 && "json" in request2 ? await request2.json() : [];
      if(response2.values.length > 0) {
        setDataBTS(response2.values.concat(response.values))
      } else {
        setDataBTS(response.values)
      }
    }
    setLoading(false);

    // TODO: handle request = []
    // activeTab === "AI" ? setDataAI(get(response, "values", [])) : setDataBTS(get(response, "values", []));
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
                />}
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
              <HasilSurveyDetailAdminAI
                tab={activeTab}
                setContent={changeContent}
                data={currentData}
                reload={toggleTabReload}
                handleAlert={handleAlert} // handle alert passing
              />
            ) : (
                <HasilSurveyDetailAdminBTS
                  tab={activeTab}
                  setContent={changeContent}
                  data={currentData}
                  reload={toggleTabReload}
                  handleAlert={handleAlert} // handle alert passing
                />
              )
          ) : activeTab === "AI" ? (
            <IssueSurveyDetailAdminAI
              tab={activeTab}
              setContent={changeContent}
              data={currentData}
              reload={toggleTabReload}
              handleAlert={handleAlert} // handle alert passing
            />
          ) : (
                  <IssueSurveyDetailAdminAI
                    tab={activeTab}
                    setContent={changeContent}
                    data={currentData}
                    reload={toggleTabReload}
                    handleAlert={handleAlert} // handle alert passing
                  />
                )
          // render component , send active tab ai/bts , handle content for back button
          // <IssueSurveyDetailAdmin tab={activeTab} setContent={changeContent} />
        }
      </DataProvider>
    </HasilSurveyProvider>
  );
};

export default HasilSurveyAdmin;
