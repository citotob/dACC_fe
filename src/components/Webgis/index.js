import React from "react";
import { Card, CardBody } from 'reactstrap';
import styles from "./styles.module.css"
// import "../../assets/css/bootstrap.css"

import Map from "./map.js";


const GlobalWebgis = (props) => {

  return (
    <Card className={styles.total_card}>
      <CardBody>
        <Map />
      </CardBody>
    </Card>
  )
}

export default GlobalWebgis