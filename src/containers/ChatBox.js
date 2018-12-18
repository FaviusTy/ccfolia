import React, { useState, useCallback, useRef, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import { useRoomStore } from '../stores/room'
// import { useCollection } from '../modules/react-hooks-firebase'
import styles from '../components/styles/ChatBox.module.css'

const ChatBox = () => {
  // const [_, messageCollection] = useCollection({
  //   select: (db) => db.collection('rooms/1/messages')
  // })
  const formRef = useRef(null)
  const onKeyDown = useCallback((e) => {
    if (e.key == 'Enter' && e.metaKey && formRef.current) {
      const { name, text } = formRef.current
      // messageCollection.add({
      //   name: name.value,
      //   text: text.value
      // })
      text.value = ''
    }
  }, [])
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (formRef.current) {
      const { name, text } = formRef.current
      // messageCollection.add({
      //   name: name.value,
      //   text: text.value
      // })
      text.value = ''
    }
  }, [])
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