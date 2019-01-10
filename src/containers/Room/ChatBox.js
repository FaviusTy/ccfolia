import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { withFormik, Form, Field } from 'formik'

const ChatBox = ({ addMessage, submitForm }) => {
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitForm()
    }
  }, [handleSubmit])
  return (<StyledContainer>
    <Form>
      <Field component="select" name="color">
        <option>-</option>
        <option value="#ffcccc">Red</option>
        <option value="#ccccff">Blue</option>
        <option value="#ccffcc">Green</option>
        <option value="#ffffcc">Yellow</option>
        <option value="#ccffff">Sky</option>
      </Field>
      <Field type="text" name="name" />
      <Field component="textarea" name="text" onKeyPressCapture={handleKeyPress}></Field>
      <nav>
        <button type="button">🎲</button>
        <button type="button">+</button>
      </nav>
    </Form>
  </StyledContainer>)
}

const mapStateToProps = (state) => {
  return {
    name: state.user.auth.displayName
  }
}

const mapDispatchToProps = {
  addMessage: (item) => {
    return {
      type: '@MESSAGE_ADD',
      item
    }
  }
}

const mapPropsToValues = ({ name }) => {
  return {
    type: 'text',
    color: null,
    name: name || 'guest',
    text: ''
  }
}

const handleSubmit = (values, { props, setFieldValue }) => {
  props.addMessage(values)
  setFieldValue('text', '')
}

const StyledContainer = styled.div`
  padding: 4px;
  padding-bottom: 4px;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 4px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 4px);
  display: flex;
  background: #eee;
  form {
    display: flex;
    flex: 1;
    width: 60%;
  }
  form textarea {
    padding: 4px;
    border: none;
    outline: none;
    flex: 1;
    resize: none;
    height: 2.4em;
  }
  form button[type=submit] {
    border: none;
    /* outline: none; */
    padding: 4px 8px;
    background: #444;
    color: #fff;
  }
  form input[type=text] {
    padding: 4px;
    border: none;
    border-right: 4px solid #eee;
    width: 15%;
  }
  form select {
    outline: none;
    margin-right: 4px;
    border: none;
    border-radius: none;
    text-align: center;
    text-indent: -9999px;
    width: 8px;
    appearance: normal;
  }
  nav {
    display: flex;
  }

  nav button[type=button] {
    margin-left: 4px;
    border: none;
    width: 36px;
    background: #fff;
    text-align: center;
    text-decoration: none;
    color: #444;
    font-size: 16px;
  }
`

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })
)(ChatBox)
