import React from "react";

function TableBootstrap(props) {
  const tableData = [
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
    {
      kordinat: "9.99999 | 9.00000",
      namajalan: "Jln. ABC Def #HIJKL",
      obyekreferensi: "New Pole dan HH Existing Telkom",
    },
  ];

  return (
    <React.Fragment>
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Kordinat</th>
              <th>Nama Jalan</th>
              <th>Obyek Referensi</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data?.kordinat ?? "-"}</td>
                  <td>{data?.namajalan ?? "-"}</td>
                  <td>{data?.obyekreferensi ?? "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default TableBootstrap;
