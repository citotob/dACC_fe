import React from "react";
// import redux
import {
  setAISection1,
  setAISection2,
  setAISection3,
} from "../../../store/formSurveyStaffAI/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailDropdown(props) {
  const dispatch = useDispatch();
  const aisection1 = useSelector((state) => state.FormSurveyStaffAI.aisection1);
  const aisection2 = useSelector((state) => state.FormSurveyStaffAI.aisection2);
  const aisection3 = useSelector((state) => state.FormSurveyStaffAI.aisection3);

  return (
    <div className='d-flex flex-column px-0 flex-grow-1'>
      <div className='form-group'>
        <label className=' px-0'>
          {props.label}{" "}
          {props.required && props.required === true ? (
            <span style={{ color: "red", fontWeight: "bold" }}> *</span>
          ) : (
            <></>
          )}
        </label>

        <select
          className={`form-control`}
          value={props.value}
          onChange={(e) => {
            switch (props.section) {
              case "1":
                switch (props.label) {
                  case "Kategori":
                    dispatch(
                      setAISection1({
                        ...aisection1,
                        kategori: e.target.value,
                      })
                    );
                    break;

                  case "Tipe Bisnis":
                    dispatch(
                      setAISection1({
                        ...aisection1,
                        tipeBisnis: e.target.value,
                      })
                    );
                    break;

                  case "Sumber Listrik":
                    dispatch(
                      setAISection1({
                        ...aisection1,
                        sumber_listrik: e.target.value,
                      })
                    );
                    break;

                  case "Kapasitas Listrik":
                    dispatch(
                      setAISection1({
                        ...aisection1,
                        kapasitas_listrik: e.target.value,
                      })
                    );
                    break;

                  case "Sumber Listrik Cadangan":
                    dispatch(
                      setAISection1({
                        ...aisection1,
                        sumber_cadangan: e.target.value,
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

              case "3":
                switch (props.label) {
                  case "Tipe Network":
                    dispatch(
                      setAISection3({
                        ...aisection3,
                        tipenetwork: e.target.value,
                      })
                    );
                    break;
                }
                break;

              default:
                break;
            }
          }}
        >
          <option value=''>Pilih</option>
          {props.dropdownItem.map((item, i) => {
            return (
              <option value={item.name} key={i}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default DetailDropdown;
