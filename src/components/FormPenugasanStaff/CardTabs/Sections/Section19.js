import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

// import components
import DetailInput from "../DetailInput.js";
import LatitudeLongitude from "../LatitudeLongitude";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section19({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection19 = "section19";
  let localSection19 = JSON.parse(
    window.localStorage.getItem(strSection19.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section19 = useSelector((state) => state.FormSurveyStaff.section19);

  const [lenghtNum, setLenghtNum] = useState(1);
  const [arrayTemp, setArrayTemp] = useState([1]);

  let stylingAddButton = {
    backgroundColor: "#406d96",
    color: "white",
    padding: "4px 8px",
    fontSize: "16px",
    lineHeight: "16px",
    borderRadius: "200px",
  };

  let stylingAddText = { color: "#406d96", cursor: "pointer" };

  const handleAddItem = () => {
    setLenghtNum((prev) => prev + 1);
    setArrayTemp((prev) => [...prev, lenghtNum + 1]);
    // setArrayTemp((prev) => [...prev, arrayTemp[arrayTemp.length - 1] + 1]);
  };

  const handleRemoveItem = (number) => {
    dispatch(
      setBtsMain({
        ...btsMain,
        section19: {
          ...btsMain?.section19,
          ["photo" + number]: "",
          ["latitude" + number]: "",
          ["longitude" + number]: "",
          ["description" + number]: "",
        },
      })
    );
    // if (arrayTemp.length > 1) {
    //   setArrayTemp(arrayTemp.filter((item) => item !== x + 1));
    // }
  };

  useEffect(() => {
    // == sementara tidak pakai indexedDB

    setArrayTemp(btsMain?.section19?.penggunapotensial);
  }, []);

  useEffect(() => {
    dispatch(
      setBtsMain({
        ...btsMain,
        section19: {
          ...btsMain?.section19,
          penggunapotensial: arrayTemp,
        },
      })
    );
  }, [arrayTemp]);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 19</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Pengguna Potensial
        </CardTitle>
        <div className={`font-weight-bold`}>
          {btsMain?.section19?.penggunapotensial?.map((number, i) => {
            return (
              <div key={i} className='text-bold border rounded p-4 mb-2'>
                <div className='flexingRow justify-content-between'>
                  <p>Pengguna Potensial #{number}</p>
                  <p
                    className='text-danger'
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveItem(number)}
                  >
                    hapus data
                  </p>
                </div>
                <DetailImage
                  label={`Photo ${number}`}
                  section='19'
                  kode={kode}
                  lat={eval(`btsMain?.section19?.latitude${number}`)}
                  long={eval(`btsMain?.section19?.longitude${number}`)}
                />
                <LatitudeLongitude
                  section='19'
                  latLabel={`Latitude ${number}`}
                  lonLabel={`Longitude ${number}`}
                />
                <DetailInput
                  label={`Description ${number}`}
                  section='19'
                  type='text'
                  value={eval("btsMain?.section19?.description" + number)}
                />
              </div>
            );
          })}
        </div>
        {/* ========= tombol tambah  */}
        <div className={`d-flex flex-row mx-2 my-3 rowStartCenter`}>
          <button
            type='submit'
            style={stylingAddButton}
            onClick={() => handleAddItem()}
          >
            +
          </button>
          <span
            className='pl-1 '
            style={stylingAddText}
            onClick={() => handleAddItem()}
          >
            Tambah Sector
          </span>
        </div>
        <NextPrevButtons
          section='19'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section19;
