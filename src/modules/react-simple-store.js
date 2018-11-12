import { useEffect, useState } from 'react'

class Store {
  constructor(defaultValues) {
    this.state = defaultValues
    this.callbacks = []
  }
  set(key, value) {
    if (key in this.state) {
      this.state = {
        ...this.state,
        [key]: value
      }
      this.fire(this.state)
    }
  }
  update(cb) {
    this.state = cb(this.state)
    this.fire(this.state)
  }
  on(cb) {
    if (!this.callbacks.includes(cb)) {
      this.callbacks.push(cb)
    }
    return () => {
      const index = this.callbacks.indexOf(cb)
      if (index > -1) {
        this.callbacks.splice(index, 1)
      }
    }
  }
  fire(state) {
    this.callbacks.map(cb => cb(state))
  }
}

function createStore(defaultValues) {
  const store = new Store(defaultValues)
  const useStore = (mapToProps) => {
    const [props, updater] = useState(mapToProps(store.state))
    useEffect(() => store.on((state) => {
      const nextState = mapToProps(state)
      if (nextState !== props) {
        updater(nextState)
      }
    }))
    return [props, store]
  }
  return { useStore, store }
}

export default createStore
