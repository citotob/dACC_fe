import React from 'react'

function TableCell ({ dataResult }) {
    return(
        <td className="table-cell" onClick={data.sortFunc}>
            {dataResult.text}
        </td>
    )
}

export default TableCell