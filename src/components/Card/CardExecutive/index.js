import React, { useState } from "react";
import { Card, CardBody, Spinner, Button } from "reactstrap";
import styles from "./styles.module.css";
import { Spin } from 'antd';


const Loading = () => (
  <Button
    className="mt-2 mb-3"
    color="light"
    disabled
    size="sm"
    type="button"
  >
    <Spinner className={'mr-2'} type="grow" size="sm" role="status"></Spinner>
    Loading...
  </Button>
)
const CardDashboard = ({ title, jumlah, jenis }) => {
  
  //jenis 
  return (
    <>
      <div className={'d-none d-lg-block'}>
        <Card className={`${styles.total_card} m-4`}>
          <CardBody className={'d-flex flex-column justify-content-center align-items-center'}>
              <h6 className="text-center">{title}</h6>
              {!jumlah && <Loading />}
              {jumlah && <span className={styles.jumlah}>{jumlah}</span> }
          </CardBody>
        </Card >
      </div>

      <div className={'d-none d-md-block d-lg-none'}>
        <Card className={`${styles.total_card} m-2`}>
          <CardBody className={'d-flex flex-column justify-content-center align-items-center'}>
              <h6 className="text-center">{title}</h6>
              {!jumlah && <Loading />}
              {jumlah && <span className={styles.jumlah}>{jumlah}</span> }
          </CardBody>
        </Card >
      </div>

      <div className={'d-block d-md-none'}>
        <Card className={`${styles.total_card} m-2`}>
          <CardBody className={'d-flex flex-column justify-content-center align-items-center'}>
              <h6 className="text-center">{title}</h6>
              {!jumlah && <Loading />}
              {jumlah && <span className={styles.jumlah}>{jumlah}</span> }
          </CardBody>
        </Card >
      </div>
    </>
  );
};

export default CardDashboard;
