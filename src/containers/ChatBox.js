import React, { useCallback, useRef, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useMessagesAction } from '../stores/messages'

import styles from '../components/styles/ChatBox.module.css'

const ChatBox = ({ id }) => {
  if (!id) return null
  const { add } = useMessagesAction(id)
  const formRef = useRef(null)
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && e.metaKey && formRef.current) {
      const { name, text } = formRef.current
      add({
        name: name.value,
        text: text.value
      })
      text.value = ''
    }
  }, [add])
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (formRef.current) {
      const { name, text } = formRef.current
      add({
        name: name.value,
        text: text.value
      })
      text.value = ''
    }
  }, [add])
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
        <NavLink replace to={`/room/${id}/chatpalet`}>🎲</NavLink>
        <NavLink replace to={`/room/${id}/console`}>+</NavLink>
      </div>
    </div>
  )
}

export default memo(ChatBox)
