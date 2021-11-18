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

function StatusDropdown(props) {
	const { filter, clicked } = props;
	const filterContain = [
		{
			id: "1",
			status: "Dibuka",
		},
		{
			id: "2",
			status: "Ditunda",
		},
		{
			id: "3",
			status: "Selesai",
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
						color:
							typeof filter.status === "undefined"
								? "grey"
								: filter.status === "Dibuka"
								? "green"
								: filter.status === "Ditunda"
								? "red"
								: "grey",
					}}
				>
					<div>
						{typeof filter.status === "undefined" ? "Status" : filter.status}
					</div>
					<img src={DropdownArrow} alt={filter.id}/>
				</MDBDropdownToggle>

				{/* If use css modules, dropdown style didn't change */}
				<MDBDropdownMenu className="dropdown-menus">
					{filterContain.map((fc, i) => (
						<MDBDropdownItem
							style={{
								color:
									fc.status === "Dibuka"
										? "green"
										: fc.status === "Ditunda"
										? "red"
										: "grey",
							}}
							active={filter.status === fc.status}
							onClick={() => clicked(fc)}
							key={i}
						>
							{fc.status}
						</MDBDropdownItem>
					))}
				</MDBDropdownMenu>
			</MDBDropdown>
		</div>
	);
}
export default StatusDropdown;
