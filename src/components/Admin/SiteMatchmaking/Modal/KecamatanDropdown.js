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

function KecamatanDropdown(props) {
    const { filter, clicked, kabupatenkota } = props;
    
	const [filterContain, setFilterContain] = useState([]);

	async function fetchAPIKecamatan() {
        API.getKecamatan(kabupatenkota)
            .then((res) => {
                setFilterContain(res.data.data);
            }).catch((e) => {
				console.log(e.message);
			});
	}
	useEffect(() => {
        if(typeof kabupatenkota !== "undefined"){
            fetchAPIKecamatan();
		}
		// console.log(kabupatenkota)
	}, [kabupatenkota]);

	return (
		<div>
			<MDBDropdown>
				<MDBDropdownToggle
					caret
					color=""
                    className={styles.dropdownRekomendasi}
                    disabled={kabupatenkota === "" || typeof kabupatenkota === "undefined" ? true : false}
				>
					<div>
						{typeof filter.name === "undefined" ? "Pilih Kecamatan" : filter.name}
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
export default KecamatanDropdown;
