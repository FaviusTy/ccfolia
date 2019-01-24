import React, { useCallback, useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withFormik, Form, Field } from 'formik'
import { FormikEffect } from '../../modules/formik-effect'

import Files from './Files'

const Z_INDEX_RANGE_ARRAY = [...Array(12)].map((_, i) => i - 1)
const SIZE_RANGE_ARRAY = [...Array(36)].map((_, i) => i + 1)
const ANGLE_RANGE_ARRAY = [...Array(12)].map((_, i) => i * 30)

const EditObj = ({ obj, deleteObj, setFieldValue, submitForm, values }) => {

  // callbacks
  const handleChange = useCallback((item) => {
    submitForm()
  }, [id])

  if (!obj || !obj.id) return null
  const id = obj.id
  return (<StyledContainer>
    <Files
      tags={['object']}
      accept={['image/png', 'image/jpeg', 'image/gif']}
      onSelect={(file) => setFieldValue('url', file.url)}
      size={42}
    />
    <Form>
      <FormikEffect onChange={handleChange} />
      <StyledItems>
        <StyledItem>
          <label htmlFor={id + '-w'}>size</label>
          <StyledItemGroup>
            <Field id={id + '-w'} component="select" name="w">
              {SIZE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
            </Field>
            <span>×</span>
            <Field component="select" name="h">
              {SIZE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
            </Field>
          </StyledItemGroup>
        </StyledItem>
        <StyledItem>
          <label htmlFor={id + '-z'}>z-index</label>
          <StyledItemGroup>
            <Field id={id + '-z'} component="select" name="z">
              {Z_INDEX_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
            </Field>
          </StyledItemGroup>
        </StyledItem>
        <StyledItem>
          <label htmlFor={id + '-angle'}>rotate</label>
          <StyledItemGroup>
            <Field id={id + '-angle'} component="select" name="angle">
              {ANGLE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}&deg;</option>)}
            </Field>
          </StyledItemGroup>
        </StyledItem>
        <StyledItem>
          <label htmlFor={id + '-locked'}>locked</label>
          <StyledItemGroup>
            <Field id={id + '-locked'} type="checkbox" name="locked" checked={values.locked} />
          </StyledItemGroup>
        </StyledItem>
        <StyledAction>
          <button onClick={() => deleteObj({ id })} className="del" type="button">Delete</button>
          {/* <button onClick={close} type="button">CLOSE</button> */}
        </StyledAction>
      </StyledItems>
    </Form>
  </StyledContainer>)
}

const mapStateToProps = (state) => {
  const { object } = state.room.form
  return {
    obj: object
  }
}

const mapDispatchToProps = {
  setObj: ({ id, item }) => {
    return {
      type: '@OBJECT_SET',
      id,
      item
    }
  },
  deleteObj: ({ id }) => {
    return {
      type: '@OBJECT_DELETE',
      id
    }
  },
  close: () => {
    return {
      type: 'FORM_SET',
      key: 'object',
      item: null
    }
  },
}

const mapPropsToValues = ({ obj }) => {
  const defaultObj = { url: '/bg.jpg', w: 1, h: 1, z: 0, angle: 0, locked: false }
  const formObj = {
    ...defaultObj,
    ...obj
  }
  const { url, w, h, z, angle, locked } = formObj

  return { url, w, h, z, angle, locked }
}

const handleSubmit = (values, { props }) => {
  const { setObj, obj } = props
  setObj({ id: obj.id, item: values })
}

const StyledContainer = styled.div`
  /* position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100; */
  /* background: rgba(0, 0, 0, 0.5); */
  /* height: 100%; */
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  background: #fff;
`

const StyledItems = styled.div`
  margin-top: 8px;
  position: relative;
  display: flex;
  padding: 4px 8px 8px 8px;
  background: #eee;
`

const StyledItemGroup = styled.div`
  display: flex;
  align-items: center;
  span {
    margin: 0 2px;
    color: #444;
  }
`

const StyledItem = styled.div`
  label {
    margin-bottom: 2px;
    min-width: 42px;
    display: block;
    font-size: 10px;
    color: #444;
  }
  input[type=number] {
    padding: 4px;
    border: none;
    width: 30px;
    border-radius: 16px;
    overflow: hidden;
  }
  input[type=checkbox] {
    width: 20px;
    height: 20px;
    display: inline-block;
  }
  select {
    padding: 4px 8px;
    appearance: none;
    border: none;
    background: #fff;
    flex: 1;
    text-align: center;
  }
  & + & {
    margin-left: 8px;
  }
`

const StyledAction = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  bottom: 8px;
  display: flex;
  button {
    box-sizing: border-box;
    display: block;
    padding: 8px;
    border: none;
    border-radius: 2px;
    outline: none;
    background: #ccc;
    color: #444;
    font-size: 12px;
    text-align: center;
    justify-content: center;
    appearance: none;
  }
  button.del {
    background: #844;
    color: #fff;
  }
  button + button {
    margin-left: 4px;
  }
  button:disabled {
    background: #ccc;
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
)(EditObj)