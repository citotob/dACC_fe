import React from 'react';
import { Container, Card, CardBody, Alert } from 'reactstrap';
import styles from './ContentLayoutStyle.module.css';
import Header from '../../Header/Header';

const ContentLayout = ({ title, tabmenu, content, notification, alert, stringAlert }) => {
  return (
    <>
      <Container className={'d-none d-md-block'}>
        <Header title={title} />

        {/* Alert */}
        <div style={{ paddingBottom: "25px" }}>
          <Alert
            color={alert ? "success" : "danger"}
            isOpen={notification}
            style={{
              borderRadius: "20px",
              textAlign: "center",
              padding: "5px",
              margin: "0px",
            }}>
            {`${stringAlert} ${alert ? "Berhasil" : "Gagal"}`}
          </Alert>
        </div>

        <Card className={"border-0"}>
          <CardBody>
            <Container>
              {tabmenu}
            </Container>
            <Container className={styles.wrapperInnerContent}>
              {content}
            </Container>
          </CardBody>
        </Card>
      </Container>

      <Container className={'d-block d-md-none'}>
        <Header title={title} />

        {/* Alert */}
        <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
          <Alert
            color={alert ? "success" : "danger"}
            isOpen={notification}
            style={{
              borderRadius: "20px",
              textAlign: "center",
              padding: "5px",
              margin: "0px",
            }}>
            {`${stringAlert} ${alert ? "Berhasil" : "Gagal"}`}
          </Alert>
        </div>

        <Card className={"border-0"}>
          <CardBody>
            {tabmenu}
            {content}
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default ContentLayout