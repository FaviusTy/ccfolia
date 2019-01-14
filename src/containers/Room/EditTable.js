import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withFormik, Form, Field } from 'formik'
import { FormikEffect } from '../../modules/formik-effect'

import Files from './Files'

const SIZE_RANGE_ARRAY = [...Array(36)].map((_, i) => i + 1)
const BLURSIZE_RANGE_ARRAY = [...Array(24)].map((_, i) => i * 4)
const BASESIZE_RANGE_ARRAY = [...Array(9)].map((_, i) => (i + 1) * 15)

const EditTable = ({ visible, values, submitForm, setFieldValue }) => {
  if (!visible) return null
  return (<StyledContainer>
    <h1>BGM</h1>
    <Files
      tags={['bgm']}
      accept={['audio/mp3', 'audio/wav']}
      onSelect={(file) => setFieldValue('media', {
        name: file.name,
        url: file.url,
        volume: 0.1,
        loop: true
      })}
      size={42}
    />
    <Files
      tags={['bgm']}
      accept={['audio/mp3', 'audio/wav']}
      onSelect={(file) => setFieldValue('media', {
        name: file.name,
        url: file.url,
        volume: 0.1,
        loop: true
      })}
      size={42}
    />

    <h1>Field</h1>
    <Files
      tags={['field']}
      accept={['image/png', 'image/jpeg', 'image/gif']}
      onSelect={(file) => setFieldValue('field.url', file.url)}
      size={42}
    />
    <Files
      tags={['field']}
      accept={['image/png', 'image/jpeg', 'image/gif']}
      onSelect={(file) => setFieldValue('field.url', file.url)}
      size={42}
    />

    <h1>Background</h1>
    <Files
      tags={['background']}
      accept={['image/png', 'image/jpeg', 'image/gif']}
      onSelect={(file) => setFieldValue('background.url', file.url)}
      size={42}
    />
    <Files
      tags={['background']}
      accept={['image/png', 'image/jpeg', 'image/gif']}
      onSelect={(file) => setFieldValue('background.url', file.url)}
      size={42}
    />

    <Form>
      <FormikEffect onChange={() => submitForm()} />
      <StyledItems>
        <StyledItem>
          <label>Panel size</label>
          <StyledItemGroup>
            <Field component="select" name="field.col">
              {SIZE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
            </Field>
            <span>×</span>
            <Field component="select" name="field.row">
              {SIZE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
            </Field>
          </StyledItemGroup>
        </StyledItem>
        <StyledItem>
          <label>Cell size</label>
          <StyledItemGroup>
            <Field component="select" name="field.baseSize">
              {BASESIZE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
            </Field>
          </StyledItemGroup>
        </StyledItem>
        <StyledItem>
          <label>Hide</label>
          <StyledItemGroup>
            <Field type="checkbox" name="field.hidden" checked={values.field.hidden} />
          </StyledItemGroup>
        </StyledItem>
        <StyledItem>
          <label>Blur size</label>
          <StyledItemGroup>
            <Field component="select" name="background.blur">
              {BLURSIZE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
            </Field>
          </StyledItemGroup>
        </StyledItem>
        <StyledAction>
          {/* <button onClick={() => deleteObj({ id })} className="del" type="button">Delete</button> */}
          {/* <button onClick={close} type="button">CLOSE</button> */}
        </StyledAction>
      </StyledItems>
    </Form>
  </StyledContainer>)
}

const mapStateToProps = (state) => {
  return {
    table: {
      field: state.room.table.field,
      media: state.room.table.media,
      background: state.room.table.background,
    },
    visible: state.room.form.table
  }
}

const mapDispatchToProps = {
  setTable: (item) => {
    return {
      type: '@TABLE_SET',
      item
    }
  }
}

const mapPropsToValues = ({ table }) => {
  return table
}

const handleSubmit = (values, { props }) => {
  const { setTable } = props
  setTable(values)
}

const StyledContainer = styled.div`
  padding-top: 8px;
  background: #fff;
  color: #111;
  h1 {
    margin-top: 4px;
    margin-bottom: 4px;
    padding: 0 8px;
    color: #888;
    font-size: 10px;
    font-weight: 800;
  }
  h1:first-child {
    margin-top: 0;
  }
  > div {
    margin-top: 8px;
  }
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
)(EditTable)
