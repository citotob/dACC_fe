import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import DetailInput from "../DetailInput.js";

// import redux
import { setAISection2 } from "../../../../store/formSurveyStaffAI/action";

import { setShowAlert } from "../../../../store/simpanFormAlert/action";

function Section2() {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  let strSection2 = "aisection2";
  let localSection2 = JSON.parse(
    window.localStorage.getItem(strSection2.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const aisection2 = useSelector((state) => state.FormSurveyStaffAI.aisection2);

  useEffect(() => {
    if (localSection2 !== null) {
      dispatch(setAISection2(localSection2));
    } else {
      // reset redux store ketika tidak ada local storage terdeteksi
      dispatch(
        setAISection2({
          pc: "",
          tablet: "",
          smartPhone: "",
          laptop: "",
          lainnya1Name: "",
          lainnya1Qty: "",
          lainnya2Name: "",
          lainnya2Qty: "",
        })
      );
    }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection2.concat(kodeSurvey),
      JSON.stringify(aisection2)
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 2</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Keterangan Perangkat IT di Lokasi
        </CardTitle>
        <div className='d-flex flex-row w-100 gap16'>
          <DetailInput
            label='Komputer'
            placeholder='Jumlah'
            section='2'
            value={aisection2.pc}
            type='number'
            required={true}
          />
          <DetailInput
            label='Tablet'
            placeholder='Jumlah'
            section='2'
            value={aisection2.tablet}
            type='number'
            required={true}
          />
          <DetailInput
            label='Smarthphone'
            placeholder='Jumlah'
            section='2'
            value={aisection2.smartPhone}
            type='number'
            required={true}
          />
          <DetailInput
            label='Laptop'
            placeholder='Jumlah'
            section='2'
            value={aisection2.laptop}
            type='number'
            required={true}
          />
        </div>
        <div className='d-flex flex-row w-100 gap16'>
          <div className='flex-grow-1'>
            <DetailInput
              label='Lainnya 1'
              placeholder='Nama Perangkat'
              section='2'
              value={aisection2.lainnya1Name}
              type='alerttext'
              alertmessage={
                aisection2.lainnya1Name === "" && aisection2.lainnya1Qty !== ""
                  ? "Data harus diinput!"
                  : ""
              }
            />
          </div>
          <div className='flex-grow-2'>
            <DetailInput
              label='Jumlah 1'
              placeholder='Jumlah'
              section='2'
              value={aisection2.lainnya1Qty}
              type='number'
              alertmessage={
                aisection2.lainnya1Name !== "" && aisection2.lainnya1Qty === ""
                  ? "Data harus diinput!"
                  : ""
              }
            />
          </div>
        </div>
        <div className='d-flex flex-row w-100 gap16'>
          <div className='flex-grow-1'>
            <DetailInput
              label='Lainnya 2'
              placeholder='Nama Perangkat'
              section='2'
              value={aisection2.lainnya2Name}
              type='text'
              alertmessage={
                aisection2.lainnya2Name === "" && aisection2.lainnya2Qty !== ""
                  ? "Data harus diinput!"
                  : ""
              }
            />
          </div>
          <div className='flex-grow-2'>
            <DetailInput
              label='Jumlah 2'
              placeholder='Jumlah'
              section='2'
              value={aisection2.lainnya2Qty}
              type='number'
              alertmessage={
                aisection2.lainnya2Name !== "" && aisection2.lainnya2Qty === ""
                  ? "Data harus diinput!"
                  : ""
              }
            />
          </div>
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row mx-auto justify-content-end ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
            >
              Simpan
            </button>
          </div>
        </Col>
      </>
    </CardBody>
  );
}

export default Section2;
