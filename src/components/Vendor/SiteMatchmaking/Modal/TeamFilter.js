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

function TeamFilter(props) {
	const { filter, clicked } = props;
	const filterContain = [
		'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
	];

	return (
		<div>
			<MDBDropdown>
				<MDBDropdownToggle
					caret
					color=""
					className={styles.dropdownRekomendasi}
					style={{
						color: typeof filter === "undefined" ? "grey" : "black",
					}}
				>
					<div>
						{filter === ""
							? "Pilih Team"
							: filter.toUpperCase() }
					</div>
					<img src={DropdownArrow} alt={filter}/>
				</MDBDropdownToggle>

				{/* If use css modules, dropdown style didn't change */}
				<MDBDropdownMenu className="dropdown-menus">
					{filterContain.map((fc, i) => (
						<MDBDropdownItem
							active={filter === fc}
							onClick={() => clicked(fc)}
							key={i}
						>
							{fc.toUpperCase()}
						</MDBDropdownItem>
					))}
				</MDBDropdownMenu>
			</MDBDropdown>
		</div>
	);
}
export default TeamFilter;
