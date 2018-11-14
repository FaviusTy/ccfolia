import { useEffect, useState } from 'react'

class Store {
  constructor(defaultValues) {
    this.state = defaultValues
    this.callbacks = []
  }
  add(key, value) {
    if (Array.isArray(this.state)) {
      this.state = [...this.state, {
        key,
        ...value
      }]
    } else {
      this.state = {
        ...this.state,
        [key]: value
      }
    }
    this.fire(this.state)
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
  const useStore = (mapState) => {
    const [props, updater] = useState(mapState ? mapState(store.state) : store.state)
    useEffect(() => store.on((state) => {
      const nextState = mapState ? mapState(store.state) : store.state
      if (nextState !== props) {
        updater(nextState)
      }
    }))
    return [props, store]
  }
  return { useStore, store }
}

export default createStore
