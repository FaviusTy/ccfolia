import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import serialize from 'form-serialize'

import { useGetter, useDispatcher, useObserver } from '../../stores/index'

const FieldEdit = ({ className }) => {
  const rid = useGetter('room:id')
  const field = useGetter('room:table:field')

  const { dispatch } = useDispatcher()

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const data = serialize(e.currentTarget, { hash: true })
    const col = ~~data.col
    const row = ~~data.row
    const baseSize = ~~data.baseSize
    const url = data.url || ''
    dispatch('room:table:set', rid, {
      field: {
        col,
        row,
        baseSize,
        url
      }
    })
  }, [field])

  return (<div className={className}>
    <form onSubmit={onSubmit}>
      col: <input name="col" type="number" defaultValue={field.col} />
      row: <input name="row" type="number" defaultValue={field.row} />
      size: <input name="baseSize" type="number" defaultValue={field.baseSize} />
      url: <input name="url" type="text" defaultValue={field.url} />
      <button>do</button>
    </form>
  </div>)
}

const StyledFieldEdit = styled(FieldEdit)`
`

export default memo(StyledFieldEdit)