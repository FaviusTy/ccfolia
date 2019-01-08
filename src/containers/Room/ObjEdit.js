import React, { useCallback, useState, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'

import Files from './Files'

const ObjEdit = ({ obj, setObj, deleteObj, close }) => {
  // if (!obj) return null
  const _obj = obj || { id: 'test', url: '/bg.jpg', w: 1, h: 1, z: 0, angle: 0, locked: false }
  const { id, w, h, z, angle, locked } = _obj


  // callbacks
  const handleSubmit = useCallback((data) => {
    if (!id) return
    setObj({ id, item: data })
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
    setObj({ id, item: { url } })
  }, [id])

  return (<StyledContainer>
    <Formik
      key={id}
      initialValues={{ w, h, z, angle, locked }}
      onSubmit={handleSubmit}
    >{() => (
      <Form>
        <Files
          tags={['object', id]}
          accept={['image/png', 'image/jpeg', 'image/gif']}
          onSelect={handleSelect}
          size={42}
        />
        <StyledItems>
          <StyledItem>
            <label for={id + '-w'}>size</label>
            <Field id={id + '-w'} type="number" name="w" />
            <span>×</span>
            <Field type="number" name="h" />
          </StyledItem>
          <StyledItem>
            <label for={id + '-z'}>z-index</label>
            <Field id="id-z" type="number" name="z" />
          </StyledItem>
          <StyledItem>
            <label for={id + '-angle'}>angle</label>
            <Field type="number" name="angle" />
          </StyledItem>
          <StyledItem>
            <label for={id + '-locked'}>locked</label>
            <Field id={id + '-locked'} type="checkbox" name="locked" defaultChecked={locked} />
          </StyledItem>
          <StyledActions>
            <span>actions</span>
            <button type="submit">SET</button>
            <a onClick={handleDelete}>DELETE</a>
            <a onClick={handleClose}>CLOSE</a>
          </StyledActions>
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
  display: flex;
  padding: 0 4px 4px 4px;
  background: #eee;
`

const StyledItem = styled.div`
  label {
    margin-bottom: 2px;
    display: block;
    font-size: 10px;
    color: #444;
  }
  span {
    margin: 2px;
    color: #444;
    font-size: 10px;
  }
  input[type=number] {
    padding: 4px;
    border: none;
    width: 30px;
    border-radius: 16px;
    overflow: hidden;
  }
  input[type=checkbox] {
    margin: 4px auto;
    display: inline-block;
  }
  & + & {
    margin-left: 4px;
  }
`

const StyledActions = styled.div`
  display: flex;
  align-items: flex-end;
  span {
    margin-bottom: 2px;
    display: block;
    font-size: 10px;
    color: #444;
  }
  a, button {
    box-sizing: border-box;
    display: block;
    padding: 8px;
    border: none;
    line-height: 1;
    outline: none;
    background: #444;
    color: #fff;
    font-size: 10px;
    text-align: center;
    appearance: none;
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(ObjEdit)