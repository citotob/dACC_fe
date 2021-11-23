import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

//Import Images
import error from "../../assets/images/error-img.png";

// Import custom styling
import style from "./style.module.css";

const Pages404 = (props) => {
  return (
    <React.Fragment>
      <div className='account-pages my-5 pt-5'>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='text-center mb-5'>
                <h1 className='display-2 font-weight-medium'>
                  4<i className='bx bx-buoy bx-spin text-primary display-3'></i>
                  4
                </h1>
                <h4 className='text-uppercase'>Sorry, page not found</h4>
              </div>
            </Col>
          </Row>
          <Row
            className={` justify-content-center ${style.errorImageContainer}`}
          >
            <Col md='12' xl='10' lg='10' s='12' xs='12'>
              <div className={`${style.errorImageWrapper}`}>
                <img
                  src={error}
                  alt=''
                  className={` col-12 ${style.errorImage}`}
                />
              </div>
              <div className='mt-5 text-center'>
                <Link
                  className={`btn btn-primary waves-effect waves-light mt-5 ${style.backToDashboardButton}`}
                  to='/admin/dashboard'
                >
                  Back to Dashboard
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Pages404;
