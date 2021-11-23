import React, { useState } from "react";
import { Card, CardBody, Alert } from "reactstrap";
import styles from "./styles.module.css";

const AlertGagalLokasi = ({ message }) => {
  //jenis
  return <div className={styles.message}>{message ? message : "-"}</div>;
};

export default AlertGagalLokasi;
