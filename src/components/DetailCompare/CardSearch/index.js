import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody } from "reactstrap";
import {
  setBTSData1,
  setBTSData2,
  setSelect1,
  setSelect2,
  setShowDetails,
} from "../../../store/compareBTS/action";
// IMPORT STYLE
import style from "./style.module.scss";
import API from "../../../services";

function CardSearch(props) {
  // redux
  const dispatch = useDispatch();
  const showDetails = useSelector((state) => state.CompareBTS.showDetails);

  const select1 = useSelector((state) => state.CompareBTS.select1);
  const select2 = useSelector((state) => state.CompareBTS.select2);
  const btsData1 = useSelector((state) => state.CompareBTS.btsData1);
  const btsData2 = useSelector((state) => state.CompareBTS.btsData2);

  const getBTSData = () => {
    let formData1 = new FormData();
    let formData2 = new FormData();
    formData1.append("kode_survei", select1);
    formData2.append("kode_survei", select2);

    let params1 = {
      field: "kode",
      value: select1,
    };

    let params2 = {
      field: "kode",
      value: select2,
    };

    API.searchHasilBTS(params1)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setBTSData1(res.data.values[0].data[0]));
        }
      })
      .catch((err) => console.log(err.response));

    API.searchHasilBTS(params2)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setBTSData2(res.data.values[0].data[0]));
        }
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <Card>
        <CardBody className={`${style.cardBody}`}>
          <div className={style.cardTitleWrapper}>
            <span className={style.cardTitle}>Compare Hasil Survey</span>
          </div>
          <div className={`d-flex flex-row px-4 align-items-center`}>
            <div
              className={`d-flex flex-row flex-grow-1 align-items-center ${style.selectWrapper}`}
            >
              <label className={`p-0 m-0 h5 text-bold`}>Lokasi 1</label>
              <select
                name='select1'
                className={`flex-grow-1 mx-4 ${style.searchSelect}`}
                style={{ width: "330px" }}
                onChange={(e) => {
                  dispatch(setSelect1(e.target.value));
                }}
              >
                <option value=''>Pilih</option>
                {props.data?.map((item, i) => {
                  return (
                    <option key={i} value={item.kode}>
                      {item.kode}
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              className={`d-flex flex-row flex-grow-1 align-items-center  ${style.selectWrapper}`}
            >
              <label className={`p-0 m-0 h5 text-bold`}>Lokasi 2</label>
              <select
                name='select1'
                className={`flex-grow-1 mx-4 ${style.searchSelect}`}
                style={{ width: "330px" }}
                onChange={(e) => {
                  dispatch(setSelect2(e.target.value));
                }}
              >
                <option value=''>Pilih</option>
                {props.data?.map((item, i) => {
                  return (
                    <option key={i} value={item.kode}>
                      {item.kode}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={`d-flex flex-row justify-content-center mt-4 mb-3`}>
            <button
              className={`${style.yesButton} `}
              onClick={() => {
                dispatch(setShowDetails(true));
                getBTSData();
              }}
            >
              Compare
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CardSearch;
