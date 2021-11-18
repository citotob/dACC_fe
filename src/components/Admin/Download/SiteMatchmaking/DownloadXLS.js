import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import moment from "moment";

const DownloadXLS = (props) => {
  let role = window.localStorage.getItem("role");
  let [list, setList] = useState([])
  useEffect(() => {
   if(props.data){
    setList(props.data)
   }
  }, [props.data]);
  return (
    <Table style={{ display: "none" }} id="DownloadTableXLS" className="DownloadTableXLS">
      <caption>{`Sitematchmaking Admin`}</caption>
      <thead>
        <tr>
          <th>Batch</th>
          <th>Tipe Batch</th>
          <th>No Surat Permintaan RFI</th>
          <th>Tanggal Dimulai</th>
          <th>Tanggal Selesai</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {list.map((data, index) => (
          <tr key={index} style={{textAlign:'center', verticalAlign:'middle'}}>
            <td>{data.judul}</td>
            <td>{data.type}</td>
            <td>{data.no_doc_permohonan_rfi}</td>
            <td>{moment(data.tanggal_mulai_undangan)
              .format("DD/MM/YYYY")
              .toString()}</td>
            <td>{moment(data.tanggal_selesai_undangan)
              .format("DD/MM/YYYY")
              .toString()}</td>
            <td>{data.status[data.status.length - 1].status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DownloadXLS;
