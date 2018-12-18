import { createStore } from '../modules/react-hooks-store'
import { firestoreMutations } from '../modules/react-hooks-firebase'

const actions = {
}

const mutations = {
  ...firestoreMutations.collection('messages')
}

export const { Provider, useStore, commit } = createStore(actions, mutations, {
  messages: []
})
