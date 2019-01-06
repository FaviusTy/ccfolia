import React, { memo, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import GridCanvasImage from '../../components/GridCanvasImage'
import Draggable from 'react-draggable'

const _Obj = ({ obj, size, onDragEnd, onClick }) => {
  const {
    id,
    w = 1,
    h = 1,
    x = 0,
    y = 0,
    z = 0,
    url = '',
    angle = 0,
    locked = false
  } = obj
  const width = w * size
  const height = h * size

  const [pos, setPos] = useState({ x, y })
  useEffect(() => {
    setPos({ x, y })
  }, [x, y])

  const handleDragStart = useCallback((e) => {
    e.stopPropagation()
  }, [])

  const handleDragEnd = useCallback((_, position) => {
    setPos(position)
    if (position.x !== pos.x || position.y !== pos.y) {
      onDragEnd({ id, position })
    }
  }, [pos.x, pos.y])

  const handleClick = useCallback(() => {
    onClick(obj)
  }, [obj])

  return (<Draggable
    position={pos}
    disabled={locked}
    onStart={handleDragStart}
    onStop={handleDragEnd}
  >
    <Item width={width} height={height} z={z} onClick={handleClick}>
      <Image id={id} width={width} height={height} angle={angle} src={url} draggable="false" />
    </Item>
  </Draggable>)
}

const Obj = memo(_Obj)

const Screen = ({ field, objects, addObj, setObjPos, setObjForm }) => {
  const width = field.col * field.baseSize
  const height = field.row * field.baseSize

  return (<Container>
    <Draggable><Board width={width} height={height}>
    <GridCanvasImage
      url={field.url}
      size={field.baseSize}
      col={field.col}
      row={field.row}
      span={0}
      alpha={1}
    />
    {objects.map((obj) => <Obj
      key={obj.id}
      obj={obj}
      size={field.baseSize}
      onDragEnd={setObjPos}
      onClick={setObjForm}
    />)}
    </Board></Draggable>
    <Controls>
      <button onClick={addObj}>New</button>
    </Controls>

  </Container>)
}

const mapStateToProps = (state) => {
  return {
    field: state.room.table.field,
    objects: state.room.objects
  }
}

const mapDispatchToProps = {
  addObj: () => {
    return {
      type: '@OBJECT_ADD',
      roomId: '0',
      item: {
        x: 0,
        y: 0,
        z: 0,
        w: 1,
        h: 1,
        angle: 0,
        url: '/bg.jpg'
      }
    }
  },
  setObjPos: ({ id, position }) => {
    return {
      type: '@OBJECT_SET',
      roomId: '0',
      itemId: id,
      item: {
        x: position.x,
        y: position.y
      }
    }
  },
  setObjForm: (item) => {
    return {
      type: 'FORM_OBJECT_SET',
      roomId: '0',
      item
    }
  }
}

const Container = styled.div``

const Board = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`

const Controls = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
`

const Item = styled.figure`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ z }) => z};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  :active {
    background: rgba(255, 255, 255, 0.5);
  }
`
const Image = styled.img`
  transform: ${({ angle }) => `rotateZ(${angle}deg)`};
`

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
