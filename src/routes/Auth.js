import React, { useState, useEffect, memo } from 'react'
import firebase from 'firebase/app'
import firebaseui from 'firebaseui'
import { auth } from '../modules/react-firebase-hooks'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
// import { useGetter, useObserver } from '../stores/index'

import '../styles/Auth.css'

// TODO: support guest `cookie` user
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  callbacks: {}
}

const Auth = () => {
  const [state, setState] = useState(true)
  const user = {}
  // const user = useGetter('user')
  // useObserver('user')
  // useObserver('images', user.uid)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setState(true)
      } else {
        setState(false)
      }
    })
  }, [setState])
  if (state) return (<a className="AuthLogout" onClick={() => auth.signOut()}>{user.isGuest ? `guest:${user.uid.slice(0, 8)}...` : user.displayName}</a>)
  return (<div className="Auth">
    <h1>CCFOLIA</h1>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  </div>)
}

export default memo(Auth)