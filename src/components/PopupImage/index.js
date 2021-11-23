import React from "react";
import styles from "./styles.module.css";
import { Modal, ModalBody } from "reactstrap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// import assets
import zoomInIcon from "../../assets/icons/zoomIn.svg";
import zoomOutIcon from "../../assets/icons/zoomOut.svg";
import zoomResetIcon from "../../assets/icons/zoomReset.svg";

const PopupImage = (props) => {
  let stylingGPS = {
    position: "absolute",
    left: "24px",
    color: "white",
    zIndex: 200,
  };
  return (
    <>
      <Modal
        size='lg'
        // contentClassName={`${styles.customModalStyle}`}
        isOpen={props.modalImage}
        toggle={props.toggleImage}
        centered={true}
      >
        <ModalBody>
          <TransformWrapper>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div className='position-relative w-100'>
                  {/* ================== ZOOM IN OUT TOOLBOX ================== */}
                  <div
                    className='tools position-absolute p-1 rounded'
                    style={{
                      zIndex: "100",
                      right: "10px",
                      top: "10px",
                      backgroundColor: "rgba(0,0,0, 0.3)",
                    }}
                  >
                    {/* ================== ZOOM IN ICON ================== */}
                    <button onClick={() => zoomIn()}>
                      <img src={zoomInIcon} alt='zoom in' />
                    </button>
                    {/* ================== ZOOM OUT ICON ================== */}
                    <button onClick={() => zoomOut()}>
                      <img src={zoomOutIcon} alt='zoom out' />
                    </button>
                    {/* ================== CLOSE ICON ================== */}
                    <button onClick={() => resetTransform()}>
                      <img src={zoomResetIcon} alt='reset zoom' />
                    </button>
                  </div>

                  <TransformComponent>
                    <img src={props.image} className={styles.image} alt='' />
                  </TransformComponent>

                  <span style={{ ...stylingGPS, bottom: "46px" }}>
                    {props.kode ?? "-"}
                  </span>
                  <span style={{ ...stylingGPS, bottom: "30px" }}>
                    LAT: {props.lat ?? "-"}
                  </span>
                  <span style={{ ...stylingGPS, bottom: "14px" }}>
                    LONG: {props.long ?? "-"}
                  </span>
                </div>
              </>
            )}
          </TransformWrapper>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PopupImage;
