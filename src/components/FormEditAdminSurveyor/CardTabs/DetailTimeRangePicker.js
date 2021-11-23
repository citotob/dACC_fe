import React from "react";

// import redux
import { setSection8 } from "../../../store/formSurveyStaff/action";
import { useDispatch, useSelector } from "react-redux";

function DetailTimeRangePicker(props) {
  const dispatch = useDispatch();
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
            // defaultValue={todayTime}
            value={props.value === "" ? todayTime : props.value}
            onChange={(e) => {
              switch (props.section) {
                case "8":
                  switch (props.label) {
                    case "Mulai":
                      dispatch(
                        setSection8({
                          ...section8,
                          jumlahjamketersediaanlistrikmulai: e.target.value,
                        })
                      );
                      break;
                    case "Selesai":
                      dispatch(
                        setSection8({
                          ...section8,
                          jumlahjamketersediaanlistrikselesai: e.target.value,
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

export default DetailTimeRangePicker;
