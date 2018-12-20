// Maybe only beta version

import { useMemo, useContext } from 'react'
import { __RouterContext } from 'react-router-dom'

export const useRouter = () => {
  return useMemo(() => useContext(__RouterContext), [])
}