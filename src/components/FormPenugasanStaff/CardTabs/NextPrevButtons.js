import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";

//Import Style
import style from "./style.module.scss";

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
import { setShowAlert } from "../../../store/simpanFormAlert/action";
import Localbase from "localbase";
let db = new Localbase("db");

function NextPrevButtons(props) {
  let setactiveTab = props.setactiveTab;
  let prevPage = parseInt(props.section) - 1;
  let nextPage = parseInt(props.section) + 1;

  // redux
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

  // section strings
  let strBtsMain = "btsMain";
  let strSection1 = "section1";
  let strSection2 = "section2";
  let strSection3 = "section3";
  let strSection4 = "section4";
  let strSection5 = "section5";
  let strSection6 = "section6";
  let strSection7 = "section7";
  let strSection8 = "section8";
  let strSection9 = "section9";
  let strSection10 = "section10";
  let strSection11 = "section11";
  let strSection12 = "section12";
  let strSection13 = "section13";
  let strSection14 = "section14";
  let strSection1505 = "section1505";
  let strSection155 = "section155";
  let strSection16 = "section16";
  let strSection17 = "section17";
  let strSection18 = "section18";
  let strSection19 = "section19";
  let strSection20 = "section20";
  let strSection21 = "section21";
  let strSection22 = "section22";
  let strSection23 = "section23";
  let strSection24 = "section24";
  let strSection25 = "section25";
  let strSection26 = "section26";
  let strSection27 = "section27";
  let strSection28 = "section28";
  let strSection29 = "section29";
  let strSection30 = "section30";
  let strSection31 = "section31";
  let strSection32 = "section32";
  let strSection33 = "section33";
  let strSection34 = "section34";
  let strSection35 = "section35";
  let strSection36 = "section36";
  let strSection37 = "section37";
  let strSection38 = "section38";
  let strSection39 = "section39";
  let strSection40 = "section40";
  let strSection41 = "section41";
  let strSection42 = "section42";
  let strSection43 = "section43";
  let strSection44 = "section44";
  let strSection45 = "section45";
  let strSection46 = "section46";
  let strSection47 = "section47";

  // db.collection(eval("strBtsMain").concat(props.kodeSurvey)).delete();

  const handleSimpanLocalStorage = () => {
    // ========== Masuk ke local storage
    // window.localStorage.setItem(
    //   eval("strBtsMain").concat(props.kodeSurvey),
    //   JSON.stringify(btsMain)
    // );
    // ========== Masuk ke IndexedDB
    db.collection(eval("strBtsMain").concat(props.kodeSurvey))
      .get()
      .then((data) => {
        if (data.length === 0) {
          db.collection(eval("strBtsMain").concat(props.kodeSurvey)).add({
            id: 0,
            btsMain: btsMain,
          });
        } else {
          db.collection(eval("strBtsMain").concat(props.kodeSurvey))
            .doc({ id: 0 })
            .set({
              id: 0,
              btsMain: btsMain,
            });
        }
      });
  };

  return (
    <Col lg={12} className='px-0 py-2'>
      <div className={`d-flex flex-row justify-content-between mt-2`}>
        <button
          disabled={props.prevDisabled}
          className={`${style.pagingButtons}`}
          onClick={() => {
            setactiveTab(prevPage.toString());
          }}
        >{`< Prev`}</button>
        <button
          disabled={props.simpanDisabled}
          className={`${style.yesButton} ${style.simpanButton}`}
          onClick={() => {
            handleSimpanLocalStorage();
            dispatch(setShowAlert(true));
            setTimeout(() => {
              dispatch(setShowAlert(false));
            }, 3000);
          }}
        >
          Simpan
        </button>
        <button
          disabled={props.nextDisabled}
          className={`${style.pagingButtons}`}
          onClick={() => {
            setactiveTab(nextPage.toString());
          }}
        >{`Next >`}</button>
      </div>
    </Col>
  );
}

export default NextPrevButtons;

// ======== original punay 47
{
  /* <Col lg={12} className='px-0 py-2'>
<div
  className={`d-flex flex-row justify-content-between mt-2 ${style.modalButtonWrapper}`}
>
  <button
    className={`${style.pagingButtons}`}
    onClick={() => {
      setactiveTab("46");
    }}
  >{`< Prev`}</button>
  <button className={`${style.yesButton}`} onClick={() => {}}>
    Simpan
  </button>
  <button
    disabled
    className={`${style.pagingButtons}`}
    onClick={() => {
      setactiveTab("47");
    }}
  >{`Next >`}</button>
</div>
</Col> */
}
