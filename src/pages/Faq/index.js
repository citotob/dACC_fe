import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeBreadcrumbItem } from "../../store/breadcrumb/action";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Media,
} from "reactstrap";

//style
import styles from "./style.module.scss";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Tabs functions
import classnames from "classnames";

//DUMMY DATA
const pertanyaanUmum = () => {
  return (
    <div>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>What is Lorem Ipsum?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            New common language will be more simple and regular than the
            existing European languages. It will be as simple as occidental.
          </p>
        </Media>
      </Media>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Where does it come from?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            Everyone realizes why a new common language would be desirable one
            could refuse to pay expensive translators.
          </p>
        </Media>
      </Media>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Where can I get some?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            If several languages coalesce, the grammar of the resulting language
            is more simple and regular than that of the individual languages.
          </p>
        </Media>
      </Media>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Why do we use it?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            Their separate existence is a myth. For science, music, sport, etc,
            Europe uses the same vocabulary.
          </p>
        </Media>
      </Media>
      <Media className='faq-box'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Where can I get some?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            To an English person, it will seem like simplified English, as a
            skeptical Cambridge friend of mine told me what Occidental
          </p>
        </Media>
      </Media>
    </div>
  );
};

const support = () => {
  return (
    <div>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>What is Support Ipsum?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            New common language will be more simple and regular than the
            existing European languages. It will be as simple as occidental.
          </p>
        </Media>
      </Media>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Where can I get support?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            Everyone realizes why a new common language would be desirable one
            could refuse to pay expensive translators.
          </p>
        </Media>
      </Media>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Where can I get more?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            If several languages coalesce, the grammar of the resulting language
            is more simple and regular than that of the individual languages.
          </p>
        </Media>
      </Media>
      <Media className='faq-box mb-4'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Why do we use support?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            Their separate existence is a myth. For science, music, sport, etc,
            Europe uses the same vocabulary.
          </p>
        </Media>
      </Media>
      <Media className='faq-box'>
        <div className='faq-icon mr-3'>
          <i className='bx bx-help-circle font-size-20 text-success'></i>
        </div>
        <Media body>
          <h5 className='font-size-15'>Where can I get some?</h5>
          <p className={`${styles.faqAnswer} text-muted`}>
            To an English person, it will seem like simplified English, as a
            skeptical Cambridge friend of mine told me what Occidental
          </p>
        </Media>
      </Media>
    </div>
  );
};

function FAQ() {
  const dispatch = useDispatch();
  const location = useLocation();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  // Tabs functions (verifikasi, aktif, ditolak)
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [tabName, setTabName] = useState("Pertanyaan Umum");
  function toggleCustom(tab) {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  }

  useEffect(() => {
    dispatch(changeBreadcrumbItem(tabName));
  }, [tabName]);

  return (
    <div className={styles.pageFont}>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${styles.pageTitle} mr-4 `}>{PageTitle()}</span>
            </div>
          </div>
          <div>
            {/* //change breadcrumb item depending on which tab is open */}
            <Breadcrumbs title='FAQ' breadcrumbItem={tabName} />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <Card>
          <CardBody>
            <Nav tabs className='nav-tabs-custom'>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "1",
                  })}
                  onClick={() => {
                    toggleCustom("1");
                    setTabName("Pertanyaan Umum");
                  }}
                >
                  <span className='d-none d-sm-block'>Pertanyaan Umum</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: customActiveTab === "2",
                  })}
                  onClick={() => {
                    toggleCustom("2");
                    setTabName("Support");
                  }}
                >
                  <span className='d-none d-sm-block'>Support</span>
                </NavLink>
              </NavItem>
              <div className={`${styles.tableSearchWrapper} ml-auto`}>
                {/* INSERT SOMETHING HERE IF YOU WANT TO PUT ITEMS IN THE RIGHT SIDE OF THE TABLE TAB */}
              </div>
            </Nav>

            <TabContent activeTab={customActiveTab}>
              <TabPane tabId='1' className='p-3'>
                <Row>
                  <h1>{pertanyaanUmum()}</h1>
                </Row>
              </TabPane>
              <TabPane tabId='2' className='p-3'>
                <Row>
                  <h1>{support()}</h1>
                </Row>
              </TabPane>
              <TabPane tabId='3' className='p-3'>
                <Row>{/* <Col sm="12">{tableDitolak()}</Col> */}</Row>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default FAQ;
