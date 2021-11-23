import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";
// import redux
import {
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

function DetailCheckbox(props) {
  const role = window.localStorage.getItem("roleName");
  const dispatch = useDispatch();
  const section1 = useSelector((state) => state.FormSurveyStaff.section1);
  const section2 = useSelector((state) => state.FormSurveyStaff.section2);
  const section3 = useSelector((state) => state.FormSurveyStaff.section3);
  const section4 = useSelector((state) => state.FormSurveyStaff.section4);
  const section5 = useSelector((state) => state.FormSurveyStaff.section5);
  const section6 = useSelector((state) => state.FormSurveyStaff.section6);
  const section7 = useSelector((state) => state.FormSurveyStaff.section7);
  const section8 = useSelector((state) => state.FormSurveyStaff.section8);
  const section9 = useSelector((state) => state.FormSurveyStaff.section9);
  const section10 = useSelector((state) => state.FormSurveyStaff.section10);
  const section11 = useSelector((state) => state.FormSurveyStaff.section11);
  const section12 = useSelector((state) => state.FormSurveyStaff.section12);
  const section13 = useSelector((state) => state.FormSurveyStaff.section13);
  const section14 = useSelector((state) => state.FormSurveyStaff.section14);
  const section15 = useSelector((state) => state.FormSurveyStaff.section15);
  const section16 = useSelector((state) => state.FormSurveyStaff.section16);
  const section17 = useSelector((state) => state.FormSurveyStaff.section17);
  const section18 = useSelector((state) => state.FormSurveyStaff.section18);
  const section19 = useSelector((state) => state.FormSurveyStaff.section19);
  const section20 = useSelector((state) => state.FormSurveyStaff.section20);
  const section22 = useSelector((state) => state.FormSurveyStaff.section22);

  const [checkbox, setCheckbox] = useState({
    tipe: false,
  });

  // local storage
  const location = useLocation();
  const idSurvey = location.state.datatable._id;
  let strSection6 = "section6";
  let strSection7 = "section7";
  let strSection10 = "section10";
  let localSection6 = JSON.parse(
    window.localStorage.getItem(strSection6.concat(idSurvey))
  );
  let localSection7 = JSON.parse(
    window.localStorage.getItem(strSection7.concat(idSurvey))
  );
  let localSection10 = JSON.parse(
    window.localStorage.getItem(strSection10.concat(idSurvey))
  );

  const showCheckedOnLoad = async () => {
    // handle show radio button on load > mana yang ter-checked based on redux

    if (role === "staffsurveyor") {
      // ================= SECTION6
      if (localSection6) {
        for (let i = 0; i < section6.namaoperator.length; i++) {
          if (
            document.getElementById(
              "6" + section6.namaoperator[i].replace(/\s+/g, "")
            ) !== null
          ) {
            document.getElementById(
              "6" + section6.namaoperator[i].replace(/\s+/g, "")
            ).checked = true;
          }
        }
      }
      // ================= SECTION7
      if (localSection7) {
        for (let i = 0; i < section7.deskripsiareajangkauan.length; i++) {
          if (
            document.getElementById(
              "7" + section7.deskripsiareajangkauan[i].replace(/\s+/g, "")
            ) !== null
          ) {
            document.getElementById(
              "7" + section7.deskripsiareajangkauan[i].replace(/\s+/g, "")
            ).checked = true;
          }
        }
      }
      // ================= SECTION10
      if (localSection10) {
        for (let i = 0; i < section10.tipepenggunatelfongenggam.length; i++) {
          if (
            document.getElementById(
              "10" + section10.tipepenggunatelfongenggam[i].replace(/\s+/g, "")
            ) !== null
          ) {
            document.getElementById(
              "10" + section10.tipepenggunatelfongenggam[i].replace(/\s+/g, "")
            ).checked = true;
          }
        }

        for (let i = 0; i < section10.simcardyangtersedia.length; i++) {
          if (
            document.getElementById(
              "10" + section10.simcardyangtersedia[i].replace(/\s+/g, "")
            ) !== null
          ) {
            document.getElementById(
              "10" + section10.simcardyangtersedia[i].replace(/\s+/g, "")
            ).checked = true;
          }
        }
      }
    } else if (role === "adminsurveyor") {
      // ================= SECTION6
      if (section6) {
        if (
          section6?.namaoperator?.includes("Telkomsel") ||
          section6?.namaoperator?.includes("XL") ||
          section6?.namaoperator?.includes("Indosat") ||
          section6?.namaoperator?.includes("Smartfren") ||
          section6?.namaoperator?.includes("H3I")
        ) {
          console.log("section6nya ", section6);
          for (let i = 0; i < section6?.namaoperator?.length; i++) {
            if (
              document.getElementById(
                "6" + section6?.namaoperator[i]?.replace(/\s+/g, "")
              ) !== null
            ) {
              document.getElementById(
                "6" + section6?.namaoperator[i]?.replace(/\s+/g, "")
              ).checked = true;
            }

            console.log(
              "check section 6 ",
              "6" + section6.namaoperator[i].replace(/\s+/g, "")
            );
          }
        }
      }
      // ================= SECTION7
      if (section7) {
        if (
          section7?.deskripsiareajangkauan?.includes("Pemerintahan") ||
          section7?.deskripsiareajangkauan?.includes("Rumah Sakit") ||
          section7?.deskripsiareajangkauan?.includes("Pabrik") ||
          section7?.deskripsiareajangkauan?.includes("Masjid") ||
          section7?.deskripsiareajangkauan?.includes("Komersial") ||
          section7?.deskripsiareajangkauan?.includes("Perumahan") ||
          section7?.deskripsiareajangkauan?.includes("Sekolah") ||
          section7?.deskripsiareajangkauan?.includes("Lainnya")
        ) {
          for (let i = 0; i < section7.deskripsiareajangkauan.length; i++) {
            if (
              document.getElementById(
                "7" + section7.deskripsiareajangkauan[i].replace(/\s+/g, "")
              ) !== null
            ) {
              document.getElementById(
                "7" + section7.deskripsiareajangkauan[i].replace(/\s+/g, "")
              ).checked = true;
            }
          }
        }
      }
      // ================= SECTION10
      if (section10) {
        if (
          section10?.tipepenggunatelfongenggam?.includes("2G") ||
          section10?.tipepenggunatelfongenggam?.includes("2G dan 4G") ||
          section10?.tipepenggunatelfongenggam?.includes("Smartphone/Tablet")
        ) {
          for (let i = 0; i < section10.tipepenggunatelfongenggam.length; i++) {
            if (
              document.getElementById(
                "10" +
                  section10.tipepenggunatelfongenggam[i].replace(/\s+/g, "")
              ) !== null
            ) {
              document.getElementById(
                "10" +
                  section10.tipepenggunatelfongenggam[i].replace(/\s+/g, "")
              ).checked = true;
            }
          }
        }

        if (
          section10?.simcardyangtersedia?.includes("Telkomsel") ||
          section10?.simcardyangtersedia?.includes("XL") ||
          section10?.simcardyangtersedia?.includes("Indosat") ||
          section10?.simcardyangtersedia?.includes("Smartfren") ||
          section10?.simcardyangtersedia?.includes("H3I") ||
          section10?.simcardyangtersedia?.includes("Lainnya")
        ) {
          for (let i = 0; i < section10.simcardyangtersedia.length; i++) {
            if (
              document.getElementById(
                "10" + section10.simcardyangtersedia[i].replace(/\s+/g, "")
              ) !== null
            ) {
              document.getElementById(
                "10" + section10.simcardyangtersedia[i].replace(/\s+/g, "")
              ).checked = true;
            }
          }
        }
      }
    }
  };
  // if (localSection6) {
  //   console.log("local section6 ada isi");
  //   for (let i = 0; i < section6.namaoperator.length; i++) {
  //     document.getElementById(
  //       "6" + section6.namaoperator[i].replace(/\s+/g, "")
  //     ).checked = true;
  //   }
  // }

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
      case "6":
        switch (props.label) {
          case "Nama Operator":
            dispatch(
              setSection6({
                ...section6,
                namaoperator: selectedCheckboxes,
              })
            );
            break;
          default:
            dispatch(
              setSection6({
                ...section6,
              })
            );
            break;
        }
        break;

      case "7":
        switch (props.label) {
          case "Keterangan Area Cakupan (Banyak Cakupan)":
            dispatch(
              setSection7({
                ...section7,
                deskripsiareajangkauan: selectedCheckboxes,
              })
            );
            break;

          default:
            dispatch(
              setSection7({
                ...section7,
              })
            );
            break;
        }
        break;

      case "10":
        switch (props.label) {
          case "Tipe Jenis Hp":
            dispatch(
              setSection10({
                ...section10,
                tipepenggunatelfongenggam: selectedCheckboxes,
              })
            );
            break;
          case "Jenis Sim Card Operator":
            dispatch(
              setSection10({
                ...section10,
                simcardyangtersedia: selectedCheckboxes,
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
