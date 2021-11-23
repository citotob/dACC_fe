import { render } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import DataProvider from "../../../context/DataProvider.js";
import HasilSurveyProvider from "../../../context/HasilSurveyProvider";
import ContentLayoutLayered, {
    ContentLayoutInner,
} from "../../../components/Layout/ContentLayoutLayered";
import { Row } from "reactstrap";
import Style from "./styles.module.css";
import TablePermintaanSurveyor from "../../../components/Table/TablePermintaanSurveyor";
import TableIssue from "../../../components/Table/TableIssue/Surveyor";
import TableLogHasilSurveySurveyor from "../../../components/Table/TableLog/Surveyor/HasilSurvey";
import NewHasilSurveyBTS from "../../HasilSurveyDetail/Surveyor/BTS/NewHasilSurveyBTS";



const BTSTabelHasilSurvey = (props) => {
    const [notif, setNotif] = useState(false);
    const [stringAlert, setStringAlert] = useState("");
    const [activeTab, setActiveTab] = useState("BTS");
    const [menu, setMenu] = useState("Hasil Survey");
    const changeMenu = (e) => setMenu(e.target.getAttribute("value"));
    const [content, setContent] = useState("default");
    const [dataBTS, setDataBTS] = useState([]);
    const [currentData, setCurrentData] = useState({});

    const toggleTab = (tab) => {
        if (tab === "AI") {
            window.location.href = "/app/adminsurveyor/hasilsurvey";
        }
    };

    const fetchData = async () => {
        let org = localStorage.getItem("org");
        let body = new FormData();
        body.append("surveyor", org);

        let request = await fetch(
            `${process.env.REACT_APP_BE_URL}/survey/getsurveyorsubmitbts/`,
            {
                method: "POST",
                body: body,
            }
        );
        let response = request.status === 200 && "json" in request ? await request.json() : [];
        // console.log(response.values)

        console.log(activeTab);

        let request2 = await fetch(
            `${process.env.REACT_APP_BE_URL}/survey/getSurveyBTSNew/`,
            {
                method: "POST",
                body: body,
            }
        );
        let response2 = request2.status === 200 && "json" in request2 ? await request2.json() : [];
        if (response2.values.length > 0) {
            if (response.values.length > 0) {
                setDataBTS(response2.values.concat(response.values))
            } else {
                setDataBTS(response2.values)
            }
        } else {
            setDataBTS(response.values)
        }
    };

    useEffect(() => {
        fetchData();
        return () => {
            //
            //
        };
    }, [dataBTS.length]);

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
                <a href="/app/adminsurveyor/hasilsurvey">
                    <div
                        style={{
                            padding: "0.3rem",
                            color: `${activeTab === "AI" ? "#2C3780" : "grey"}`,
                            backgroundColor: `${activeTab === "AI" ? "white" : "#2C3780"}`,
                            borderRadius: "5px 5px 0px 0px",
                            width: "10rem",
                        }}>
                        Akses Internet
                    </div>
                </a>
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

    const SubContentBts = ({ item, tab, setContent, data, setData, loading }) => {
        return (
            // <BtsProvider>
            <Row>
                {
                    {
                        "Hasil Survey": (
                            <TablePermintaanSurveyor
                                tab={"BTS"}
                                setContent={setContent}
                                data={data}
                                setData={setData}
                                loading={loading}
                            />
                        ),
                        Issue: <TableIssue
                            tab={"BTS"}
                            setContent={setContent}
                            setData={setData}
                        />,
                        Log: <TableLogHasilSurveySurveyor
                            tab={"BTS"}
                        />,
                    }[item]
                }
            </Row>
            // </BtsProvider>
        );
    };

    return (
        <HasilSurveyProvider>
            <DataProvider>
                <ContentLayoutLayered
                    title="Hasil Survey"
                    topmenu={
                        <Topmenu
                            activeTab={activeTab}
                            toggleTab={toggleTab}
                        />
                    }
                    content={
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
                                    data={dataBTS}
                                    setData={(val) => {
                                        setCurrentData(val);
                                    }}
                                    loading={<div>Loading</div>}
                                />
                            }
                        />
                    }
                    // Show alert
                    notification={notif}
                    alert={alert}
                    stringAlert={stringAlert}
                />
            </DataProvider>
        </HasilSurveyProvider>
    );
}

export default BTSTabelHasilSurvey;