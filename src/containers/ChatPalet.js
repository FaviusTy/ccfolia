import React, { useState, useMemo, useCallback, memo } from 'react'
import { useMessagesAction } from '../stores/messages'
import { useChatPaletAction } from '../stores/chatpalet'

const ChatPaletItem = ({ name, texts, submit, onSubmit }) => {
  return (<div>
    <form onSubmit={onSubmit}>
      <input name="name" type="text" defaultValue={name} />
      <textarea name="texts" defaultValue={texts}></textarea>
      <button>save</button>
    </form>
    {texts.split('\n').map((text, i) => {
      return <p onClick={() => submit({ name, text })} key={i}>{text}</p>
    })}
  </div>)
}

const ChatPalet = ({ id, chatpalet }) => {
  const [current, setCurrent] = useState(0)
  const { add } = useMessagesAction(id)
  const { update } = useChatPaletAction({ uid: 'TEST_USER', id })
  const item = useMemo(() => {
    return chatpalet.items[current] || { name: '', texts: '' }
  }, [chatpalet, current])
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const { name, texts } = e.currentTarget
    const item = { name: name.value, texts: texts.value }
    const nextItems = [...chatpalet.items]
    nextItems[current] = item
    update({ items: nextItems })
  }, [update])

  return (<>
    {chatpalet.items.map(({ name }, i) => {
      return <a key={i} onClick={() => setCurrent(i)}>{name}</a>
    })}
    <ChatPaletItem
      key={current}
      name={item.name}
      texts={item.texts}
      submit={add}
      onSubmit={onSubmit}
    />
  </>)
}

export default memo(ChatPalet)