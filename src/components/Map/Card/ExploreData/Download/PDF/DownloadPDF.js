import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportPDF = (dataTable, activeTab) => {
	const unit = "pt";
	const size = "A4"; // Use A1, A2, A3 or A4
	const orientation = "portrait"; // portrait or landscape
	const marginLeft = 40;
	const doc = new jsPDF(orientation, unit, size);
	doc.setFontSize(15);

	const title = "Explore Data";
	const headers = [
		[
			"Kode Titik",
			"Nama Lokasi",
			"Status",
			"Provinsi",
			"Kab/Kota",
			"Kecamatan",
			"Desa",
			"Longitude",
			"Latitude",
		],
	];
	// const data = dataTable.map((data) => {
	//   return [
	//     data.title ? data.title ?? "-" : data.details.title ?? "-",
	//     data.requested_by.organization.name ?? "-",
	//     data.category ?? "-",
	//     data.list_provinsi.map((prov) => prov.name).toString() ?? "-",
	//     data.proposed_date ? data.proposed_date.map((e) => moment(e).format("DD-MM-YYYY")).toString() : "-",
	//     data.proposed_time ? `${data.proposed_time[0]} - ${data.proposed_time.slice(-1).pop()}` : "-",
	//   ];
	// });
	const data = [""];
	let content = {
		startY: 50,
		head: headers,
		body: data,
	};
	doc.text(title, marginLeft, 40);
	doc.autoTable(content);
	doc.save("explore-data.pdf");
};
