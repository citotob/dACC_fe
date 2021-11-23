import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage";
import DetailDatePicker from "../DetailDatePicker";
import DetailDropdown from "../DetailDropdown";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section1({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location?.state?.datatable._id;
  // == LOCAL STORAGE
  let strSection1 = "section1";
  let localSection1 = JSON.parse(
    window.localStorage.getItem(strSection1.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section1 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section1
  );

  useEffect(() => {
    // db.collection(eval("strBtsMain").concat(kodeSurvey))
    //   .get()
    //   .then((data) => {
    //     if (data[0]) {
    //       dispatch(setBtsMain(data[0].btsMain));
    //     } else {
    //       destroyBtsForm(dispatch, btsMain, setBtsMain);
    //     }
    //   });
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 1</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Informasi Survey</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailDropdown
            label='Tipe'
            section='1'
            dropdownItem={[
              { name: "Main Candidate" },
              { name: "Alternative 1" },
              { name: "Alternative 2" },
            ]}
            value={btsMain?.section1?.tipe}
          />
          <DetailInput
            label='Site ID'
            section='1'
            value={btsMain?.section1?.siteid}
            type='text'
          />
          <DetailInput
            label='Kontraktor'
            section='1'
            value={btsMain?.section1?.kontraktor}
            type='text'
          />
          <DetailInput
            label='Nama Project'
            section='1'
            value={btsMain?.section1?.namaproject}
            type='text'
          />
          <DetailInput
            label='Dokumen No'
            section='1'
            value={btsMain?.section1?.dokumenno}
            type='text'
          />
          <DetailInput
            label='Rev'
            section='1'
            value={btsMain?.section1?.rev}
            type='text'
          />
          <DetailDatePicker
            label='Tanggal Survey'
            section='1'
            value={btsMain?.section1?.tanggalsurvey}
          />
          <DetailInput
            label='Nama Surveyor'
            section='1'
            value={btsMain?.section1?.namasurveyor}
            type='text'
          />
          <DetailInput
            label='Nomor Telepon'
            section='1'
            value={btsMain?.section1?.nomortelepon}
            type='number'
          />
          <DetailInput
            label='Email'
            section='1'
            value={btsMain?.section1?.email}
            type='email'
          />
          <DetailDropdown
            label='Status Site'
            section='1'
            dropdownItem={[{ name: "Ok" }, { name: "Ada Sinyal" }]}
            value={btsMain?.section1?.statussite}
          />
          <DetailImage label='Foto KTP' section='1' />
          <DetailImage
            label='File Site Survey Report dan Approval'
            section='1'
            name='jpgpdf'
          />
        </div>

        <NextPrevButtons
          section='1'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={true}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section1;
