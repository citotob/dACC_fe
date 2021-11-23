import React from "react";
// import redux
import {
  setAISection1,
  setAISection2,
  setAISection3,
} from "../../../store/formSurveyStaffAI/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailInput(props) {
  const dispatch = useDispatch();
  const aisection1 = useSelector((state) => state.FormSurveyStaffAI.aisection1);
  const aisection2 = useSelector((state) => state.FormSurveyStaffAI.aisection2);
  const aisection3 = useSelector((state) => state.FormSurveyStaffAI.aisection3);

  return (
    <div className='d-flex flex-column px-0 flex-grow-1'>
      <div className='form-group'>
        <label className='px-0'>{props.label}</label>
        {props.required && props.required === true ? (
          <span style={{ color: "red", fontWeight: "bold" }}> * </span>
        ) : (
          <></>
        )}

        {props.alertmessage ? (
          props.alertmessage !== "" ? (
            <span style={{ color: "red" }}> {props.alertmessage}</span>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
          <input
            style={{
              width: props.inputWidth ?? "90%",
              border: "none",
              outline: "none",
            }}
            type={props.type}
            // className='form-control'
            value={props.value}
            placeholder={props.placeholder ? props.placeholder : props.label}
            onKeyDown={(e) =>
              props.type === "number" && e.key === "e" && e.preventDefault()
            }
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

                    case "Nama PIC":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          namaPic: e.target.value,
                        })
                      );
                      break;

                    case "Nomor Telepon PIC":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          phonePic: e.target.value,
                        })
                      );
                      break;
                    case "Nama Lokasi":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          namaLokasi: e.target.value,
                        })
                      );
                      break;
                    case "Latitude":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          latitude: e.target.value,
                        })
                      );
                      break;
                    case "Longitude":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          longitude: e.target.value,
                        })
                      );
                      break;

                    case "Akses Darat Lainnya":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          daratinput: e.target.value,
                        })
                      );
                      break;

                    case "Akses Laut Lainnya":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          lautinput: e.target.value,
                        })
                      );
                      break;

                    case "Akses Udara Lainnya":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          udarainput: e.target.value,
                        })
                      );
                      break;

                    case "Durasi Perjalanan Dari Kota Kecamatan":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          durasiPerjalanan: e.target.value,
                        })
                      );
                      break;
                    case "Nama Kota Kecamatan":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          namaKotaKecamatan: e.target.value,
                        })
                      );
                      break;
                    case "Ketinggian Tempat (Meter)":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          elevation: e.target.value,
                        })
                      );
                      break;
                    case "Alamat":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          alamatLokasi: e.target.value,
                        })
                      );
                      break;
                    case "Catatan":
                      dispatch(
                        setAISection1({
                          ...aisection1,
                          note: e.target.value,
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

                case "2":
                  switch (props.label) {
                    case "Komputer":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          pc: e.target.value,
                        })
                      );
                      break;

                    case "Tablet":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          tablet: e.target.value,
                        })
                      );
                      break;

                    case "Smarthphone":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          smartPhone: e.target.value,
                        })
                      );
                      break;

                    case "Laptop":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          laptop: e.target.value,
                        })
                      );
                      break;

                    case "Lainnya 1":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          lainnya1Name: e.target.value,
                        })
                      );
                      break;

                    case "Jumlah 1":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          lainnya1Qty: e.target.value,
                        })
                      );
                      break;

                    case "Lainnya 2":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          lainnya2Name: e.target.value,
                        })
                      );
                      break;

                    case "Jumlah 2":
                      dispatch(
                        setAISection2({
                          ...aisection2,
                          lainnya2Qty: e.target.value,
                        })
                      );
                      break;

                    default:
                      dispatch(
                        setAISection2({
                          ...aisection2,
                        })
                      );
                      break;
                  }

                case "3":
                  switch (props.label) {
                    case "Download Speed":
                      dispatch(
                        setAISection3({
                          ...aisection3,
                          download: e.target.value,
                        })
                      );
                      break;
                    case "Upload Speed":
                      dispatch(
                        setAISection3({
                          ...aisection3,
                          upload: e.target.value,
                        })
                      );
                      break;
                    default:
                      break;
                  }
                default:
                  break;
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
    </div>
  );
}

export default DetailInput;
