import React, { useCallback, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'

import Files from './Files'

const Z_INDEX_RANGE_ARRAY = [...Array(12)].map((_, i) => i - 1)
const SIZE_RANGE_ARRAY = [...Array(36)].map((_, i) => i + 1)
const ANGLE_RANGE_ARRAY = [...Array(12)].map((_, i) => i * 30)

const defaultObj = { id: 'test', url: '/bg.jpg', w: 1, h: 1, z: 0, angle: 0, locked: false }
const ObjEdit = ({ obj, setObj, deleteObj, close }) => {
  if (!obj) return null
  const { id, url, w, h, z, angle, locked } = {
    ...defaultObj,
    ...obj
  }
  const [formObj, setFormObj] = useState({ url, w, h, z, angle, locked })
  useEffect(() => {
    setFormObj({ url, w, h, z, angle, locked })
  }, [id])

  // callbacks
  const handleSubmit = useCallback((data) => {
    if (!id) return
    console.log(data)
    setObj({ id, item: data })
    setFormObj(data)
  }, [id])
  const handleDelete = useCallback((e) => {
    e.preventDefault()
    if (!id) return
    deleteObj({ id })
  }, [id])
  const handleClose = useCallback((e) => {
    e.preventDefault()
    close()
  }, [id])
  const handleSelect = useCallback(({ url }) => {
    const data = {
      ...formObj,
      url
    }
    setObj({ id, item: data })
    setFormObj(data)
  }, [id])

  return (<StyledContainer>
    <Formik
      key={id}
      initialValues={formObj}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >{({ dirty }) => (
      <Form>
        <Files
          tags={['object', id]}
          accept={['image/png', 'image/jpeg', 'image/gif']}
          onSelect={handleSelect}
          size={42}
        />
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
            <label htmlFor={id + '-angle'}>angle</label>
            <StyledItemGroup>
              <Field id={id + '-angle'} component="select" name="angle">
                {ANGLE_RANGE_ARRAY.map((i) => <option key={i} value={i}>{i}</option>)}
              </Field>
            </StyledItemGroup>
          </StyledItem>
          <StyledItem>
            <label htmlFor={id + '-locked'}>locked</label>
            <StyledItemGroup>
              <Field id={id + '-locked'} type="checkbox" name="locked" defaultChecked={locked} />
            </StyledItemGroup>
          </StyledItem>
          <StyledAction>
            <button disabled={!dirty}>SAVE</button>
          </StyledAction>
        </StyledItems>
      </Form>
    )}</Formik>
  </StyledContainer>)
}

const mapStateToProps = (state) => {
  return {
    obj: state.room.form.object
  }
}

const mapDispatchToProps = {
  setObj: ({ id, item }) => {
    return {
      type: '@OBJECT_SET',
      id,
      item: item
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

const StyledContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
`

const StyledItems = styled.div`
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
  a, button {
    box-sizing: border-box;
    display: block;
    padding: 8px;
    border: none;
    border-radius: 4px;
    line-height: 100%;
    height: 100%
    outline: none;
    background: #444;
    color: #fff;
    font-size: 12px;
    text-align: center;
    appearance: none;
  }
  button:disabled {
    background: #ccc;
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(ObjEdit)