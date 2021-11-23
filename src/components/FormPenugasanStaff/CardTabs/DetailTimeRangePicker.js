import React, { useEffect } from "react";

// import redux
import { setBtsMain } from "../../../store/formSurveyStaff/action";
import { useDispatch, useSelector } from "react-redux";

function DetailTimeRangePicker(props) {
  // == LOCAL STORAGE
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(props.kodeSurvey))
  );

  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section8 = useSelector((state) => state.FormSurveyStaff.section8);

  const moment = require("moment");
  let today = new Date();
  let todayDate = moment(today).format("YYYY-MM-DD");
  let todayTime = moment(today).format("HH:MM");

  return (
    <div className='d-flex flex-column px-0 flex-grow-1'>
      <div className='form-group'>
        <label className='px-0'>{props.label}</label>
        <div className='d-flex flex-row justify-space-between align-items-center w-100'>
          <input
            className='form-control'
            type='time'
            value={props.value === "" ? todayTime : props.value}
            onChange={(e) => {
              dispatch(
                setBtsMain({
                  ...btsMain,
                  ["section" + props.section]: {
                    ...eval("btsMain.section" + props.section),
                    [props.label
                      .replace(/[^a-zA-Z0-9 ]/g, "")
                      .replace(/\s+/g, "")
                      .toLowerCase()]: e.target.value,
                  },
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailTimeRangePicker;
