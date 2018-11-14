import React, { useState } from 'react'
import Modal from '../Modal'

const renderModal = ({ mode, setMode }) => {
  if (mode === 'a') {
    return <Modal><p onClick={() => setMode('b')}>aaa</p></Modal>
  } else if (mode === 'b') {
    return <Modal><p onClick={() => setMode('a')}>bbb</p></Modal>
  } else {
    return <Modal><p onClick={() => setMode('a')}>ccc</p></Modal>
  }
}

const Room = ({ roomId }) => {
  const [mode, setMode] = useState(null)
  return (<>
    <Modal><p onClick={() => setMode('a')}>reset</p></Modal>
    {renderModal({ mode, setMode })}
  </>)
}

export default Room