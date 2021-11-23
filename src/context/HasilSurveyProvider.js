import React, { Component, useState } from "react";
import RootContextAdmin from "./adminContext";

const HasilSurveyProvider = (props) => {
  let [notif, setNotifVerifikasi] = useState(false);
  let [alert, setAlertVerifikasi] = useState(false);
  let [timer, setTimerVerifikasi] = useState(null);
  let [message, setMessageVerifikasi] = useState("");

  let [isOpen, setisOpen] = useState(false);

  let dispatch = (action) => {
    switch (action.type) {
      case "CHANGE_NOTIF":
        setNotifVerifikasi(action.value);

        break;
      case "CHANGE_ALERT":
        setAlertVerifikasi(action.value);
        clearTimeout(timer);
        setTimeout(() => {
          setNotifVerifikasi(false);
        }, 3000);
        break;
      case "CHANGE_MESSAGE":
        console.log("change valueeee123", action.value);
        setMessageVerifikasi(action.value);
        break;
      default:
    }
  };
  return (
    <RootContextAdmin.Provider
      value={{
        notif: notif,
        alert: alert,
        message: message,
        dispatch: dispatch,
      }}>
      {props.children}
    </RootContextAdmin.Provider>
  );
};

export default HasilSurveyProvider;
