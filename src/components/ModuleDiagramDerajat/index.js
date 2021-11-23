import React, { useEffect, useState } from 'react';

// import components
import PopupImage from '../../components/PopupImage';
import TablePotensi from './TablePotensi';
import TablePanoramic from './TablePanoramic';

function Index() {
  const [layer, setLayer] = useState('1');
  const [array, setArray] = useState([]);

  // untuk data layer 1
  let data = {
    photo0: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance0: '100',
    photo45: require('../../assets/images/fotoDerajat/img2.jpg'),
    distance45: '200',
    photo90: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance90: '300',
    photo135: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance135: '400',
    photo180: require('../../assets/images/fotoDerajat/img2.jpg'),
    distance180: '500',
    photo225: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance225: '100',
    photo270: require('../../assets/images/fotoDerajat/img2.jpg'),
    distance270: '200',
    photo315: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance315: '300',
  };

  // untuk data layer 2
  let data2 = {
    photo45: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance45: '100',
    photo90: require('../../assets/images/fotoDerajat/img2.jpg'),
    distance90: '200',
    photo135: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance135: '300',
    photo180: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance180: '400',
    photo225: require('../../assets/images/fotoDerajat/img2.jpg'),
    distance225: '500',
    photo270: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance270: '100',
    photo315: require('../../assets/images/fotoDerajat/img2.jpg'),
    distance315: '200',
    photo0: require('../../assets/images/fotoDerajat/img1.jpg'),
    distance0: '300',
  };

  useEffect(() => {
    if (layer == '1') {
      setArray([
        { degree: 0, photo: data.photo0, distance: data.distance0 },
        { degree: 45, photo: data.photo45, distance: data.distance45 },
        { degree: 90, photo: data.photo90, distance: data.distance90 },
        { degree: 135, photo: data.photo135, distance: data.distance135 },
        { degree: 180, photo: data.photo180, distance: data.distance180 },
        { degree: 225, photo: data.photo225, distance: data.distance225 },
        { degree: 270, photo: data.photo270, distance: data.distance270 },
        { degree: 315, photo: data.photo315, distance: data.distance315 },
      ]);
    } else if (layer == '2') {
      setArray([
        { degree: 0, photo: data2.photo0, distance: data2.distance0 },
        { degree: 45, photo: data2.photo45, distance: data2.distance45 },
        { degree: 90, photo: data2.photo90, distance: data2.distance90 },
        { degree: 135, photo: data2.photo135, distance: data2.distance135 },
        { degree: 180, photo: data2.photo180, distance: data2.distance180 },
        { degree: 225, photo: data2.photo225, distance: data2.distance225 },
        { degree: 270, photo: data2.photo270, distance: data2.distance270 },
        { degree: 315, photo: data2.photo315, distance: data2.distance315 },
      ]);
    }
  }, [layer]);

  // Styling objects
  const stylingContainer = {
    // backgroundColor: "purple",
    width: '80%',
    aspectRatio: '1/1',
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    position: 'relative',
  };
  const stylingDiagram = {
    // backgroundColor: "green",
    width: '100%',
    position: 'absolute',
  };
  const stylingBox = {
    // backgroundColor: "salmon",
    width: '9%',
    height: '9%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '50',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  const stylingImg = {
    // backgroundColor: "lightyellow",
    // border: "1px solid black",
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: '305',
  };

  // Math Logic
  function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  // Photo component
  const Fotolokasi = (props) => {
    const [image, setImage] = useState('');
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    return (
      <>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
        />
        <span
          className=""
          style={{
            cursor: 'pointer',
          }}
        >
          <img
            src={props.url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt="image"
            onClick={() => {
              toggleImage(props.url);
            }}
          />
        </span>
      </>
    );
  };

  const FotoMappingItem = ({ transform, photo }) => {
    return (
      <div style={stylingBox}>
        <div
          style={{
            ...stylingImg,
            transform: transform,
          }}
        >
          <Fotolokasi url={photo} />
        </div>
      </div>
    );
  };
  return (
    <>
      <div style={stylingContainer}>
        {array.map((item, i) => {
          // hitungan untuk cari tau dimana posisi titik nya
          // minus 90 derajat karena posisi 0 derajat di diagram beda dengan posisi 0 radian
          var x =
            Math.cos(degrees_to_radians(item.degree - 90)) * item.distance;
          var y =
            Math.sin(degrees_to_radians(item.degree - 90)) * item.distance;
          return (
            <FotoMappingItem
              transform={`translate(${x}%, ${y}%)`}
              photo={item.photo}
            />
          );
        })}
        <img
          src={require('../../assets/images/fotoDerajat/diagramSquare.svg')}
          style={stylingDiagram}
        />
      </div>
      {/* ====== pilih layer */}
      <button
        onClick={() => {
          setLayer('1');
        }}
      >
        Potensial
      </button>
      <button
        onClick={() => {
          setLayer('2');
        }}
      >
        Panoramic Area
      </button>
      {layer === '1' && <TablePotensi />}
      {layer === '2' && <TablePanoramic />}
    </>
  );
}

export default Index;
