import React, { useState, useEffect, memo } from 'react'
import firebase from 'firebase/app'
import firebaseui from 'firebaseui'
import { auth } from '../modules/react-firebase-hooks'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import '../styles/Auth.css'

// Configure FirebaseUI.
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
  // const [user, setUser] = useState()
  const [state, setState] = useState(true)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        // setUser(user)
        setState(true)
      } else {
        setState(false)
      }
    })
  }, [setState])
  if (state) return (<a class="AuthLogout" onClick={() => auth.signOut()}>Logout</a>)
  return (<div className="Auth">
    <h1>CCFOLIA</h1>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  </div>)
}

export default memo(Auth)