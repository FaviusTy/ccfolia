import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withFormik, Form, Field } from 'formik'

const FieldEdit = ({ field }) => {
  if (!field) return null
  return <Styled.Container>
    <Form>
      <h2>Field</h2>
      <Field name="images[0].url" type="text" />
      <Field name="baseSize" type="number" />
      <Field name="size[0]" type="number" />
      <Field name="size[1]" type="number" />
      <button type="submit">SUBMIT</button>
    </Form>
  </Styled.Container>
}

const Styled = {}
Styled.Container = styled.div``

const mapStateToProps = (state) => {
  return {
    field: state.room.form.field
  }
}

const mapDispatchToProps = {
  setField: (field) => {
    return {
      type: "@ROOM_FIELD_SET",
      field
    }
  },
  close: () => {
    return {
      type: "ROOM_FORM_SET",
      key: "field",
      item: null
    }
  }
}

const mapPropsToValues = ({}) => {
  return {
    images: [{ url: '/bg.jpg' }],
    baseSize: 30,
    size: [30, 20]
  }
}

const handleSubmit = (values, { props }) => {
  props.setField(values)
}

const FieldEditContainer = ({ ...props }) => {
  return <FieldEdit {...props} />
}

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
)(FieldEditContainer)