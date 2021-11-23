import React, { Component, useState } from "react";
import RootContext from "./index";

const LokasiProvider = (props) => {
  const [notif, setNotif] = useState(false);
  const [alert, setAlert] = useState(false);
  const [timer, setTimer] = useState(null);
  const [reload, setReload] = useState(false);
  let [message, setMessageVerifikasi] = useState("");

  const [isOpen, setisOpen] = useState(false);

  const dispatch = (action) => {
    switch (action.type) {
      case "CHANGE_NOTIF":
        setNotif(action.value);
        break;
      case "CHANGE_ALERT":
        setAlert(action.value);
        break;

      case "CHANGE_RELOAD":
        setReload(!reload);
        break;
      case "CHANGE_MESSAGE":
        setMessageVerifikasi(action.value);
        break;
      case "CHANGE_ISOPEN":
        setisOpen(!isOpen);
        break;
    }
  };
  return (
    <RootContext.Provider
      value={{
        notif: notif,
        alert: alert,
        timer: timer,
        reload: reload,
        message: message,
        dispatch: dispatch,
      }}>
      {props.children}
    </RootContext.Provider>
  );
};

export default LokasiProvider;
