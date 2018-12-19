import React, { useState, useCallback, useRef, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useRoomStore } from '../contexts/room'
// import { useCollection } from '../modules/react-hooks-firebase'
import styles from '../components/styles/ChatBox.module.css'

const ChatBox = () => {
  const { dispatch } = useRoomStore()
  const formRef = useRef(null)
  const onKeyDown = useCallback((e) => {
    if (e.key == 'Enter' && e.metaKey && formRef.current) {
      const { name, text } = formRef.current
      dispatch('MESSAGE_ADD', {
        name: name.value,
        text: text.value
      })
      text.value = ''
    }
  }, [dispatch])
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (formRef.current) {
      const { name, text } = formRef.current
      dispatch('MESSAGE_ADD', {
        name: name.value,
        text: text.value
      })
      text.value = ''
    }
  }, [dispatch])
  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit} ref={formRef}>
        <input type="text" name="name" defaultValue="KP" />
        <textarea
          name="text"
          onKeyDown={onKeyDown}
        />
        <button>send</button>
      </form>
      <div className={styles.menu}>
        <NavLink replace to={`/room/0/console/`}>+</NavLink>
        <NavLink replace to={`/room/0/console/`}>🎲</NavLink>
      </div>
    </div>
  )
}

export default ChatBox