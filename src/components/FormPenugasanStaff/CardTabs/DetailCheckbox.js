import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
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
import { useDispatch, useSelector } from "react-redux";

function DetailCheckbox(props) {
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

  // local storage
  const location = useLocation();
  const idSurvey = location.state.datatable._id;
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(idSurvey))
  );

  const showCheckedOnLoad = async () => {
    // ================= SECTION7
    if (localBtsMain !== null && localBtsMain?.section7 !== null) {
      for (
        let i = 0;
        i < btsMain.section7.keteranganareacakupanbanyakcakupan.length;
        i++
      ) {
        document.getElementById(
          "7" +
            btsMain.section7.keteranganareacakupanbanyakcakupan[i].replace(
              /\s+/g,
              ""
            )
        ).checked = true;
      }
    }
    // ================= SECTION17
    if (btsMain?.section17?.pilihanoperator !== []) {
      for (let i = 0; i < btsMain?.section17?.pilihanoperator.length; i++) {
        if (
          document.getElementById(
            "17" + btsMain?.section17?.pilihanoperator[i].replace(/\s+/g, "")
          ) !== null
        ) {
          document.getElementById(
            "17" + btsMain?.section17?.pilihanoperator[i].replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }

    // ================= SECTION10
    if (localBtsMain !== null && localBtsMain?.section10 !== null) {
      for (let i = 0; i < btsMain.section10.tipejenishp.length; i++) {
        document.getElementById(
          "10" + btsMain.section10.tipejenishp[i].replace(/\s+/g, "")
        ).checked = true;
      }

      for (let i = 0; i < btsMain.section10.jenissimcardoperator.length; i++) {
        document.getElementById(
          "10" + btsMain.section10.jenissimcardoperator[i].replace(/\s+/g, "")
        ).checked = true;
      }
    }
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  useEffect(() => {
    // Kalau ada di local storage, baru tarik. Kalau engga set empty array.
    if (localBtsMain !== null) {
      setSelectedCheckboxes(
        eval(
          "localBtsMain.section" +
            props.section +
            "." +
            props.label
              .replace(/[^a-zA-Z0-9 ]/g, "")
              .replace(/\s+/g, "")
              .toLowerCase()
        )
      );
    } else {
      setSelectedCheckboxes([]);
    }
  }, []);

  const onCheckboxChange = (event) => {
    const isClicked = selectedCheckboxes.includes(event.target.value);
    if (!isClicked) {
      selectedCheckboxes.push(event.target.value);
    } else {
      selectedCheckboxes.splice(selectedCheckboxes.indexOf(event.target.value));
    }
    setSelectedCheckboxes(selectedCheckboxes);
    dispatch(
      setBtsMain({
        ...btsMain,
        ["section" + props.section]: {
          ...eval("btsMain.section" + props.section),
          [props.label
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "")
            .toLowerCase()]: selectedCheckboxes,
        },
      })
    );
  };

  showCheckedOnLoad();
  return (
    <div className='d-flex flex-column px-0'>
      <label className='col-4 px-0'>{props.label}</label>
      <div className='form-group'>
        <Form>
          {props?.name?.length > 1 &&
            props?.name?.map((item, id) => {
              return (
                <FormGroup check inline key={id}>
                  <Label check>
                    <Input
                      type='checkbox'
                      key={id}
                      value={item}
                      // checked={checkbox[item.replace(/\s+/g, "")]}
                      id={props.section + item.replace(/\s+/g, "")}
                      onChange={(e) => {
                        onCheckboxChange(e);
                      }}
                    />{" "}
                    {item}
                  </Label>
                </FormGroup>
              );
            })}
        </Form>
      </div>
    </div>
  );
}

export default DetailCheckbox;
