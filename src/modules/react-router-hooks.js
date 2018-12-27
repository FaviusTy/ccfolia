// Maybe only beta version

import React, { useMemo, useContext } from 'react'
import { Route, NavLink, Link, __RouterContext } from 'react-router-dom'

export const useRouterOnce = () => {
  return useMemo(() => useContext(__RouterContext), [])
}

export const useRouter = () => {
  return useContext(__RouterContext)
}

export const SubRoute = ({ path, ...params }) => {
  const { match: { url } } = useRouter()
  return <Route path={`${url}${path}`} {...params} />
}

export const SubLink = ({ to, ...params }) => {
  const { match: { url } } = useRouter()
  return <Link to={`${url}${to}`} {...params} />
}

export const SubNavLink = ({ to, ...params }) => {
  const { match: { url } } = useRouter()
  return <NavLink to={`${url}${to}`} {...params} />
}
