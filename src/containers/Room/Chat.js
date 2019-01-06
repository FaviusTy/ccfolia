import React, { memo, useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import serialize from 'form-serialize'
import { useGetter, useDispatcher, useObserver } from '../../stores/index'
import { useCommand } from '../../hooks/command'

const Chat = ({ className }) => {
  const rid = useGetter('room:id')
  const uid = useGetter('user:id')

  const { dispatch, commit } = useDispatcher()
  const exec = useCommand(dispatch, rid, uid)

  const formRef = useRef()
  const [color, setColor] = useState(null)

  const submit = useCallback((target) => {
    const data = serialize(target, { hash: true })
    const isExecuted = exec(data.text)
    if (!isExecuted) {
      dispatch('room:messages:add', rid, data)
    }
    target.text.value = ''
  }, [rid, exec])
  const handleColorChange = useCallback((e) => {
    setColor(e.currentTarget.value)
  }, [setColor])
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit(formRef.current)
    }
  }, [submit])
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    submit(formRef.current)
  }, [submit])
  return (<div className={className}>
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
      <a href="#a">🎲</a>
      <a onClick={() => commit('room:view', 'assets')}>+</a>
    </nav>
  </div>)
}

const StyledChat = styled(Chat)`
  padding: 4px;
  padding-bottom: 4px;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 4px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 4px);
  display: flex;
  background: #eee;
  form {
    display: flex;
    flex: 1;
    width: 60%;
  }
  form textarea {
    padding: 4px;
    border: none;
    outline: none;
    flex: 1;
    resize: none;
    height: 2.4em;
  }
  form button {
    border: none;
    /* outline: none; */
    padding: 4px 8px;
    background: #444;
    color: #fff;
  }
  form input[type=text] {
    padding: 4px;
    border: none;
    border-right: 4px solid #eee;
    width: 15%;
  }
  form select {
    outline: none;
    margin-right: 4px;
    border: none;
    border-radius: none;
    text-align: center;
    text-indent: -9999px;
    width: 8px;
    appearance: normal;
  }
  nav {
    display: flex;
  }

  nav a {
    margin-left: 4px;
    width: 36px;
    background: #fff;
    text-align: center;
    text-decoration: none;
    color: #444;
  }
`

export default memo(StyledChat)