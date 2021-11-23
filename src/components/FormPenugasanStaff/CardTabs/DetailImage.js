import React, { useState } from "react";
import { Label } from "reactstrap";
import Resizer from "react-image-file-resizer";

// import redux
import { setBtsMain } from "../../../store/formSurveyStaff/action";
import { useDispatch, useSelector } from "react-redux";

// import components
import PopupImage from "../../PopupImage";

function DetailList(props) {
  let stylingOverlayText = {
    position: "absolute",
    left: "24px",
    color: "white",
    zIndex: 200,
  };

  //redux
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

  const [errorDocFormat, setErrorDocFormat] = useState("");
  const [encodedFilePDF, setEncodedFilePDF] = useState("");
  const [encodedFileKMLKMZ, setEncodedFileKMLKMZ] = useState("");
  const [tipeFile, setTipeFile] = useState("");

  // Key Label
  let keyLabel = props.label
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();

  // Photo component
  const Fotolokasi = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          kode={"asdfasdfasdf"}
          lat={props.lat}
          long={props.long}
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <span className='col-8 d-flex flex-column align-items-start'>
          <img
            src={props.url}
            style={{ cursor: "pointer", width: "300px" }}
            alt='image'
            onClick={() => {
              toggleImage(props.url);
            }}
          />
          <span style={{ ...stylingOverlayText, bottom: "44px" }}>
            {props.kode ?? "-"}
          </span>
          <span style={{ ...stylingOverlayText, bottom: "28px" }}>
            LAT: {props.lat ?? "-"}
          </span>
          <span style={{ ...stylingOverlayText, bottom: "12px" }}>
            LONG: {props.long ?? "-"}
          </span>
        </span>
      </>
    );
  };

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
          setTipeFile("image");
          setErrorDocFormat("");
          // setDocUpload(e.target.files[0]);
        } else {
          setErrorDocFormat("Format Dokumen harus .jpg / .png");
          // setDocUpload("");
        }

        const resizeFile = (file) =>
          new Promise((resolve) => {
            Resizer.imageFileResizer(
              file,
              800,
              800,
              "JPEG",
              100,
              0,
              (uri) => {
                resolve(uri);
              },
              "base64"
            );
          });

        const targetFile = e.target.files[0];
        const image = await resizeFile(targetFile);
        const base64 = image.split(",")[1];
        console.log("base64", base64);
        // ========= dispatch to redux ========
        dispatch(
          setBtsMain({
            ...btsMain,
            ["section" + props.section]: {
              ...eval("btsMain?.section" + props.section),
              [keyLabel]: {
                base64: base64,
                extension_file: fileExtension,
              },
            },
          })
        );

        break;
      case "jpgpdf":
        let fileExtension2 = e.target.files[0].name.split(".").pop();
        if (
          fileExtension2 === "jpg" ||
          fileExtension2 === "png" ||
          fileExtension2 === "jpeg"
        ) {
          setTipeFile("image");
          setErrorDocFormat("");
          console.log("detect image");
          const resizeFile = (file) =>
            new Promise((resolve) => {
              Resizer.imageFileResizer(
                file,
                600,
                600,
                "JPEG",
                100,
                0,
                (uri) => {
                  resolve(uri);
                },
                "base64"
              );
            });

          const targetFile = e.target.files[0];
          const image = await resizeFile(targetFile);
          const base64 = image.split(",")[1];
          console.log("base64", base64);
          // ========= dispatch to redux ========
          dispatch(
            setBtsMain({
              ...btsMain,
              ["section" + props.section]: {
                ...eval("btsMain?.section" + props.section),
                [keyLabel]: {
                  base64: base64,
                  extension_file: fileExtension2,
                },
              },
            })
          );
        } else if (fileExtension2 === "pdf") {
          setTipeFile("pdf");
          setErrorDocFormat("");
          console.log("detect pdf file");

          const encodeFileBase64 = (file) => {
            let reader = new FileReader();
            if (file) {
              reader.readAsDataURL(file);
              reader.onload = () => {
                let encodedbase64 = reader.result;
                const base64 = encodedbase64.split(",")[1];
                console.log("base64 clean", base64);

                // ========= dispatch to redux ========
                dispatch(
                  setBtsMain({
                    ...btsMain,
                    ["section" + props.section]: {
                      ...eval("btsMain?.section" + props.section),
                      [keyLabel]: {
                        base64: base64,
                        extension_file: fileExtension2,
                      },
                    },
                  })
                );
              };
              reader.onerror = (err) => {
                console.log("pdf convert to base 64 error", err);
              };
            }
          };

          encodeFileBase64(e.target.files[0]);
        } else {
          setErrorDocFormat("Format Dokumen harus .jpg / .pdf");
          console.log("file not detected");
        }

        break;
      case "kmlkmz":
        let fileExtension3 = e.target.files[0].name.split(".").pop();
        if (fileExtension3 == "kml" || fileExtension3 == "kmz") {
          setTipeFile("kml");
          setErrorDocFormat("");
          console.log("bener ini kml");

          const encodeFileBase64 = (file) => {
            let reader = new FileReader();
            if (file) {
              reader.readAsDataURL(file);
              reader.onload = () => {
                let encodedbase64 = reader.result;
                const base64 = encodedbase64.split(",")[1];
                console.log("base64 full", encodedbase64);
                console.log("base64 clean", base64);

                // ========= dispatch to redux ========
                dispatch(
                  setBtsMain({
                    ...btsMain,
                    ["section" + props.section]: {
                      ...eval("btsMain?.section" + props.section),
                      [keyLabel]: {
                        base64: base64,
                        extension_file: fileExtension3,
                      },
                    },
                  })
                );
              };
              reader.onerror = (err) => {
                console.log("pdf convert to base 64 error", err);
              };
            }
          };

          encodeFileBase64(e.target.files[0]);
        } else {
          setErrorDocFormat("File Harus .kml / .kmz");
          console.log("bukan kml");
        }

        break;

      default:
        break;
    }
  };

  return (
    <div className='d-flex flex-column px-0'>
      <div className='form-group mb-2'>
        <label className='col-12 px-0'>{props.label}</label>
        {/* ============ upload image ============ */}
        <div className='form-control d-flex flex-row justify-space-between align-items-center w-100'>
          <input
            type='file'
            name={props.name ?? "doc"}
            // onChange={(e) => handleChange(e)}
            onChange={(e) => {
              if (e.target.value) {
                handleChange(e);
              } else {
                console.log("tidak ada file");
                dispatch(
                  setBtsMain({
                    ...btsMain,
                    ["section" + props.section]: {
                      ...eval("btsMain?.section" + props.section),
                      [keyLabel]: {
                        base64: "",
                        extension_file: "",
                      },
                    },
                  })
                );
              }
            }}
            style={{
              width: props.inputWidth ?? "80%",
              border: "none",
              outline: "none",
            }}
            accept={
              props.name === "jpgpdf"
                ? "image/*, .pdf"
                : props.name === "kmlkmz"
                ? ".kml, .kmz"
                : "image/*"
            }
          />
          <div className='d-flex flex-row flex-grow-1 align-items-center'>
            {eval(
              "btsMain?.section" + props.section + "?." + keyLabel?.base64
            ) !== "" &&
            eval(
              "btsMain?.section" + props.section + "?." + keyLabel?.base64
            ) !== undefined ? (
              <p
                className={`mb-0 p-0 ml-auto font-weight-normal text-success text-right`}
              >
                File Tersimpan
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

        {props.name !== "kmlkmz" &&
        props.section !== "10" &&
        eval("btsMain?.section" + props.section + "?." + keyLabel?.base64) !==
          undefined &&
        eval("btsMain?.section" + props.section + "?." + keyLabel?.base64) !==
          "" ? (
          <div className='d-flex flex-row mt-3'>
            <Fotolokasi
              kode={props.kode}
              lat={props.lat}
              long={props.long}
              className='col-8'
              url={
                "data:image/jpeg;base64," +
                eval(
                  "btsMain?.section" + props.section + "?." + keyLabel?.base64
                )
              }
            />
          </div>
        ) : (
          <></>
        )}

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
            {errorDocFormat}
          </Label>
        )}

        {props.message ? (
          <p className={`font-weight-normal text-info`}>*{props.message}</p>
        ) : (
          <></>
        )}
      </div>

      <div className='mb-2'>
        {props.asterisk ? (
          <p className={`font-weight-normal text-info`}>* {props.asterisk}</p>
        ) : (
          <></>
        )}
        {props.asterisk2 ? (
          <p className={`font-weight-normal text-info`}>* {props.asterisk2}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default DetailList;
