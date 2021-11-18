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
  let title = "Sitematchmaking Admin";
  const headers = [["Batch", "Tipe Batch", "No Surat Permintaan RFI", "Tanggal Dimulai", "Tanggal Selesai", "Status"]];
  const data = dataTable.map((data) => {
    return [
      data.judul,
			data.type,
			data.no_doc_permohonan_rfi,
			moment(data.tanggal_mulai_undangan)
				.format("DD/MM/YYYY")
				.toString(),
			moment(data.tanggal_selesai_undangan)
				.format("DD/MM/YYYY")
				.toString(),
			data.status[data.status.length - 1].status,
    ];
  });
  let a = 0
  let content = {
    startY: 50,
    head: headers,
    body: data,
    // columnStyles: {
    //   0: {cellWidth: 130},
    //   1: {cellWidth: 100},
    //   2: {cellWidth: 150},
    //   3: {cellWidth: 100},
    //   4: {cellWidth: 100},
    //   // etc
    // },
  };
  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save(`Data_Akses_Internet_${moment(Date()).format("DDMMYYYY").toString()}.pdf`);
};
