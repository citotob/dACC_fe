import React from "react";
import style from "./style.module.scss";
// import redux
import { setBtsMain } from "../../../store/formSurveyStaff/action";
import { useDispatch, useSelector } from "react-redux";

function DetailInput(props) {
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
  const section21 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section21
  );
  const section22 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section22
  );
  const section23 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section23
  );
  const section24 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section24
  );
  const section25 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section25
  );
  const section26 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section26
  );
  const section27 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section27
  );
  const section28 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section28
  );
  const section29 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section29
  );
  const section30 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section30
  );
  const section31 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section31
  );
  const section32 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section32
  );
  const section33 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section33
  );
  const section34 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section34
  );
  const section35 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section35
  );
  const section36 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section36
  );
  const section37 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section37
  );
  const section38 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section38
  );
  const section39 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section39
  );
  const section40 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section40
  );
  const section41 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section41
  );
  const section42 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section42
  );
  const section43 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section43
  );
  const section44 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section44
  );
  const section45 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section45
  );
  const section46 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section46
  );
  const section47 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section47
  );

  return (
    <>
      <div className='form-group flex-grow-1'>
        {props.showLabel !== false && (
          <label className='px-0'>{props.label}</label>
        )}
        <div
          className={`form-control d-flex flex-row justify-space-between align-items-center ${
            style.detailinput
          } ${props.isExtraInput ? "w-50" : "w-100"}`}
        >
          <input
            className={`${style.detailinput}`}
            style={{
              width: props.inputWidth ?? "90%",
              border: "none",
              outline: "none",
            }}
            disabled={props.disabled ?? false}
            type={props.type}
            value={props.value}
            placeholder={props.label}
            onKeyDown={(e) =>
              props.type === "number" && e.key === "e" && e.preventDefault()
            }
            onChange={(e) => {
              console.log(
                "label input ",
                props.label
                  .replace(/[^a-zA-Z0-9 ]/g, "")
                  .replace(/\s+/g, "")
                  .toLowerCase()
              );
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
            }}
          />
          <div className='d-flex flex-row flex-grow-1 align-items-center'>
            {props.satuan !== "" && (
              <span className='ml-auto font-weight-bold  mb-0'>
                {props.satuan}
              </span>
            )}
          </div>
          {props.message ? (
            props.message !== "" ? (
              <span style={{ color: "red" }}> {props.message}</span>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
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
    </>
  );
}

export default DetailInput;
