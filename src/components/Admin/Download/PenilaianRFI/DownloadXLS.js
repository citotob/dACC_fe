import React, { useEffect } from "react";
import { Table } from "reactstrap";
import moment from "moment";

const DownloadXLS = (props) => {
  let role = window.localStorage.getItem("role");
  useEffect(() => {
    const handleProps = () => {};
    handleProps();
    return () => {
      handleProps();
    };
  }, [props.data]);
  return (
    <Table style={{ display: "none" }} id="DownloadTableXLS" className="DownloadTableXLS">
      <caption>{`Penilaian RFI Kode Titik ${props.siteid}`}</caption>
      <thead>
        <tr>
          <th>Nama Vendor</th>
          <th>Ketepatan Teknologi</th>
          <th>Durasi Pengerjaan</th>
          <th>Pricing</th>
          <th>VP Score</th>
          <th>Nilai</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data, index) => (
          <tr key={index} style={{textAlign:'center', verticalAlign:'middle'}}>
            <td>{data.naven}</td>
            <td>{data.kelogi}</td>
            <td>{data.duper}</td>
            <td>{data.harga}</td>
            <td>{data.score}</td>
            <td>{data.nilai}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DownloadXLS;
