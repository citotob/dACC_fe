import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportPDF = (dataTable) => {
	const unit = "pt";
	const size = "A4"; // Use A1, A2, A3 or A4
	const orientation = "landscape"; // portrait or landscape
	const marginLeft = 40;
	const doc = new jsPDF(orientation, unit, size);
	doc.setFontSize(15);

	const title = `DATA TITIK TANGGAL ${moment(new Date())
		.format("DD MMMM YYYY")
		.toUpperCase()}`;
	const headers = [
		[
			// "Kode Titik",
			"Nama Lokasi",
			"Teknologi",
			"Provinsi",
			"Kab/Kota",
			"Kecamatan",
			"Desa",
			"Longitude",
			"Latitude",
		],
	];

	const data = dataTable.map((i) => {
		return [
			// i.kt ?? "-",
			i.nm ?? "-",
			i.stat ?? "-",
			i.prov ?? "-",
			i.kab ?? "-",
			i.kec ?? "-",
			i.desa ?? "-",
			i.long ?? "-",
			i.lat ?? "-",
		];
	});
	let content = {
		startY: 50,
		head: headers,
		body: data,
	};
	doc.text(title, marginLeft, 40);
	doc.autoTable(content);
	doc.save(`Data_Akses_Internet_${moment(new Date()).format("DDMMYYYY")}.pdf`);
};
