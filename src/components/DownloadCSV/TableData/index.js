import React from 'react';
import styles from './styles.module.css'


function TableData({ data, meta }){
    const headerOrder = meta.map(m => m.key);
    return(
        <tbody>
            {
                data.map((row) => (
                    <tr className={styles.tableRow}>
                        {
                            row.map(( _, i ) => row.find( r => r.key === headerOrder[i]))
                        }
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableData