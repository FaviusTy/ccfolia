import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Controls = ({ addObj }) => {
  return (<StyledContainer>
    <button type="button" onClick={addObj}>Obj</button>
  </StyledContainer>)
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  addObj: () => {
    return {
      type: 'FORM_SET',
      key: 'object',
      item: { id: Date.now().toString(34) }
    }
  }
}

const StyledContainer = styled.div``

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)