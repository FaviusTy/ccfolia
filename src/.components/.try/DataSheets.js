import React, { useState } from 'react'
// import ReactDataSheet from 'react-datasheet'

// import 'react-datasheet/lib/react-datasheet.css'
import styles from './styles/DataSheets.module.css'

const renderSheet = ({ className, children }, columns) => (
  <table className={className}>
    <thead>
      <tr>
        {columns.map((col, i) => (<th key={i}>{col}</th>))}
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
)

const DataSheet = ({ data }) => {
  const [tableData, setTableData] = useState([
    [{ value: 1 },{ value: 2 },{ value: 3 },{ value: 4 },{ value: 5 }]
  ])
  return (
    <>
      <ReactDataSheet
        data={tableData}
        sheetRenderer={(props) => renderSheet(props, data)}
        valueRenderer={(cell) => cell.value || cell}
        onCellsChanged={changes => {
          const nextTableData = [...tableData]
          changes.forEach(({ row, col, value }) => {
            nextTableData[row][col] = { value }
          })
          setTableData(nextTableData)
        }}
      />
      <button onClick={() => {
        const nextTableData = [...tableData, [1,2,3,4,5]]
        setTableData(nextTableData)
      }}>+</button>
    </>
  )
}

const DataSheets = ({ items }) => (
  <div className={styles.wrap}>
    <DataSheet data={['NAME', 'HP', 'MP', 'SAN', 'ETC']} />
    {/* { items[0] ? <DataSheet data={items[0].data} /> : null } */}
    {/* {items.map(({ id, data }) => <DataSheet key={id} data={data} />)} */}
  </div>
)

export default DataSheets