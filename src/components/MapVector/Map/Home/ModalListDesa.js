import React, { useState, useEffect } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import Axios from "axios";

export default function ModalDummySite(props) {
  return (
    <MDBContainer>
      <MDBModal size="md" isOpen={props.modal} toggle={props.toggle} centered={true}>
        <MDBModalHeader toggle={props.toggle}>List Desa</MDBModalHeader>
        <MDBModalBody>
          <div style={{ maxHeight: "300px" }} className="overflow-auto">
            {props.desa !== undefined ? (
              props.desa.length !== 0 ? (
                props.desa.map((d) => <ul> {d.desa} </ul>)
              ) : (
                <ul> Tidak Ada List Desa </ul>
              )
            ) : (
              ""
            )}
          </div>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
}
