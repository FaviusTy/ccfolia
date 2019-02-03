import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withFormik, Form, Field } from 'formik'
import { FaTimesCircle } from "react-icons/fa";
// import { FormikEffect } from '../modules/formik-effect'

const ObjectForm = ({  }) => {
  return <Styled.Container>
    <Form>
      <Field name="url" type="text" />
      <Field name="name" type="text" />
      <Field name="text" component="textarea" />
      <h2>Position</h2>
      <Field name="position[0]" type="number" />
      <Field name="position[1]" type="number" />
      <h2>Size</h2>
      <Field name="size[0]" type="number" />
      <h2>Status</h2>
      <Field name="size[0]" type="number" />
    </Form>
  </Styled.Container>
}

const StatusField = ({ form, push, remove }) => {
  const { status } = form.values;
  return (
    <Styled.Container>
      {status.map((state, i) => {
        return (
          <div key={i}>
            <figure>{state.url ? <img src={state.url} /> : null}</figure>
            <Field name={`states[${i}].url`} type="text" />
            <button onClick={() => remove(i)}>remove</button>
          </div>
        );
      })}
      <button onClick={() => push({ key: '', value: 0, max: 0 })} type="button">
        Add
      </button>
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
}

const mapPropsToValues = ({}) => {
  return {
    position: [0, 0],
    size: [1, 1]
  }
}

const handleSubmit = (values, { props }) => {
  console.log(values)

}

const ObjectFormContainer = ({ ...props }) => {
  return <ObjectForm {...props} />
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
)(ObjectFormContainer)


const Styled = {};
Styled.Container = styled.div`
`;
