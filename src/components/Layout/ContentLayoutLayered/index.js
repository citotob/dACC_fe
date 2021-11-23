import React from 'react';
import { Alert, Card, Container } from 'reactstrap';
import styles from './style.module.css';
import Header from '../../Header/Header';

const ContentLayoutLayered = ({ topmenu, content, title, notification, alert, stringAlert }) => {
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

        <div>
          <div className={styles.top_menu}>
            {topmenu}
          </div>
          <Card className={styles.card}>
            <Container className={styles.wrapperInnerMenu}>
              {content}
            </Container>
          </Card>
        </div>
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

        {topmenu}
        <Card className={styles.card}>
          {content}
        </Card>
      </Container>
    </>
  )
}


export const ContentLayoutInner = ({ tabmenu, content }) => {
  return (
    <>
      <Container className={'d-none d-md-block'}>
        <Card className={styles.card}>
          <Container className={styles.wrapperContent}>
            <Container>
              {tabmenu}
            </Container>
            <Container>
              {content}
            </Container>
          </Container>
        </Card>
      </Container>

      <Container className={'d-block d-md-none'}>
        {tabmenu}
        {content}
      </Container>
    </>
  )
}

export default ContentLayoutLayered