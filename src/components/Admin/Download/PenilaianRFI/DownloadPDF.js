import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportPDF = (dataTable, siteid) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(15);
  let title = `Penilaian RFI Kode Titik ${siteid}`;
  const headers = [["Nama Vendor", "Ketepatan Teknologi", "Durasi Pengerjaan", "Pricing", "VP Score", "Nilai"]];
  const data = dataTable.map((data) => {
    return [
        data.naven,
        data.kelogi,
        data.duper,
        data.harga,
        data.score,
        data.nilai,
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
  doc.save(`Penilaian_RFI_${moment(Date()).format("DDMMYYYY").toString()}.pdf`);
};
