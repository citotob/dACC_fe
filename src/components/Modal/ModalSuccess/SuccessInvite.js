import React from "react";

import { Modal, ModalBody, Button, Row } from "reactstrap";
import styles from "./styles.module.css";
import { MDBModalHeader } from "mdbreact";
import IconGreenCheckList from "../../../assets/images/IconGreenChecklist.svg"
// "../assets/images/IconGreenChecklist.svg"

function SuccessInvite(props) {
	return (
		<>
			<Modal
				size="md"
				isOpen={props.modalSuccess}
				toggle={props.toggleSuccess}
				centered={true}
			>
				<MDBModalHeader style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
					<div>Berhasil</div>
				</MDBModalHeader>
				<ModalBody>
					<center className="container-popup">
						<div>
							<img src={IconGreenCheckList}/>
						</div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:'10px', paddingTop:'10px'}}>
                            <h5>Undangan Telah Dikirim</h5>
                        </div>
						<Button
							color=""
							className={styles.btn_close}
							onClick={props.toggleSuccess}
						>
							Tutup
						</Button>
					</center>
				</ModalBody>
			</Modal>
		</>
	);
}

export default SuccessInvite;
