import React from 'react'
import Dropzone from 'react-dropzone'

const Assets = ({ objects, onAdd, onChange, onSelect }) => {
  return (<div className="Assets">
    <div className="tab"><div className="inner">
      <button onClick={onAdd}>+</button>
      <select onChange={onChange}>
        {objects.map(({ id, name }) => {
          return <option key={id}>{name}</option>
        })}
      </select>
    </div></div>
    <div className="body"><div className="inner">
      {[...Array(60)].map(() => {
        return <div className="object" onClick={onSelect}><img src="/bg.jpg" alt=""/></div>
      })}
    </div></div>
  </div>)
}

export default Assets