import createStore from '../modules/react-simple-store'

const defaultValues = []

export const { useStore, store } = createStore(defaultValues)