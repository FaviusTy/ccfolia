import React, { useCallback } from 'react'
import { useStore } from '../stores/room'
import { pure } from 'recompose'

const Hoge = () => {
  const [name, store] = useStore((state) => {
    return state.name
  })
  return <p onClick={() => store.set('name', Date.now().toString(16))}>{name}</p>
}

let cachecb = null;
let cachect = null;
const Fuga = pure(() => {
  const [count, store] = useStore((state) => {
    return state.count
  })
  const onClick = useCallback(() => {
    store.set('count', count + 1)
  }, [count])
  return (
    <>
      <p>{1}</p>
      <FugaChild count={count} onClick={onClick}></FugaChild>
      <FugaChild count={count} onClick={onClick}></FugaChild>
    </>
  )
})

const FugaChild = pure(({ count, onClick }) => (
  <div>
    <p onClick={onClick}>{count}</p>
  </div>
))

const Mogya = () => {
  const [state] = useStore((state) => {
    return state
  })
  return (
    <>
      <p>{state.name}</p>
      <MogyaChild count={state.count}></MogyaChild>
    </>
  )
}

const MogyaChild = pure(({ count }) => (
  <div>
    <p>{1}</p>
  </div>
))

const Room = ({ roomId }) => (
  <>
    <Hoge></Hoge>
    <Fuga></Fuga>
    <Mogya></Mogya>
  </>
)

export default Room