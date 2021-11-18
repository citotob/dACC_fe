import React, { useState, useEffect } from "react";
import {
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from "mdbreact";
import "./style.css";
import styles from "./style.module.css";
import dummy from "../Table/dummy.json";

function FilterButton(props) {
	const { filter, clicked } = props;
	const [filterContain, setFilterContain] = useState([]);

	//Change uppercase and lowercase
	// const formatText = (text) => {
	//     text = text.toLowerCase()
	//     let textArray = text.split(' ')
	//     let textJoin = textArray.reduce((join, text) => {
	//         if (text === 'dki' || text === 'di') {
	//             text = text.toUpperCase();
	//         } else {
	//             text = text.charAt(0).toUpperCase() + text.slice(1);
	//         }
	//         join.push(text)
	//         return join;
	//     }, [])
	//     return textJoin.join(' ')
	// }

	async function fetchAPIProvinsi() {
		const response = dummy;
		const json = await response.data;
		// get Rows
		let rowsData = [];
		for (let i of json) {
			rowsData.push(i);
		}
		setFilterContain(rowsData);
	}
	useEffect(() => {
		fetchAPIProvinsi();
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
							typeof filter.nama_penyedia === "undefined" ? "grey" : "black",
					}}
				>
					<div>
						{typeof filter.nama_penyedia === "undefined"
							? "Pilih Penyedia"
							: filter.nama_penyedia}
					</div>
				</MDBDropdownToggle>

				{/* If use css modules, dropdown style didn't change */}
				<MDBDropdownMenu className="dropdown-menus">
					{filterContain.map((fc, i) => (
						<MDBDropdownItem
							active={filter.nama_penyedia === fc.nama_penyedia}
							onClick={() => clicked(fc)}
							key={i}
						>
							{fc.nama_penyedia}
						</MDBDropdownItem>
					))}
				</MDBDropdownMenu>
			</MDBDropdown>
		</div>
	);
}
export default FilterButton;
