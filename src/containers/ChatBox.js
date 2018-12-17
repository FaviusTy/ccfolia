import React, { useMemo, useCallback, useRef, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import { useRoomStore } from '../stores/room'
import styles from '../components/styles/ChatBox.module.css'

const ChatBox = () => {
  const formRef = useRef(null)
  const onKeyDown = useCallback((e) => {
    if (e.key == 'Enter' && e.metaKey && formRef.current) {
      const { text } = formRef.current
    }
  }, [])
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (formRef.current) {
    }
  }, [])
  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit} ref={formRef}>
        <input type="text" name="name" />
        <textarea
          name="text"
          onKeyDown={onKeyDown}
        />
        <button>send</button>
      </form>
      <div className={styles.menu}>
        <NavLink replace to={`/room/0/console/`}>+</NavLink>
        <NavLink replace to={`/room/0/console/`}>🎲</NavLink>
        {/* <button>+</button> */}
      </div>
    </div>
  )
}

export default ChatBox