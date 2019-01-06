import React, { useCallback, useMemo } from 'react'
import serialize from 'form-serialize'
import Dropzone from 'react-dropzone'

const Assets = ({ assets }) => {

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const target = e.currentTarget
    const data = serialize(target, { hash: true })
    // onCreateItem(data)
    target.url.value = ''
  }, [])

  const handleChange = useCallback((e) => {
    e.preventDefault()
    const target = e.currentTarget
    const data = target.value
    // onChange(data)
  }, [])

  return (<div className="Assets">
    <div className="tab"><div className="inner">
      {/* <button onClick={onCraeteAsset}>+</button> */}
      <select onChange={handleChange}>
        {assets.map(({ id, name }) => {
          return <option value={id} key={id}>{name}</option>
        })}
      </select>
    </div></div>
    <header>
      <form onSubmit={handleSubmit}>
        <input name="url" type="text" />
        <button>Add</button>
      </form>
    </header>
    <div className="body"><div className="inner">
      {assets[0] && assets[0].items ? [...Array(60)].map(() => {
        return <div className="object" onClick={() => {}}>
          <img src="/bg.jpg" alt=""/>
        </div>
      }) : null}
    </div></div>
  </div>)
}

export default Assets