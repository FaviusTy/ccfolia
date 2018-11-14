import { useState } from 'react'
import { pure } from 'recompose'
// import { useState } from 'react'

const MessagesContainer = () => {
}

const Message = ({ name, text }) => (
  <p>{name}: {text}</p>
)

const Messages = ({ messages }) => (
  <div>
    {messages.map((message) => <Message {...message} />)}
  </div>
)