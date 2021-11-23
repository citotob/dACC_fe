import React from 'react';
import styles from './styles.module.css'


function tableHeader({ headers }) {
    return(
        <thead className={styles.tableRow}>
            {
                headers.map((d) => <TableCell data={d} />)
            }
        </thead>
    )
}

export default tableHeader;