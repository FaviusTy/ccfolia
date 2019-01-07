import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { LocalForm, Control } from 'react-redux-form'

const ObjForm = ({ obj, onSubmit, onDelete, onClose }) => {
  const { id, url, w, h, z = 0, angle, locked } = obj

  // callbacks
  const handleSubmit = useCallback((data) => {
    if (!id) return
    onSubmit({ id, item: data })
  }, [id])
  const handleDelete = useCallback((e) => {
    e.preventDefault()
    if (!id) return
    onDelete({ id })
  }, [id])
  const handleClose = useCallback((e) => {
    e.preventDefault()
    onClose()
  }, [id])

  // render
  return (<LocalForm
    onSubmit={handleSubmit}
    onChange={handleSubmit}
    initialState={{ url, w, h, z, angle, locked }}
  >
    <Control.text model=".url" />
    <Control.text type="number" parser={Number} model=".w" />
    <Control.text type="number" parser={Number} model=".h" />
    <Control.text type="number" parser={Number} model=".z" />
    <Control.text type="number" parser={Number} model=".angle" />
    <Control.checkbox model=".locked" parser={Boolean} />
    <button>SET</button>
    <button onClick={handleDelete}>DELETE</button>
    <button onClick={handleClose}>CLOSE</button>
  </LocalForm>)
}

const ObjEdit = ({ obj, setObj, deleteObj, close }) => {
  if (!obj) return null
  return (<Container>
    <ObjForm
      key={obj.id}
      obj={obj}
      onSubmit={setObj}
      onDelete={deleteObj}
      onClose={close}
    />
  </Container>)
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

const Container = styled.div``

export default connect(mapStateToProps, mapDispatchToProps)(ObjEdit)