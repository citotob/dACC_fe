import React, { useEffect } from "react";
import { Table } from "reactstrap";
import moment from "moment";

const DownloadXLS = (props) => {
	useEffect(() => {
		const handleProps = () => {};
		handleProps();
		return () => {
			handleProps();
		};
	}, [props.data]);
	// let title = "Explore Data";

	const currentDate = new Date();

	return (
		<Table
			style={{ display: "none" }}
			id="DownloadTableXLS"
			className="DownloadTableXLS"
		>
			<caption>
				DATA TITIK TANGGAL{" "}
				{moment(currentDate).format("DD/MMMM/YYY").toUpperCase()}
			</caption>
			<thead>
				<tr>
					{/* <th>Kode Titik</th> */}
					<th>Nama Lokasi</th>
					<th>Teknologi</th>
					<th>Provinsi</th>
					<th>Kab/Kota </th>
					<th>Kecamatan</th>
					<th>Desa</th>
					<th>Longitude</th>
					<th>Latitude</th>
				</tr>
			</thead>
			<tbody>
				{props.data.map((d, index) => (
					<tr key={index}>
						{/* <td>{d.kt ?? "-"}</td> */}
						<td>{d.nm ?? "-"}</td>
						<td>{d.stat ?? "-"}</td>
						<td>{d.prov ?? "-"}</td>
						<td>{d.kab ?? "-"}</td>
						<td>{d.kec ?? "-"}</td>
						<td>{d.desa ?? "-"}</td>
						<td>{d.long ?? "-"}</td>
						<td>{d.lat ?? "-"}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default DownloadXLS;
