import React from "react";
import NotifSign from "../../components/ModuleNotif/NotifSign";

//STYLE
import style from "./style.module.css";

export default function ModuleNotif() {
  return (
    <div className={`container-fluid ${style.containerPageModuleNotif}`}>
      <div className="font-weight-bold">Notif</div>
      <NotifSign />
    </div>
  );
}
