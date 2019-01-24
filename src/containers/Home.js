import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Home = ({ rooms }) => {
  return <Styled.Container>
    <nav>
      {rooms.map(({ id }, i) => {
        return <Link to={`/rooms/${id}`}>ROOM No.{i}</Link>
      })}
      <button type="button">New Room</button>
    </nav>
  </Styled.Container>
}

const Styled = {}
Styled.Container = styled.div``

const mapStateToProps = (state) => {
  return {
    rooms: []
  }
}

const mapDispatchToProps = {
}

const HomeContainer = ({ ...props }) => {
  return <Home {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)