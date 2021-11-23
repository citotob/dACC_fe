import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardSubtitle } from "reactstrap";

//Lightbox
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "react-modal-video/scss/modal-video.scss";

// import image
// import img1 from "../../assets/images/small/img-1.jpg";
// import img2 from "../../assets/images/small/img-2.jpg";
// import img3 from "../../assets/images/small/img-3.jpg";
// import img4 from "../../assets/images/small/img-4.jpg";
// import img5 from "../../assets/images/small/img-5.jpg";
// import img6 from "../../assets/images/small/img-6.jpg";
// import img7 from "../../assets/images/small/img-7.jpg";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

import { url } from "../../services/Config";

const UiLightbox = (props) => {
  let imageCaption = props.imageCaption ? props.imageCaption : "";
  const images = props.image ? props.image : "";
  const [photoIndex, setphotoIndex] = useState(0);
  const [isFits, setisFits] = useState(false);
  const [isEffects, setisEffects] = useState(false);
  const [isGallery, setisGallery] = useState(false);
  const [isGalleryZoom, setisGalleryZoom] = useState(false);
  // const [isOpen, setisOpen] = useState(false);
  // const [isOpen1, setisOpen1] = useState(false);
  // const [modal, setmodal] = useState(false);

  console.log("aku image", images);
  console.log("photoIndex ", photoIndex);
  console.log("aku array apa bukan ", Array.isArray(images));

  return (
    <React.Fragment>
      {isFits ? (
        <Lightbox
          mainSrc={images[photoIndex]}
          enableZoom={false}
          imageCaption={imageCaption}
          onCloseRequest={() => {
            setisFits(!isFits);
          }}
        />
      ) : null}

      {isEffects ? (
        <Lightbox
          mainSrc={images[photoIndex]}
          enableZoom={false}
          onCloseRequest={() => {
            setisEffects(!isEffects);
          }}
        />
      ) : null}

      {isGallery && Array.isArray(images) ? (
        <Lightbox
          mainSrc={`${url}${images[photoIndex]?.path}`}
          nextSrc={`${url}${images[(photoIndex + 1) % images.length]?.path}`}
          prevSrc={`${url}${
            images[(photoIndex + images.length - 1) % images.length]?.path
          }`}
          enableZoom={true}
          onCloseRequest={() => {
            setisGallery(false);
          }}
          onMovePrevRequest={() => {
            setphotoIndex((photoIndex + images.length - 1) % images.length);
          }}
          onMoveNextRequest={() => {
            setphotoIndex((photoIndex + 1) % images.length);
          }}
          imageCaption={imageCaption}
        />
      ) : (
        // <Lightbox
        //   mainSrc={`${url}${images?.path}`}
        //   nextSrc={`${url}${images[(photoIndex + 1) % images.length]?.path}`}
        //   prevSrc={`${url}${
        //     images[(photoIndex + images.length - 1) % images.length]?.path
        //   }`}
        //   enableZoom={true}
        //   onCloseRequest={() => {
        //     setisGallery(false);
        //   }}
        //   onMovePrevRequest={() => {
        //     setphotoIndex((photoIndex + images.length - 1) % images.length);
        //   }}
        //   onMoveNextRequest={() => {
        //     setphotoIndex((photoIndex + 1) % images.length);
        //   }}
        //   imageCaption={imageCaption}
        // />
        ""
      )}

      {isGalleryZoom ? (
        <Lightbox
          mainSrc={`${url}/media/survey/foto/newbts/d56932ac-944125448f9-4cb.jpg`}
          nextSrc={`${url}${images[(photoIndex + 1) % images.length]}`}
          prevSrc={`${url}${
            images[(photoIndex + images.length - 1) % images.length]
          }`}
          onCloseRequest={() => {
            setisGalleryZoom(false);
          }}
          onMovePrevRequest={() => {
            setphotoIndex((photoIndex + images.length - 1) % images.length);
          }}
          onMoveNextRequest={() => {
            setphotoIndex((photoIndex + 1) % images.length);
          }}
        />
      ) : null}

      <Row>
        <div className='page-content' style={{ zIndex: "1000" }}>
          <Col lg={12}>
            <Card>
              <CardBody>
                {Array.isArray(images) ? (
                  images.map((item, i) => {
                    return (
                      <div className='zoom-gallery'>
                        <img
                          key={i}
                          src={`${url}${item.path}`}
                          className='float-left'
                          onClick={() => {
                            setisGallery(true);
                            setphotoIndex(0);
                          }}
                          alt={imageCaption}
                          width='275'
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className='zoom-gallery'>
                    <img
                      src={`${url}${images?.path}`}
                      className='float-left'
                      onClick={() => {
                        setisGallery(true);
                        setphotoIndex(0);
                      }}
                      alt={imageCaption}
                      width='275'
                    />
                  </div>
                )}
                <CardSubtitle className='mb-3'>{imageCaption}</CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default UiLightbox;
