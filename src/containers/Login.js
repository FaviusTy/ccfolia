import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Login = () => {
  return <Styled.Container>
  </Styled.Container>
}

const Styled = {}
Styled.Container = styled.div``

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
}

const LoginContainer = ({ ...props }) => {
  return <Login {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)