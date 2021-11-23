import React, { useState } from 'react';

import { Button, CardBody, CardTitle } from 'reactstrap';

//Import Component
import PopupImage from '../PopupImage';

function Index(props) {
  const [image, setImage] = useState('');
  const [modalImage, setModalImage] = useState(false);
  let toggleImage = (img) => {
    setImage(img);
    setModalImage(!modalImage);
  };
  // let source = `${process.env.REACT_APP_BE_URL}${props.url}`;
  let source = `${props.url}`;

  let stylingOverlayText = {
    position: 'absolute',
    left: '24px',
    color: 'white',
    zIndex: 200,
  };

  return (
    <div className="d-flex flex-column col-6 text-center">
      <span>{props.title}</span>
      <span>
        <PopupImage
          image={image}
          modalImage={modalImage}
          toggleImage={toggleImage}
          kode={props.kode}
          lat={props.lat}
          long={props.long}
        />
        <Button
          color=""
          onClick={() => toggleImage(source)}
          style={{
            position: 'relative',
          }}
        >
          <img style={{ width: '354px' }} src={source}></img>
          <span style={{ ...stylingOverlayText, bottom: '44px' }}>
            {props.kode}
          </span>
          <span style={{ ...stylingOverlayText, bottom: '28px' }}>
            LAT: {props.lat}
          </span>
          <span style={{ ...stylingOverlayText, bottom: '12px' }}>
            LONG: {props.long}
          </span>
        </Button>
      </span>
    </div>
  );
}

export default Index;
