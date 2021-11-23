import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import { connect } from "react-redux";
import NotifList from "./NotifList";
//API

// import dummy from "../Data/notifDummy.json"

const NotifRead = (props) => {
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState([]);
  let [dataClicked, setDataClicked] = useState([]);
  let [dataNotClicked, setDataNotClicked] = useState([]);
  let oldNotifGet = localStorage.getItem("oldNotif");
  let iduser = localStorage.getItem("userId");

  const getNotif = () => {
    setData(props.data);
    setDataClicked(props.dataClicked);
    setDataNotClicked(props.dataNotClicked);
  };
  useEffect(() => {
    getNotif();
    return () => {};
  }, [props.dataClicked, props.dataNotClicked, props.data]);

  const handleNotif = () => {
    if (props.data.length !== 0) {
      localStorage.setItem("oldNotif", props.data[0].id + "," + iduser);
    }
  };

  const NotifUnclickedLength = (props) => {
    let { dataNotClicked } = props;
    if (typeof data !== "undefined") {
      if (data.length !== 0) {
        if (oldNotifGet !== null) {
          if (dataNotClicked !== 0) {
            return <span className="badge badge-danger badge-pill">{dataNotClicked ? dataNotClicked : 0}</span>;
          } else {
            return <div />;
          }
        } else {
          //condition if no new notif and dataNotClicked more than 1
          if (dataNotClicked !== 0) {
            return <span className="badge badge-danger badge-pill">{dataNotClicked ? dataNotClicked : 0}</span>;
          } else {
            return <div />;
          }
        }
      } else {
        if (dataNotClicked !== 0) {
          return <span className="badge badge-danger badge-pill">{dataNotClicked ? dataNotClicked : 0}</span>;
        } else {
          return <div />;
        }
      }
    }
  };

  return (
    <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="dropdown d-inline-block" tag="li">
      <DropdownToggle
        className="btn header-item noti-icon waves-effect"
        tag="button"
        id="page-header-notifications-dropdown"
        onClick={() => {
          handleNotif();
        }}
      >
        {data !== undefined && data.length === 0 ? <i className="bx bx-bell bx-tada"></i> : <i className="bx bx-bell"></i>}
        {dataNotClicked.length !== 0 && <NotifUnclickedLength dataNotClicked={dataNotClicked.length !== 0 ? dataNotClicked.length : 0} />}
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 " right>
        <div className="p-3">
          <Row className="align-items-center">
            <Col>
              <h6 className="m-0"> Notification </h6>
            </Col>
          </Row>
        </div>

        <SimpleBar style={{ height: "230px" }}>
          <NotifList data={data} dataClicked={dataClicked} dataNotClicked={dataNotClicked} setDataClicked={setDataClicked} setDataNotClicked={setDataNotClicked} />
        </SimpleBar>
      </DropdownMenu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(withRouter(NotifRead));
