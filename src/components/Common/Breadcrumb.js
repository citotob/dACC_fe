import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";

const Breadcrumb = (props) => {
  const breadcrumbItem = useSelector(
    (state) => state.BreadcrumbReducer.breadcrumbItem
  );

  return (
    <Row>
      <Col xs='12'>
        <div className='page-title-box d-flex align-items-center justify-content-end'>
          {/* <h4 className="mb-0 font-size-18">{props.title}</h4> */}
          <div className='page-title-right'>
            <ol className='breadcrumb m-0 text-capitalize'>
              <BreadcrumbItem>
                <Link to={props.titleLink}>{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to='#'>{breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
