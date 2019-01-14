import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { FaComment, FaDiceD20, FaChessPawn, FaImages } from 'react-icons/fa'

const Controls = ({ addObj, editTable, close }) => {
  return (<StyledContainer>
    <button type="button" onClick={() => editTable()}><FaImages /></button>
    <button type="button"><FaDiceD20 /></button>
    <button type="button">E</button>
    <button type="button" onClick={() => addObj()}><FaChessPawn /></button>
    <button type="button" onClick={() => close()}><FaComment /></button>
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
  },
  editTable: () => {
    return {
      type: 'FORM_SET',
      key: 'table',
      item: {}
    }
  },
  close: () => {
    return {
      type: 'FORM_RESET'
    }
  },
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 8px;
  bottom: 42%;
  button {
    border: none;
    border-radius: 50%;
    outline: none;
    width: 36px;
    height: 36px;
    line-height: 1;
    background: rgba(0, 0, 0, 0.4);
    color: #eee;
    font-size: 14px;
  }
  button + button {
    margin-top: 8px;
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)