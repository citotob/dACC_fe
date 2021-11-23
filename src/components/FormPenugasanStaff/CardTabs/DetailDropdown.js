import React from "react";
// import redux
import {
  setBtsMain,
  setSection1,
  setSection2,
  setSection3,
  setSection4,
  setSection5,
  setSection6,
  setSection7,
  setSection8,
  setSection9,
  setSection10,
  setSection11,
  setSection12,
  setSection13,
  setSection14,
  setSection15,
  setSection16,
  setSection17,
  setSection18,
  setSection19,
  setSection20,
  setSection22,
} from "../../../store/formSurveyStaff/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { initial } from "lodash";

function DetailDropdown(props) {
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section1 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section1
  );
  const section2 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section2
  );
  const section3 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section3
  );
  const section4 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section4
  );
  const section5 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section5
  );
  const section6 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section6
  );
  const section7 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section7
  );
  const section8 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section8
  );
  const section9 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section9
  );
  const section10 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section10
  );
  const section11 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section11
  );
  const section12 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section12
  );
  const section13 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section13
  );
  const section14 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section14
  );
  const section15 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section15
  );
  const section16 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section16
  );
  const section17 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section17
  );
  const section18 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section18
  );
  const section19 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section19
  );
  const section20 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section20
  );
  const section22 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section22
  );

  // section strings
  let strBtsMain = "btsMain";

  return (
    <div className='d-flex flex-column px-0 flex-grow-1'>
      <div className='form-group'>
        <label className='px-0'>{props.label}</label>
        <select
          className={`form-control`}
          value={props.value}
          onChange={(e) => {
            if (props.segment) {
              dispatch(
                setBtsMain({
                  ...btsMain,
                  ["section" + props.section]: {
                    ...eval("btsMain.section" + props.section),
                    [props.label
                      .replace(/[^a-zA-Z0-9 ]/g, "")
                      .replace(/\s+/g, "")
                      .toLowerCase() +
                      props.segment
                        .replace(/[^a-zA-Z0-9 ]/g, "")
                        .replace(/\s+/g, "")
                        .toLowerCase() ?? ""]: e.target.value,
                  },
                })
              );
            } else {
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
            }

            // handling kalau Pengelola Sumber Listrik = Tidak Ada Sumber Listrik
            if (props.section === "8") {
              if (
                props.label === "Pengelola Sumber Listrik" &&
                e.target.value === "Tidak Ada Sumber Listrik"
              ) {
                dispatch(
                  setBtsMain({
                    ...btsMain,
                    section8: {
                      ...btsMain.section8,
                      pengelolasumberlistrik: e.target.value,
                      phaselistrik: "",
                      kapasitassumberlistrik: "",
                      jarakperangkatkesumberlistrikterdekat: "",
                      listrikbisadipakaiuntukperangkat: "Tidak",
                    },
                  })
                );
              }
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
      <div className='mb-2'>
        {props.asterisk ? (
          <p className={`font-weight-normal text-info`}>* {props.asterisk}</p>
        ) : (
          <></>
        )}
        {props.asterisk2 ? (
          <p className={`font-weight-normal text-info`}>* {props.asterisk2}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DetailDropdown;
