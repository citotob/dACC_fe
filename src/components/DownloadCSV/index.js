import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { sortBy } from 'underscore';

const dataResult = [
    { name: 'Porsche', age: 2, color: 'Blue' },
    { name: 'BMW', age: 1, color: 'Grey' },
    { name: 'Renault', age: 2, color: 'Yellow' },
    { name: 'Volkswagen', age: 7, color: 'Matte Red' },
    { name: 'Porsche', age: 2, color: 'Silver Grey' },
    { name: 'Jaguar', age: 6, color: 'Electric Blue' },
    { name: 'Mistubishi', age: 4, color: 'Black' },
    { name: 'Toyota', age: 9, color: 'Copper' },
    { name: 'Honda', age: 12, color: 'Biege' },
].map(( d, id ) => ({ ...d, id}));

const meta = [
    {
        key: 'id',
        text: 'ID',
        sort: true,
    },
    {
        key: 'name',
        text: 'Automobile Company',
        sort: true,
    },
    {
        key: 'age',
        text: 'Years Since Purchase',
        sort: true,
    },
    {
        key: 'color',
        text: 'Color',
        sort: true,
    },
]

const TableHeader = ( {headers} ) => {
    return (
        <thead className={styles.tableRow}>
            {
                headers.map((d) => <TableCell data={d} />)
            }
        </thead>
    )
}

const TableData = ({dataResult, meta}) => {
    const headerOrder = meta.map(m => m.key);
    return(
        <tbody>
            {
                dataResult.map((row) => (
                    <tr className={styles.tableRow}>
                        {
                            row.map(( _, i) => row.find( r => r.key === headerOrder[i]))
                        }
                    </tr>
                ))
            }
        </tbody>
    )
}

const TableCell = ({dataResult}) => {
    return(
        <td className={styles.tableRow} onClick={dataResult.sortFunc}>
            {dataResult.text}
        </td>
    )
}

const Paginator = ( {page, setPage, size}) => {
    return (
        <div className={styles.Paginator}>
            {
                Array(size).fill(0).map((_,i) => (
                    <div className={styles.PaginatorBlock} onClick={() => setPage(i)}>
                        {i}
                    </div>
                ))
            }
        </div>
    )
}

const pageSize = 5;
const normalizeData = ((dataResult) => {
    return dataResult.map(td => {
        const keys = Object.keys(td);
        return keys.map(key => ({ key, text: td[key] }));
    });
})

const compare = {
    '>': (d1, d2) => d1 > d2,
    '<': (d1, d2) => d1 < d2,
}

function App() {
    const [headerMeta, setHeaderMeta] = useState(meta);
    const [tableData, setTableData] = useState([]);
    const [sortBy, setSortBy] = useState({key: null, order: '>' });
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        function sortFunc(m) {
            setSortBy({ key: m.key, order: sortBy.order === '>' ? '<' : '>' });
        }
        setHeaderMeta(
            (currentHeaderMeta) => currentHeaderMeta.map((m) => m.sort ? { ...m, sortFunc: () => sortFunc(m) } : m)
        );
    }, [sortBy]);

    useEffect(() => {
        // normalize data
        setTableData(normalizeData(dataResult), meta);
    }, []);

    useEffect(() => {
        // sort
        setTableData(normalizeData(dataResult.sort((d1, d2) => compare[sortBy.order](d1[sortBy.key], d2[sortBy.key]))));
    }, [sortBy])

    useEffect(() => {
        // paginate
        const startPointer = currentPage * pageSize;
        const endPointer = startPointer + pageSize
        setTableData(normalizeData(dataResult.slice(startPointer, endPointer)));
    }, [sortBy, currentPage]);

    return (
        <div className={styles.container}>
            <TableHeader header={headerMeta} />
            <TableData data={tableData} meta={meta} />
            <Paginator page={currentPage} setPage={setCurrentPage} size={Math.ceil(dataResult.length / pageSize)} />
        </div>
    )
}

export default App;