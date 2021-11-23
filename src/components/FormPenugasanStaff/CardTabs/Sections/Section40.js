import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailRadio from "../DetailRadio";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import DetailDropdown from "../DetailDropdown";

function Section40({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection40 = "section40";
  let localSection40 = JSON.parse(
    window.localStorage.getItem(strSection40.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section40 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section40
  );

  useEffect(() => {
    if (localBtsMain !== null) {
      dispatch(setBtsMain(localBtsMain));
    } else {
      dispatch(
        setBtsMain({
          ...btsMain,
          section40: {
            ...btsMain?.section40,
            existingterminationbox: "",
            existingavailableport: "",
            needaddnewterminationbox: "",
          },
        })
      );
    }
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 40</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Kondisi Terminasi POI
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailDropdown
            label='Existing Termination Box'
            section='40'
            dropdownItem={[{ name: "Yes" }, { name: "No" }]}
            value={btsMain?.section40?.existingterminationbox}
          />
          <DetailInput
            label='Existing Available Port'
            section='40'
            type='text'
            satuan='Port'
            value={btsMain?.section40?.existingavailableport}
          />
          <DetailDropdown
            label='Need Add New Termination Box:'
            section='40'
            dropdownItem={[{ name: "Yes" }, { name: "No" }]}
            value={btsMain?.section40?.needaddnewterminationbox}
          />
        </div>
        <NextPrevButtons
          section='40'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
} // location

export default Section40;
