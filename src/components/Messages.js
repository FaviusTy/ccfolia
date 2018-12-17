import React, { memo, useLayoutEffect, useRef } from 'react'
import styles from './styles/Messages.module.css'

const _Message = ({ name, text }) => (
  <div className={styles.item}>{name}: {text}</div>
)
const Message = memo(_Message)

const Messages = ({ messages }) => {
  const wrapRef = useRef(null)
  useLayoutEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollTop = 99999999
    }
  })
  return (
    <div className={styles.wrap} ref={wrapRef}>
      {messages.map(message => <Message key={message.id} {...message} />)}
    </div>
  )
}

export default memo(Messages)