import React from "react";

import { Alert, Modal, Input, Card, CardBody } from "reactstrap";

import { useHistory } from "react-router-dom";

// IMPORT STYLE
import style from "./style.module.scss";

// import icons
// import mapIcon from "../../../assets/icons/map-icon.svg";

//import API
import API from "../../../services";

function CardConfirm() {
  let role = window.localStorage.getItem("roleName");

  const history = useHistory();

  return (
    <div>
      <Card>
        <CardBody className={style.cardBody}>
          <div className='d-flex justify-content-center p-2'>
            <button
              onClick={() => history.push(`/admin/hasil-survey/`)}
              className={style.buttonKembali}
            >
              Kembali
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardConfirm;
