import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withFormik, Form, Field } from 'formik'
import { FormikEffect } from '../../modules/formik-effect'

import Files from './Files'


const EditField = ({ values, setFieldValue, submitForm }) => {
  return (<StyledContainer>
    <Files
      tags={['field']}
      accept={['image/png', 'image/jpeg', 'image/gif']}
      onSelect={(file) => setFieldValue('url', file.url)}
      size={42}
    />
    <Form>
      <FormikEffect onChange={() => submitForm()} />
    </Form>
  </StyledContainer>)
}

const mapStateToProps = (state) => {
  return {
    field: state.room.table.field
  }
}

const mapDispatchToProps = {
  setField: (field) => {
    return {
      type: '@TABLE_SET',
      item: {
        field
      }
    }
  }
}

const mapPropsToValues = ({ field }) => {
  return field
}

const handleSubmit = (values, { props }) => {
  const { setField } = props
  setField(values)
}

const StyledContainer = styled.div``

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
)(EditField)