import React, { memo, useState, useCallback, useRef } from 'react'
import serialize from 'form-serialize'

const Chat = ({ onSubmit }) => {
  const formRef = useRef()
  const [color, setColor] = useState(null)
  const submit = useCallback((target) => {
    const data = serialize(target, { hash: true })
    onSubmit(data)
    target.text.value = ''
  }, [onSubmit])
  const handleColorChange = useCallback((e) => {
    setColor(e.currentTarget.value)
  }, [setColor])
  const handleKeyPress = useCallback((e) => {
    // if (e.key === 'Enter' && e.metaKey) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit(formRef.current)
    }
  }, [onSubmit])
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    submit(formRef.current)
  }, [onSubmit])
  return (<>
    <div className="ChatTab">
      <nav>
        <a href="#a" active="true">main</a>
        <a href="#a">secret</a>
        <a href="#a">private</a>
        <a href="#a">sys</a>
        <a href="#a">memo</a>
      </nav>
    </div>
    <div className="ChatBox">
      <form ref={formRef} onSubmit={handleSubmit}>
        <select name="color" style={{ backgroundColor: color }} defaultValue={color} onChange={handleColorChange}>
          <option>-</option>
          <option value="#ffcccc">Red</option>
          <option value="#ccccff">Blue</option>
          <option value="#ccffcc">Green</option>
          <option value="#ffffcc">Yellow</option>
          <option value="#ccffff">Sky</option>
        </select>
        <input type="hidden" name="type" defaultValue="text" />
        <input type="text" name="name" defaultValue="KP" />
        <textarea name="text" onKeyPressCapture={handleKeyPress} />
        <button>send</button>
      </form>
      <nav>
        <a href="#a">+</a>
      </nav>
    </div>
  </>)
}

export default memo(Chat)