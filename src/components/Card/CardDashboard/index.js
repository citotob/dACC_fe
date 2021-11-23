import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import styles from "./styles.module.css";

const CardDashboard = ({ title, jumlah, jenis }) => {
  //jenis 
  return (
    <Card className={jenis == "ai" ? styles.total_cardAI : styles.total_cardBTS }>
        <CardBody className={styles.text}>
          <div className={styles.wrapper_title}>
            <h3 className={styles.title}>{title}</h3>
          </div>
          <div className={styles.wrapper_jumlah}>
            <p className={styles.jumlah}>{jumlah}</p>
          </div>
      </CardBody>
    </Card >
  );
};

export default CardDashboard;
