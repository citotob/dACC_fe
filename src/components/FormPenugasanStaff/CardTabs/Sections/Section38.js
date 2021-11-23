import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle, Label } from "reactstrap";
import Resizer from "react-image-file-resizer";
//Import Style
import style from "../style.module.scss";

// import components
import DetailInput from "../DetailInput.js";
import LatitudeLongitude from "../LatitudeLongitude";
import NextPrevButtons from "../NextPrevButtons";
// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import InfoText from "../InfoText";

function Section38({ setactiveTab, db }) {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection38 = "section38";
  let localSection38 = JSON.parse(
    window.localStorage.getItem(strSection38.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section38 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section38
  );

  const [stateKoordinat, setStateKoordinat] = useState("");
  const [stateNamaJalan, setStateNamaJalan] = useState("");
  const [stateObyekReferensi, setStateObyekReferensi] = useState("");

  let stylingAddButton = {
    backgroundColor: "#406d96",
    color: "white",
    padding: "4px 8px",
    fontSize: "16px",
    lineHeight: "16px",
    borderRadius: "200px",
  };

  let stylingAddText = { color: "#406d96", cursor: "pointer" };

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  const handleAddItem = () => {
    if (
      stateKoordinat !== "" &&
      stateNamaJalan !== "" &&
      stateObyekReferensi !== ""
    ) {
      dispatch(
        setBtsMain({
          ...btsMain,
          section38: {
            ...btsMain?.section38,
            lokasihhpole: [
              ...btsMain?.section38?.lokasihhpole,
              {
                koordinat: stateKoordinat,
                namajalan: stateNamaJalan,
                obyekreferensi: stateObyekReferensi,
              },
            ],
          },
        })
      );

      setStateKoordinat("");
      setStateNamaJalan("");
      setStateObyekReferensi("");
    }
  };

  const handleRemoveItem = (e) => {
    dispatch(
      setBtsMain({
        ...btsMain,
        section38: {
          ...btsMain?.section38,
          lokasihhpole: btsMain?.section38?.lokasihhpole.filter(
            (item) => btsMain?.section38?.lokasihhpole.indexOf(item) !== e
          ),
        },
      })
    );
  };

  const inputComponent = (label, placeholder, value, setState) => {
    return (
      <div className='form-group'>
        <label className='px-0'>{label}</label>
        <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
          <input
            style={{ width: "95%", border: "none", outline: "none" }}
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <CardBody>
      <span className={style.section}>Section 38</span>
      <CardTitle className={`mb-5 mt-2 text26`}>Lokasi HH/Pole</CardTitle>
      {inputComponent(
        "Koordinat",
        "Latitude, Longitude",
        stateKoordinat,
        setStateKoordinat
      )}
      {inputComponent(
        "Nama Jalan",
        "Nama Jalan",
        stateNamaJalan,
        setStateNamaJalan
      )}
      {inputComponent(
        "Obyek Referensi",
        "Obyek Referensi",
        stateObyekReferensi,
        setStateObyekReferensi
      )}
      <InfoText text1='** Each HH need to record; Every 5 Poles need to record' />

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

      {/* ========= tabel  */}
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Kordinat</th>
              <th>Nama Jalan</th>
              <th>Obyek Referensi</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {btsMain?.section38?.lokasihhpole?.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.koordinat}</td>
                  <td>{data.namajalan}</td>
                  <td>{data.obyekreferensi}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleRemoveItem(i);
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <NextPrevButtons
        section='38'
        setactiveTab={setactiveTab}
        kodeSurvey={kodeSurvey}
        nextDisabled={false}
        prevDisabled={false}
        simpanDisabled={false}
      />
    </CardBody>
  );
}

export default Section38;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section28: {
//           ...btsMain?.section28,
//           latitude: "",
//           longitude: "",
//           namajalan: "",
//           obyekreferensi: "",
//         },
//       })
//     );
//   }
// }, []);
