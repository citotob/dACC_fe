import React, { useState } from "react";
import FilterCalendar from "../../components/ModuleFilter/FilterDate/FilterDate";

//STYLE
import style from "./style.module.css";
import moment from "moment";
import { Button, Card, CardBody, Container, Alert } from "reactstrap";
import { Skeleton } from "antd";
import { MDBDataTable } from "mdbreact";
import TableComponent from "../../components/ModuleTable/Table";

export default function ModuleTable() {
  return (
    <div className={`container-fluid ${style.containerPageModuleFilter}`}>
      <div className="font-weight-bold">Module Table</div>
      <div className="row mt-3">
        <div className="col-12">
          <TableComponent />
        </div>
      </div>
    </div>
  );
}
