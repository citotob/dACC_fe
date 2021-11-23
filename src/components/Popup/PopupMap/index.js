/**
 * 1. send props of lat long to this component
 * 2. 
 */
import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import styles from "./styles.module.css"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export function MapContainer(props) {
    const {coordinate} = props

  return (
    <>
        <Modal size="lg" isOpen={props.modalMap} toggle={props.toggleMap} centered={true} >
            <ModalBody>
                <div className={styles.map}>
                    <Map
                        google={props.google}
                        zoom={15}
                        style={{width: '120%', height: "auto"}}
                        initialCenter={{ lat: coordinate.latitude, lng: coordinate.longitude}}
                        mapType={"SATELLITE"}
                    >
                    <Marker position={{ lat: coordinate.latitude, lng: coordinate.longitude}} />
                    </Map> 
                </div>               
            </ModalBody>
        </Modal>
    </>    
    );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);

