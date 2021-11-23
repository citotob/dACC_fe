import React, { useState } from "react";
import { Label } from "reactstrap";
import { useLocation } from "react-router";
import Resizer from "react-image-file-resizer";

// import redux
import { setAISection3 } from "../../../store/formSurveyStaffAI/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailList(props) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // == LOCAL STORAGE
  // let strSection3 = "aisection3";
  // let localSection3 = JSON.parse(
  //   window.localStorage.getItem(strSection3.concat(kodeSurvey))
  // );

  //redux
  const dispatch = useDispatch();
  const aisection3 = useSelector((state) => state.FormSurveyStaffAI.aisection3);

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState("");

  const [fileName, setFileName] = useState("");
  // const [base64, setBase64] = useState("");

  // base64
  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // upload file function
  const handleChange = async (e) => {
    setFileName(e?.target?.files[0]?.name);

    switch (e?.target?.name) {
      case "doc":
        let fileExtension = e?.target?.files[0]?.name?.split(".").pop();
        if (
          fileExtension === "jpg" ||
          fileExtension === "png" ||
          fileExtension === "jpeg"
        ) {
          setErrorDocFormat("");
          setDocUpload(e.target.files[0]);
          switch (props.label) {
            case "Akses Jalan Menuju Ke Lokasi":
              props.toggleErrorAkses(false);
              break;
            case "Plang":
              props.toggleErrorPlang(false);
              break;
            case "Marking Posisi Perangkat":
              props.toggleErrorMarking(false);
              break;
            case "KWH Meter PLN/Genset":
              props.toggleErrorPLN(false);
              break;
            case "Gambar Denah Lokasi / Lanskap Bangunan":
              props.toggleErrorDenah(false);
              break;
            case "Berita Acara":
              props.toggleErrorLanskap(false);
              break;
            default:
              break;
          }
        } else {
          setErrorDocFormat("Format Dokumen harus .jpg / .png");
          switch (props.label) {
            case "Akses Jalan Menuju Ke Lokasi":
              props.toggleErrorAkses(true);
              break;
            case "Plang":
              props.toggleErrorPlang(true);
              break;
            case "Marking Posisi Perangkat":
              props.toggleErrorMarking(true);
              break;
            case "KWH Meter PLN/Genset":
              props.toggleErrorPLN(true);
              break;
            case "Gambar Denah Lokasi / Lanskap Bangunan":
              props.toggleErrorDenah(true);
              break;
            case "Berita Acara":
              props.toggleErrorLanskap(true);
              break;
            default:
              break;
          }
          setDocUpload("");
        }

        const resizeFile = (file) =>
          new Promise((resolve) => {
            Resizer.imageFileResizer(
              file,
              300,
              300,
              "JPEG",
              100,
              0,
              (uri) => {
                resolve(uri);
              },
              "base64"
            );
          });

        const file2 = e.target.files[0];
        const image = await resizeFile(file2)
          .then((image) => {
            const base64 = image;
            console.log("ubah ke base64 berhasil");
            console.log(base64);

            // await setBase64(image.split(",")[1]);
            // const base64 = image.split(",")[1];

            // const file = e.target.files[0];
            // const base64raw = await convertBase64(file);
            // const base64 = base64raw.split(",")[1];

            // ========= dispatch to redux ========
            switch (props.section) {
              case "3":
                switch (props.label) {
                  case "Akses Jalan Menuju Ke Lokasi":
                    dispatch(
                      setAISection3({
                        ...aisection3,
                        fileAkses: base64,
                      })
                    );

                    break;
                  case "Plang":
                    dispatch(
                      setAISection3({
                        ...aisection3,
                        filePlang: base64,
                      })
                    );
                    break;
                  case "Marking Posisi Perangkat":
                    dispatch(
                      setAISection3({
                        ...aisection3,
                        fileMarking: base64,
                      })
                    );
                    break;
                  case "KWH Meter PLN/Genset":
                    dispatch(
                      setAISection3({
                        ...aisection3,
                        filePln: base64,
                      })
                    );
                    break;
                  case "Gambar Denah Lokasi / Lanskap Bangunan":
                    dispatch(
                      setAISection3({
                        ...aisection3,
                        fileDenah: base64,
                      })
                    );
                    break;
                  case "Berita Acara":
                    dispatch(
                      setAISection3({
                        ...aisection3,
                        fileLanskap: base64,
                      })
                    );
                    break;

                  default:
                    break;
                }
                break;

              default:
                break;
            }
          })
          .catch((err) => console.log("ubah ke base64 gagal", err));

        break;
    }
  };

  const showImageName = () => {
    switch (props.section) {
      case "3":
        switch (props.label) {
          case "Akses Jalan Menuju Ke Lokasi":
            return aisection3.fileAkses !== "" ? (
              <p>
                <i class='bx bx-check'></i>File Uploaded
              </p>
            ) : (
              <></>
            );

            break;
          case "Plang":
            return aisection3.filePlang !== "" ? (
              <p>
                <i class='bx bx-check'></i>File Uploaded
              </p>
            ) : (
              <></>
            );

            break;
          case "Marking Posisi Perangkat":
            return aisection3.fileMarking !== "" ? (
              <p>
                <i class='bx bx-check'></i>File Uploaded
              </p>
            ) : (
              <></>
            );

            break;
          case "KWH Meter PLN/Genset":
            return aisection3.filePln !== "" ? (
              <p>
                <i class='bx bx-check'></i>File Uploaded
              </p>
            ) : (
              <></>
            );

            break;
          case "Gambar Denah Lokasi / Lanskap Bangunan":
            return aisection3.fileDenah !== "" ? (
              <p>
                <i class='bx bx-check'></i>File Uploaded
              </p>
            ) : (
              <></>
            );

            break;
          case "Berita Acara":
            return aisection3.fileLanskap !== "" ? (
              <p>
                <i class='bx bx-check'></i>File Uploaded
              </p>
            ) : (
              <></>
            );

            break;

          default:
            break;
        }
        break;

      default:
        return <></>;
        break;
    }
  };
  return (
    <div className='d-flex flex-column px-0'>
      <div className='form-group'>
        <label className='px-0'>{props.label}</label>
        {props.required && props.required === true ? (
          <span style={{ color: "red", fontWeight: "bold" }}> * </span>
        ) : (
          <></>
        )}
        {/* ============ upload image ============ */}
        <Label
          style={{
            color: "red",
            marginLeft: "15px",
            fontSize: "11px",
          }}
        >
          {errorDocFormat === "" ? "" : errorDocFormat}
        </Label>
        <input
          type='file'
          className='form-control'
          name={"doc"}
          onChange={(e) => handleChange(e)}
          className='form-control'
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            height: "43px",
          }}
          accept='image/*'
        />
        {showImageName()}
      </div>
    </div>
  );
}

export default DetailList;
