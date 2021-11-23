import React, { useState } from "react";
import { Label } from "reactstrap";
import Resizer from "react-image-file-resizer";

// import redux
import {
  setSection8,
  setSection11,
  setSection12,
  setSection13,
  setSection14,
  setSection15,
  setSection16,
  setSection17,
  setSection19,
  setSection20,
} from "../../../store/formSurveyStaff/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function DetailList(props) {
  //redux
  const dispatch = useDispatch();
  const section8 = useSelector((state) => state.FormSurveyStaff.section11);
  const section11 = useSelector((state) => state.FormSurveyStaff.section11);
  const section12 = useSelector((state) => state.FormSurveyStaff.section12);
  const section13 = useSelector((state) => state.FormSurveyStaff.section13);
  const section14 = useSelector((state) => state.FormSurveyStaff.section14);
  const section15 = useSelector((state) => state.FormSurveyStaff.section15);
  const section16 = useSelector((state) => state.FormSurveyStaff.section16);
  const section17 = useSelector((state) => state.FormSurveyStaff.section17);
  const section19 = useSelector((state) => state.FormSurveyStaff.section19);
  const section20 = useSelector((state) => state.FormSurveyStaff.section20);

  //states for upload file
  const [docUpload, setDocUpload] = useState();
  const [errorDocFormat, setErrorDocFormat] = useState("");
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
    console.log("handlechange", e.target.files);

    switch (e.target.name) {
      case "doc":
        let fileExtension = e.target.files[0].name.split(".").pop();
        if (
          fileExtension === "jpg" ||
          fileExtension === "png" ||
          fileExtension === "jpeg"
        ) {
          setErrorDocFormat("");
          setDocUpload(e.target.files[0]);
        } else {
          setErrorDocFormat("Format Dokumen harus .jpg / .png");
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
        const image = await resizeFile(file2);
        // await setBase64(image.split(",")[1]);
        const base64 = image.split(",")[1];

        // const file = e.target.files[0];
        // const base64raw = await convertBase64(file);
        // const base64 = base64raw.split(",")[1];
        // ========= dispatch to redux ========
        switch (props.section) {
          case "8":
            switch (props.label) {
              case "Posisi Objek Penghalang Terhadap  Modul Surya (Layout)":
                console.log("belum bikin dispatch untuk ini");
                // dispatch(
                //   setSection8({
                //     ...setSection8,
                //     foto: base64,
                //   })
                // );
                break;
              default:
                break;
            }
            break;
          case "11":
            switch (props.label) {
              case "Upload Foto":
                dispatch(
                  setSection11({
                    ...section11,
                    foto: base64,
                  })
                );
                break;

              default:
                break;
            }
            break;
          case "12":
            switch (props.label) {
              case "Upload Foto Layout Site":
                dispatch(
                  setSection12({
                    ...section12,
                    layoutsite: {
                      ...section12.layoutsite,
                      foto: base64,
                    },
                  })
                );
                console.log("masuk foto section12", base64);
                break;

              default:
                dispatch(
                  setSection12({
                    ...section12,
                  })
                );
                break;
            }
            break;
          case "13":
            switch (props.label) {
              case "Lahan Kandidat":
                dispatch(
                  setSection13({
                    ...section13,
                    gambarlahan: {
                      ...section13.gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Marking GPS (Dalam Desimal)":
                dispatch(
                  setSection13({
                    ...section13,
                    makinggps: {
                      ...section13.makinggps,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Foto Sisi Utara":
                dispatch(
                  setSection13({
                    ...section13,
                    fotosisiutara: {
                      ...section13.fotosisiutara,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Foto Sisi Timur":
                dispatch(
                  setSection13({
                    ...section13,
                    fotosisitimur: {
                      ...section13.fotosisitimur,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Foto Sisi Selatan":
                dispatch(
                  setSection13({
                    ...section13,
                    fotosisiselatan: {
                      ...section13.fotosisiselatan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Foto Sisi Barat":
                dispatch(
                  setSection13({
                    ...section13,
                    fotosisibarat: {
                      ...section13.fotosisibarat,
                      foto: base64,
                    },
                  })
                );
                break;

              default:
                dispatch(
                  setSection13({
                    ...section13,
                  })
                );
                break;
            }
            break;
          // harus di push ke array tp belum. terus ga ada o=key obejct foto
          case "14":
            switch (props.label) {
              case "Informasi Coverage and Obstacle":
                dispatch(
                  setSection14({
                    ...section14,
                    layoutsite: {
                      ...section14.layoutsite,
                      foto: base64,
                    },
                  })
                );
                break;

              default:
                dispatch(
                  setSection14({
                    ...section14,
                  })
                );
                break;
            }
            break;

          case "15":
            switch (props.label) {
              case "Foto Foto Capture G-NETTRACK Jarak 0.5 KM":
                if (
                  section15.photocapturegnettrack05km[0].data.foto.foto === ""
                ) {
                  dispatch(
                    setSection15({
                      ...section15,
                      photocapturegnettrack05km: [
                        {
                          data: {
                            foto: {
                              foto: base64,
                            },
                          },
                        },
                      ],
                    })
                  );
                } else {
                  dispatch(
                    setSection15({
                      ...section15,
                      photocapturegnettrack05km: [
                        ...section15.photocapturegnettrack05km,
                        {
                          data: {
                            foto: {
                              foto: base64,
                            },
                          },
                        },
                      ],
                    })
                  );
                }
                break;

              case "Foto Foto Capture G-NETTRACK Jarak 2 KM":
                if (
                  section15.photocapturegnettrack5km[0].data.foto.foto === ""
                ) {
                  dispatch(
                    setSection15({
                      ...section15,
                      photocapturegnettrack5km: [
                        {
                          data: {
                            foto: {
                              foto: base64,
                            },
                          },
                        },
                      ],
                    })
                  );
                } else {
                  dispatch(
                    setSection15({
                      ...section15,
                      photocapturegnettrack5km: [
                        ...section15.photocapturegnettrack5km,
                        {
                          data: {
                            foto: {
                              foto: base64,
                            },
                          },
                        },
                      ],
                    })
                  );
                }
                break;

              default:
                dispatch(
                  setSection15({
                    ...section15,
                  })
                );
                break;
            }
            break;

          case "16":
            switch (props.label) {
              case "Foto Foto Capture G-NETTRACK  Rute Jalan (+/- 2KM Dari Kandidat Site)":
                if (
                  section16.photocapturegnettrackroadroute[0].data.foto.foto ===
                  ""
                ) {
                  dispatch(
                    setSection16({
                      ...section16,
                      photocapturegnettrackroadroute: [
                        {
                          data: {
                            foto: {
                              foto: base64,
                            },
                          },
                        },
                      ],
                    })
                  );
                } else {
                  dispatch(
                    setSection16({
                      ...section16,
                      photocapturegnettrackroadroute: [
                        ...section16.photocapturegnettrackroadroute,
                        {
                          data: {
                            foto: {
                              foto: base64,
                            },
                          },
                        },
                      ],
                    })
                  );
                }
                break;

              default:
                dispatch(
                  setSection16({
                    ...section16,
                  })
                );
                break;
            }
            break;

          case "17":
            switch (props.label) {
              case "Location Mapping":
                dispatch(
                  setSection17({
                    ...section17,
                    locationmapping: {
                      ...section17.locationmapping,
                      foto: base64,
                    },
                  })
                );
                break;

              default:
                dispatch(
                  setSection17({
                    ...section17,
                  })
                );
                break;
            }
            break;

          case "19":
            switch (props.label) {
              case "Gambar Lahan Sector 0°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector0gambarlahan: {
                      ...section19.sector0gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Gambar Lahan Sector 45°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector45gambarlahan: {
                      ...section19.sector45gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Gambar Lahan Sector 90°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector90gambarlahan: {
                      ...section19.sector90gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Gambar Lahan Sector 135°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector135gambarlahan: {
                      ...section19.sector135gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Gambar Lahan Sector 180°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector180gambarlahan: {
                      ...section19.sector180gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Gambar Lahan Sector 225°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector225gambarlahan: {
                      ...section19.sector225gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Gambar Lahan Sector 270°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector270gambarlahan: {
                      ...section19.sector270gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Gambar Lahan Sector 315°":
                dispatch(
                  setSection19({
                    ...section19,
                    sector315gambarlahan: {
                      ...section19.sector315gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;

              default:
                dispatch(
                  setSection19({
                    ...section19,
                  })
                );
                break;
            }
            break;

          case "20":
            switch (props.label) {
              case "Akses Site 1":
                dispatch(
                  setSection20({
                    ...section20,
                    aksessite1gambarlahan: {
                      ...section20.aksessite1gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Akses Site 2":
                dispatch(
                  setSection20({
                    ...section20,
                    aksessite2gambarlahan: {
                      ...section20.aksessite2gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Akses Site 3":
                dispatch(
                  setSection20({
                    ...section20,
                    aksessite3gambarlahan: {
                      ...section20.aksessite3gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;
              case "Akses Site 4":
                dispatch(
                  setSection20({
                    ...section20,
                    aksessite4gambarlahan: {
                      ...section20.aksessite4gambarlahan,
                      foto: base64,
                    },
                  })
                );
                break;

              default:
                dispatch(
                  setSection20({
                    ...section20,
                  })
                );
                break;
            }
            break;

          default:
            break;
        }
        break;
    }
  };

  return (
    <div className='d-flex flex-column px-0'>
      <div className='form-group'>
        <label className='col-12 px-0'>{props.label}</label>
        {/* ============ upload image ============ */}
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
        {errorDocFormat === "" ? (
          ""
        ) : (
          <Label
            style={{
              color: "red",
              marginLeft: "15px",
              fontSize: "11px",
            }}
          >
            errorDocFormat
          </Label>
        )}
        {props.message ? (
          <p className={`font-weight-normal text-info`}>*{props.message}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DetailList;
