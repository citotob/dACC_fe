import React from "react";

// import redux
import { setAISection1 } from "../../../store/formSurveyStaffAI/action";
import { useDispatch, useSelector } from "react-redux";

function DetailTimeRangePicker(props) {
  const dispatch = useDispatch();
  const aisection1 = useSelector((state) => state.FormSurveyStaffAI.aisection1);

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
              console.log("time picked ", e.target.value);
              switch (props.section) {
                case "1":
                  switch (props.label) {
                    case "Jam Operasional Listrik (Mulai)":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          jamOperasionalListrikmulai: e.target.value,
                        })
                      );
                      break;

                    case "Jam Operasional Listrik (Selesai)":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          jamOperasionalListrikselesai: e.target.value,
                        })
                      );
                      break;

                    case "Jam Operasional Local (Mulai)":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          jamOperasionalLokalmulai: e.target.value,
                        })
                      );
                      break;

                    case "Jam Operasional Local (Selesai)":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          jamOperasionalLokalselesai: e.target.value,
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

export default DetailTimeRangePicker;
