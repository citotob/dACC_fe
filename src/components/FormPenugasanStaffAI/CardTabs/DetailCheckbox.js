import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
// import redux
import {
  setAISection1,
  setAISection2,
  setAISection3,
} from "../../../store/formSurveyStaffAI/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailCheckbox(props) {
  const dispatch = useDispatch();
  const aisection1 = useSelector((state) => state.FormSurveyStaffAI.aisection1);
  const aisection2 = useSelector((state) => state.FormSurveyStaffAI.aisection2);
  const aisection3 = useSelector((state) => state.FormSurveyStaffAI.aisection3);

  const [checkbox, setCheckbox] = useState({
    tipe: false,
  });

  // local storage
  const location = useLocation();
  const idSurvey = location.state.datatable._id;
  let strSection1 = "aisection1";

  let localSection1 = JSON.parse(
    window.localStorage.getItem(strSection1.concat(idSurvey))
  );

  const showCheckedOnLoad = async () => {
    let fira = await JSON.parse(
      window.localStorage.getItem(strSection1.concat(idSurvey))
    );

    // handle show radio button on load > mana yang ter-checked based on redux
    // ================= SECTION6
    if (localSection1) {
      if (
        aisection1?.darat?.includes("Sewa/Travel") ||
        aisection1?.darat?.includes("Bis") ||
        aisection1?.darat?.includes("Ojek") ||
        aisection1?.darat?.includes("Lainnya")
      ) {
        for (let i = 0; i < aisection1?.darat?.length; i++) {
          document.getElementById(
            "1Darat" + aisection1.darat[i].replace(/\s+/g, "")
          ).checked = true;
        }
      }

      if (
        aisection1?.laut?.includes("Feri") ||
        aisection1?.laut?.includes("SpeedBoat") ||
        aisection1?.laut?.includes("Sampan") ||
        aisection1?.laut?.includes("Lainnya")
      ) {
        for (let i = 0; i < aisection1?.laut?.length; i++) {
          document.getElementById(
            "1Laut" + aisection1.laut[i].replace(/\s+/g, "")
          ).checked = true;
        }
      }

      if (
        aisection1?.udara?.includes("Pesawat") ||
        aisection1?.udara?.includes("Helicopter") ||
        aisection1?.udara?.includes("Lainnya")
      ) {
        for (let i = 0; i < aisection1?.udara?.length; i++) {
          document.getElementById(
            "1Udara" + aisection1.udara[i].replace(/\s+/g, "")
          ).checked = true;
        }
      }
    }
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const onCheckboxChange = (event) => {
    const isClicked = selectedCheckboxes.includes(event.target.value);
    if (!isClicked) {
      selectedCheckboxes.push(event.target.value);
    } else {
      selectedCheckboxes.splice(
        selectedCheckboxes.indexOf(event.target.value),
        1
      );
    }
    setSelectedCheckboxes(selectedCheckboxes);
    switch (props.section) {
      case "1":
        switch (props.label) {
          case "Akses Darat":
            dispatch(
              setAISection1({
                ...aisection1,
                darat: selectedCheckboxes,
              })
            );
            break;

          case "Akses Laut":
            dispatch(
              setAISection1({
                ...aisection1,
                laut: selectedCheckboxes,
              })
            );
            break;

          case "Akses Udara":
            dispatch(
              setAISection1({
                ...aisection1,
                udara: selectedCheckboxes,
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
  };

  showCheckedOnLoad();
  return (
    <div className='d-flex flex-column px-0'>
      <label className='col-4 px-0'>
        {props.label}{" "}
        {props.required && props.required === true ? (
          <span style={{ color: "red", fontWeight: "bold" }}> *</span>
        ) : (
          <></>
        )}
      </label>
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
                      id={
                        props.section +
                        props.label.split(" ")[1] +
                        item.replace(/\s+/g, "")
                      }
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

// handle show radio button on load > mana yang ter-checked based on redux
// ================= SECTION6
// if (section6.namaoperator !== []) {
//   for (let i = 0; i < section6.namaoperator.length; i++) {
//     document.getElementById(
//       section6.namaoperator[i].replace(/\s+/g, "")
//     ).checked = true;
//   }
// }
// ================= SECTION7
// if (section7.deskripsiareajangkauan !== []) {
//   for (let i = 0; i < section7.deskripsiareajangkauan.length; i++) {
//     document.getElementById(
//       section7.deskripsiareajangkauan[i].replace(/\s+/g, "")
//     ).checked = true;
//   }
// }
// ================= SECTION10
// if (section10.tipepenggunatelfongenggam !== []) {
//   for (let i = 0; i < section10.tipepenggunatelfongenggam.length; i++) {
//     document.getElementById(
//       section10.tipepenggunatelfongenggam[i].replace(/\s+/g, "")
//     ).checked = true;
//   }
// }
// if (section10.simcardyangtersedia !== []) {
//   for (let i = 0; i < section10.simcardyangtersedia.length; i++) {
//     document.getElementById(
//       section10.simcardyangtersedia[i].replace(/\s+/g, "")
//     ).checked = true;
//   }
// }
