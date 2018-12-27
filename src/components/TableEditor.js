import React, { useRef, useCallback, memo } from 'react'
import serialize from 'form-serialize'

const TableEditor = ({ onSubmit, table: { background, media } }) => {
  const formRef = useRef()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const data = serialize(formRef.current, { hash: true })
    data.media.muted = !!data.media.muted
    data.media.loop = !!data.media.loop
    data.media.volume = Number(data.media.volume)
    console.log(data)
    onSubmit(data)
  }, [onSubmit])
  return (<div className="Editor">
    <h1>Editor</h1>
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="background[url]" type="text" defaultValue={background.url} />
      <input name="media[url]" type="text" defaultValue={media.url} />
      <input name="media[muted]" type="checkbox" defaultChecked={media.muted} />
      <input name="media[loop]" type="checkbox" defaultChecked={media.loop} />
      <input name="media[volume]" type="number" step="0.01" defaultValue={media.volume} />
      <button>save</button>
    </form>
  </div>)
}

export default memo(TableEditor)