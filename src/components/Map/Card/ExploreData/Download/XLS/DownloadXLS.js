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
	let title = "Explore Data";

	return (
		<Table
			style={{ display: "none" }}
			id="DownloadTableXLS"
			className="DownloadTableXLS"
		>
			<caption>{`DATA ${title}`}</caption>
			<thead>
				<tr>
					<th>Kode Titik</th>
					<th>Nama Lokasi</th>
					<th>Status</th>
					<th>Provinsi</th>
					<th>Kab/Kota </th>
					<th>Kecamatan</th>
					<th>Desa</th>
					<th>Longitude</th>
					<th>Latitude</th>
				</tr>
			</thead>
			<tbody>
				{/* {props.data.map((data, index) => (
          <tr key={index}>
            <td>{data.title ? data.title ?? "-" : data.details.title ?? "-"}</td>
            <td>{data.requested_by.organization.name ?? "-"}</td>
            <td>{data.category ?? "-"}</td>
            <td>{data.list_provinsi.map((prov) => prov.name).toString() ?? "-"}</td>
            <td>{data.proposed_date ? data.proposed_date.map((e) => moment(e).format("DD-MM-YYYY")).toString() : "-"}</td>
            <td>{data.proposed_time ? `${data.proposed_time[0]} - ${data.proposed_time.slice(-1).pop()}` : "-"}</td>
          </tr>
        ))} */}
			</tbody>
		</Table>
	);
};

export default DownloadXLS;
