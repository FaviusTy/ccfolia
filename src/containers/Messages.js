import React, { useCallback } from 'react'
import { useStore } from '../stores/messages'

const Message = ({ name, text }) => (
  <p>{name}: {text}</p>
)

const Messages = ({ messages }) => (
  <div>
    {messages.map((message, i) => <Message key={i} {...message} />)}
  </div>
)

const MessageForm = ({ onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <input type="text" name="text" />
      {/* <textarea name="text"></textarea> */}
      <button>ADD</button>
    </form>
  </div>
)

const MessagesContainer = () => {
  const [messages, store] = useStore()
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const form = e.currentTarget
    const { name, text } = form
    store.add(Date.now().toString(36), {
      name: name.value,
      text: text.value
    })
    text.value = ''
  }, [store])
  return (
    <>
      <MessageForm onSubmit={onSubmit}></MessageForm>
      <Messages messages={messages}></Messages>
    </>
  )
}

export default MessagesContainer