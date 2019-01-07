import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import firebase from 'firebase/app'
import firebaseui from 'firebaseui'
import { useAuth } from '../../firebase/hooks'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  callbacks: {}
}

const Auth = ({ user }) => {
  const auth = useAuth(() => {})
  if (user.uid || !user.initialized) return (<LogoutButton onClick={() => auth.signOut()}>
    {user.isGuest ? `guest:${user.uid.slice(0, 8)}...` : user.displayName}
  </LogoutButton>)
  return (<Container>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  </Container>)
}

const mapStateToProps = (state) => {
  return {
    user: state.user.auth
  }
}

const mapDispatchToProps = {
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99999999;
  padding: 15px;
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
`

const LogoutButton = styled.button`
  padding: 2px 4px;
  border-radius: 0 0 0 4px;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99999999;
  background: rgba(0, 0, 0, 0.1);
  font-size: 10px;
  color: #fff;
  opacity: 0.3;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
