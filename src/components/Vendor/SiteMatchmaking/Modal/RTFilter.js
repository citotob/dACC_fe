import React, { useState, useEffect } from "react";
import {
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from "mdbreact";
import styles from "./style.module.css";
import "./style.css";
import DropdownArrow from "../../../../assets/images/DropdownArrow.svg";

function RTFilter(props) {
	const { filter, clicked } = props;
	const filterContain = [
		{
			id: "5f76db81f845e6b39081e278",
			jarak_odp: 10,
			teknologi: "FO",
		},
		{
			id: "5f76db81f845e6b39081e273",
			jarak_odp: 100,
			teknologi: "RL",
		},
		{
			id: "5f76db81f845e6b39081e272",
			jarak_odp: 1000,
			teknologi: "VSAT_GS_SEWA_JASA",
		},
		{
			id: "5f76db81f845e6b39081e274",
			jarak_odp: 1000,
			teknologi: "VSAT_GS_BELANJA_MODAL",
		},
	];

	// async function fetchAPIProvinsi() {
	// 	const response = dummy;
	// 	const json = await response.data;
	// 	// get Rows
	// 	let rowsData = [];
	// 	for (let i of json) {
	// 		rowsData.push(i);
	// 	}
	// 	setFilterContain(rowsData);
	// }
	useEffect(() => {
		// fetchAPIProvinsi();
	}, []);

	return (
		<div>
			<MDBDropdown>
				<MDBDropdownToggle
					caret
					color=""
					className={styles.dropdownRekomendasi}
					style={{
						color: typeof filter.teknologi === "undefined" ? "grey" : "black",
					}}
				>
					<div>
						{typeof filter.teknologi === "undefined"
							? "Rekomendasi Teknologi"
							: filter.teknologi.replaceAll('_', ' ')}
					</div>
					<img src={DropdownArrow} alt={filter.id}/>
				</MDBDropdownToggle>

				{/* If use css modules, dropdown style didn't change */}
				<MDBDropdownMenu className="dropdown-menus">
					{filterContain.map((fc, i) => (
						<MDBDropdownItem
							active={filter.teknologi === fc.teknologi}
							onClick={() => clicked(fc)}
							key={i}
						>
							{fc.teknologi.replaceAll('_', ' ')}
						</MDBDropdownItem>
					))}
				</MDBDropdownMenu>
			</MDBDropdown>
		</div>
	);
}
export default RTFilter;
