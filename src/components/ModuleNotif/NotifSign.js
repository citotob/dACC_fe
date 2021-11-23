import React, { useState, useEffect } from "react";

import NotifRead from "./NotifRead";
import _ from "lodash";
import DummyData from "./DummyData.json";

const NotifSign = (props) => {
  // let userId = window.localStorage.getItem("userId");
  // const role = window.localStorage.getItem("roleName");
  //Notification
  const [dataNotif, setDataNotif] = useState({
    clicked: [],
    notClicked: [],
    data: [],
  });

  // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  // const onNotif = (message) => {
  //   const notification = (message) => {
  //     new Notification("Teksas", {
  //       body: message,
  //       icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUcUCuXMald5MexzWYz8GwZAu-vqSr0JZOFw&usqp=CAU",
  //     });
  //   };
  //   if (!("Notification" in window)) {
  //     // console.log("This browser does not support desktop notification");
  //   } else if (Notification.permission === "granted") {
  //     notification(message);
  //   } else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then((requestPermission) => {
  //       if (requestPermission === "granted") {
  //         notification(message);
  //       }
  //     });
  //   }
  // };
  const getNotif = () => {
    // API.getNotification(userId)
    // 	.then((res) => {
    // let notifStatus = _.partition(res.data.values, { status: "new" });
    // setDataNotif((prev) => ({
    // 	...prev,
    // 	notClicked: notifStatus[0],
    // 	clicked: notifStatus[1],
    // }));
    // setDataNotif((prev) => ({ ...prev, data: res.data.values }));
    // setDataCount(res.data);
    // 	})
    // 	.catch((err) => {
    // 		setDataNotif([]);
    // 		setDataCount("");
    // 	});
    //dummy
    let notifStatus = _.partition(DummyData.values, { status: "new" });
    console.log("notifStatus", notifStatus);
    setDataNotif((prev) => ({
      ...prev,
      notClicked: notifStatus[0],
      clicked: notifStatus[1],
    }));
    setDataNotif((prev) => ({ ...prev, data: DummyData.values }));
  };
  useEffect(() => {
    getNotif();
  }, []);

  return (
    <React.Fragment>
      <div className="card">
        <div className="d-flex justify-content-end col-lg-12">
          {dataNotif && dataNotif.data && (
            <NotifRead
              data={dataNotif.data.length !== 0 ? dataNotif.data : []}
              dataClicked={
                dataNotif.clicked.length !== 0 ? dataNotif.clicked : []
              }
              dataNotClicked={
                dataNotif.notClicked.length !== 0 ? dataNotif.notClicked : []
              }
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotifSign;
