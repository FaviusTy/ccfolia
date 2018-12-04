import React from 'react'
import styles from './styles/DataSheets.module.css'

const isTypedCell = (data) => {
  return (
    typeof data === 'object'
    && data.hasOwnProperty('val')
  )
}

const Cell = ({ data }) => {
  if (isTypedCell(data)) {
    const { type, val, bg } = data
    switch (type) {
      // case 'text':
      //   return (<td>{val}</td>)
      // case 'number':
      //   return (<td>{val}</td>)
      default:
        return (<td style={{ background: bg }}>{val}</td>)
    }
  } else {
    return <td style={{ background: '#fff' }}>{data}</td>
  }
}

const Row = ({ row }) => (
  <tr>
    {row.map((data, i) => <Cell key={i} data={data} />)}
  </tr>
)

const DataSheet = ({ data }) => (
  <table>
    <tbody>
      {data.map((row, i) => <Row key={i} row={row} />)}
    </tbody>
  </table>
)

const DataSheets = ({ items }) => (
  <div className={styles.wrap}>
    {items.map(({ id, data }) => <DataSheet key={id} data={data} />)}
  </div>
)

export default DataSheets