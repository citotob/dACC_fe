import React, { useState, useEffect } from "react";
import {
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
} from "mdbreact";
import styles from "./style.module.css";
import "./style.css";
import API from "../../../../services";
import DropdownArrow from "../../../../assets/images/DropdownArrow.svg";

function DesaDropdown(props) {
    const { filter, clicked, kecamatan } = props;
    
	const [filterContain, setFilterContain] = useState([]);

	async function fetchAPIDesa() {
        API.getDesa(kecamatan)
            .then((res) => {
                setFilterContain(res.data.data);
            }).catch((e) => {
				setFilterContain([]);
			});
	}
	useEffect(() => {
        if(typeof kecamatan !== "undefined"){
            fetchAPIDesa();
		}
	}, [kecamatan]);

	return (
		<div>
			<MDBDropdown>
				<MDBDropdownToggle
					caret
					color=""
                    className={styles.dropdownRekomendasi}
                    disabled={kecamatan === "" || typeof kecamatan === "undefined" ? true : false}
				>
					<div>
						{typeof filter.name === "undefined" ? "Pilih Kelurahan/Desa" : filter.name}
					</div>
					<img src={DropdownArrow} alt={filter.id}/>
				</MDBDropdownToggle>

				{/* If use css modules, dropdown style didn't change */}
				<MDBDropdownMenu className="dropdown-menus">
					{filterContain.map((fc, i) => (
						<MDBDropdownItem
							active={filter.name === fc.name}
							onClick={() => clicked(fc)}
							key={i}
						>
							{fc.name}
						</MDBDropdownItem>
					))}
				</MDBDropdownMenu>
			</MDBDropdown>
		</div>
	);
}
export default DesaDropdown;
