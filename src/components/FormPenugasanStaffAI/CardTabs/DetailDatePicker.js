import React, { useState } from "react";

// import redux
import {
  setAISection1,
  setAISection2,
  setAISection3,
} from "../../../store/formSurveyStaffAI/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailDatePicker(props) {
  const dispatch = useDispatch();
  const aisection1 = useSelector((state) => state.FormSurveyStaff.aisection1);
  const aisection2 = useSelector((state) => state.FormSurveyStaff.aisection2);
  const aisection3 = useSelector((state) => state.FormSurveyStaff.aisection3);

  const moment = require("moment");
  let today = new Date();
  let todayDate = moment(today).format("YYYY-MM-DD");

  return (
    <div className='d-flex flex-column px-0'>
      <div className='form-group'>
        <label className='col-4 px-0'>{props.label}</label>
        <div className='d-flex flex-row justify-space-between align-items-center w-100'>
          <input
            className='form-control'
            type='date'
            defaultValue={todayDate}
            onChange={(e) => {
              switch (props.section) {
                case "1":
                  switch (props.label) {
                    case "Tanggal Kunjungan":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          tanggalPelaksanaan: e.target.value,
                        })
                      );
                      break;

                    default:
                      dispatch(
                        setAISection1({
                          ...aisection1,
                        })
                      );
                      break;
                  }
                  break;

                default:
                  break;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailDatePicker;
