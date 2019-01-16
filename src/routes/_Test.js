import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { useAuth, useFirestore } from '../firebase/hooks'

import Auth from '../containers/User/Auth'

const _Test = () => {
  const auth = useAuth(() => {})
  return (<StyledContainer>
    <Auth />
    <div>
      <button type="button">IEEEI</button>
    </div>
  </StyledContainer>)
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
}

const StyledContainer = styled.div``

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Test)