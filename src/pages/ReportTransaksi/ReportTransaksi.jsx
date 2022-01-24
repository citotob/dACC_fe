import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Label, Modal, Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Import custom styling
import style from "./style.module.css";

// Import Components
import Table from "../../components/ReportTransaksi/TableBootstrap/TableBootstrap";

//import API
import API from "../../services";

function ReportTransaksi() {
  let roleName = window.localStorage.getItem("roleName");
  let userId = window.localStorage.getItem("userid");
  const location = useLocation();
  const history = useHistory();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  const [refresh, setrefresh] = useState(false);
  // modal states
  const [modalAddDataOpen, setmodalAddDataOpen] = useState(false);
  const [errorDocFormat, setErrorDocFormat] = useState();

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  useEffect(() => {
    // getInitData();
  }, []);

  //alert state
  const [alertAddDataStatus, setalertAddDataStatus] = useState(
    style.alertAddDataOff
  );

  function tog_AddData() {
    setmodalAddDataOpen(!modalAddDataOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function handleChange(e) {
    // switch (e.target.name) {
    //   case "doc":
    //     let fileExtension = e.target.files[0].name.split(".").pop();
    //     if (fileExtension !== "pdf") {
    //       setErrorDocFormat("Format Dokumen harus .pdf");
    //       setDocUpload("");
    //     } else {
    //       setErrorDocFormat("");
    //       setDocUpload(e.target.files[0]);
    //     }
    //     break;
    // }
  }

  return (
    <div>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div>
            <Breadcrumbs title='Data Report Transaksi' breadcrumbItem='Aktif' />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <div className='py-4'>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default ReportTransaksi;
