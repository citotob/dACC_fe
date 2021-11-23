import React from 'react'
import './style.css'
import BannerSample from '../../../assets/img/BannerSample.jpg'
import { Modal, ModalBody, Button, Col, Row, ModalFooter, Spinner } from 'reactstrap';

const PopupContent = (props) => {
    const btnNews = ()=> window.open(props.dataPreview.link !== null? props.dataPreview.link : props.data.link);    
    return (
        <Modal size="lg" centered={true} isOpen={props.modalKontenTayang} toggle={props.toggle}>
            <ModalBody>
                <Row>
                    {
                        typeof props.dataPreview == "undefined" ?
                            <Row className="justify-content-md-center">
                                <Spinner color="primary">
                                    Loading...
                                </Spinner>
                            </Row>

                            :

                            <Col xs="12">
                                <h4 className="title-popup-konten">PREVIEW KONTEN</h4>
                                <hr/>
                                <p className="title-popup-konten">Provinsi : </p>
                                <p>{typeof props.dataPreview.approved_provinsi === "undefined" ? '' : props.dataPreview.approved_provinsi }</p>
                                <p>{props.data == null ? '' : props.data.approved_provinsi }</p>
                                <p className="title-popup-konten">Judul Konten : </p>
                                <p>{props.dataPreview.title == null?  '-' : props.dataPreview.title }</p>
                                <hr/>
                                <p className="title-popup-konten">Preview</p>
                                <div className="preview-content">
                                {
                                    (()=>{
                                        if(typeof props.dataPreview.url !== "undefined"){
                                            return <iframe width="460" height="345" src={`https://www.youtube.com/embed/${props.dataPreview.url}`}></iframe>
                                        }
                                        else if(typeof props.dataPreview.details !== "undefined"){
                                            return <img className="img-banner" src={`https://baktionline.baktikominfo.id/${props.dataPreview.details}`} alt=""></img>
                                        }
                                        else if(typeof props.dataPreview.link !== "undefined"){
                                            return(
                                                <Col xs="12">
                                                    <p>{props.dataPreview.sinopsis}</p>
                                                    <Button color="primary" onClick={btnNews.bind(this)}>Baca Selengkapnya</Button>
                                                </Col>
                                            )
                                        }
                                    })()
                                }
                                </div>
                            </Col>
                    }
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => props.toggle()}>Tutup</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PopupContent