import React, { useState } from 'react';
import { Modal } from 'reactstrap';

//import API
import { url } from '../../../services/Config';

import PopupImage from '../../PopupImage';
import CardMap from './CardMap';
// import icons
import mapIcon from '../../../assets/icons/map-icon.svg';
import style from './style.module.scss';

function ImageList(props) {
  const imageStyle = {
    width: '300px',
    marginBottom: '8px',
  };

  //Popup Image State
  const [image, setImage] = useState('');
  const [modalImage, setModalImage] = useState(false);
  const [modalMapOpen, setmodalMap] = useState(false);

  const [selectedLokasi, setselectedLokasi] = useState('');
  const [selectedLat, setselectedLat] = useState('');
  const [selectedLong, setselectedLong] = useState('');
  let toggleImage = (img) => {
    setImage(img);
    setModalImage(!modalImage);
  };

  function tog_map() {
    setmodalMap(!modalMapOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add('no_padding');
  }

  const modalComponentMap = () => {
    return (
      <Modal
        isOpen={modalMapOpen}
        size="lg"
        centered={true}
        toggle={() => {
          tog_map();
        }}
      >
        {/* <div className={`modal-body ${style.modalBody}`}> */}
        <div className="m-4 pb-4">
          <CardMap
            lat={selectedLat}
            long={selectedLong}
            namaLokasi={selectedLokasi}
          />
        </div>
      </Modal>
    );
  };

  const Location = ({ item, device_lat, device_lon, deskripsi }) => {
    return null;
    //   <>
    //     {modalComponentMap()}
    //     <div className='d-flex flex-row mr-2'>
    //       {props.nettrack ? (
    //         <>
    //           <div className='d-flex flex-column'>
    //             <small>
    //               Latitude :{' '}
    //               {props.nettrack ? item.data.foto.device_lat : item.device_lat}
    //             </small>
    //             <small>
    //               Longitude :{' '}
    //               {props.nettrack ? item.data.foto.device_lon : item.device_lon}
    //             </small>
    //             <small>
    //               Deskripsi :{' '}
    //               {props.nettrack ? item.data.foto.deskripsi : item.deskripsi}
    //             </small>
    //           </div>
    //         </>
    //       ) : (
    //         <>
    //           <div className='d-flex flex-column mr-2'>
    //             <small>Latitude : {props.value.device_lat}</small>
    //             <small>Longitude : {props.value.device_lon}</small>
    //             <small>Deskripsi : {props.value.deskripsi}</small>
    //           </div>
    //         </>
    //       )}
    //       <button
    //         onClick={() => {
    //           tog_map();
    //           setselectedLokasi('');
    //           setselectedLat(
    //             props.nettrack
    //               ? item.data.foto.device_lat
    //               : props.value.device_lat
    //           );
    //           setselectedLong(
    //             props.nettrack
    //               ? item.data.foto.device_lon
    //               : props.value.device_lon
    //           );
    //         }}
    //         // className={`${style.mapButton}`}
    //         style={{ transform: 'translateY(-8px)' }}
    //       >
    //         <svg
    //           width='20'
    //           height='20'
    //           viewBox='0 0 37 37'
    //           fill='none'
    //           xmlns='http://www.w3.org/2000/svg'
    //         >
    //           <rect width='37' height='37' rx='2' fill='#406D96' />
    //           <path
    //             d='M15.4171 13.2398L8.22266 9.64258V23.2462L15.4171 26.8435L21.5838 23.7601L28.7782 27.3574V13.7537L21.5838 10.1565L15.4171 13.2398ZM21.5838 21.5833L15.4171 24.6666V15.4166L21.5838 12.3333V21.5833Z'
    //             fill='white'
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //   </>
  };

  let src2 = `${url}${props.value.path}`;
  return (
    <div className="d-flex flex-row mb-2 px-0">
      <PopupImage
        image={image}
        modalImage={modalImage}
        toggleImage={toggleImage}
      />

      <span className="col-5 pl-0">{props.label}</span>
      {/* <span className='col-8'>: {`${props.value}`}</span> */}
      <div className="col-7 d-flex flex-column gap16 px-0">
        {Array.isArray(props.value) ? (
          props.value.map((item, i) => {
            let source = props.nettrack
              ? `${url}${item.data.foto.path}`
              : `${url}${item.path}`;

            return (
              <div key={i} className={`d-flex flex-column`}>
                <img
                  src={source}
                  alt="Image"
                  style={imageStyle}
                  onClick={() => toggleImage(source)}
                />
                {props.nettrack && (
                  <>
                    {/* <small>
                      Sector :{" "}
                      {props.nettrack ? item.data.sector : item.device_lat}
                    </small> */}
                    {props.section === '16' && (
                      <small>Operator : {`sampleData`}</small>
                    )}
                    {/* <small>
                      Jarak :{" "}
                      {props.nettrack ? item.data.jarak : item.device_lat}
                    </small> */}
                  </>
                )}
                <Location item={item} />
              </div>
            );
          })
        ) : (
          <div className={`d-flex flex-column `}>
            <img
              src={src2}
              alt="Image"
              style={imageStyle}
              onClick={() => toggleImage(src2)}
            />
            <Location
              device_lat={props.value.device_lat}
              device_lon={props.value.device_lon}
              desc={props.value.deskripsi}
            />
            {/* <small>Latitude : {props.value.device_lat}</small>
            <small>Longitude : {props.value.device_lon}</small>
            <small>Deskripsi : {props.value.deskripsi}</small> */}
          </div>
        )}
      </div>
      {/* <img src="" alt="" srcset="" /> */}
    </div>
  );
}

export default ImageList;
