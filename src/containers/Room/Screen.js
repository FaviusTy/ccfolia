import React, { memo, useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import GridCanvasImage from '../../components/GridCanvasImage'
import Draggable from 'react-draggable'

import { useNoScrollRef } from '../../hooks/no-scroll-ref'

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

  const [dragging, setDragging] = useState(false)
  const [pos, setPos] = useState({ x, y })
  useEffect(() => {
    setPos({ x, y })
  }, [x, y])

  const handleDragStart = useCallback((e) => {
    e.stopPropagation()
  }, [])

  const handleDragMove = useCallback((e) => {
    if (dragging) return
    setDragging(true)
  }, [])

  const handleDragEnd = useCallback((e, position) => {
    setPos(position)
    if (position.x !== pos.x || position.y !== pos.y) {
      onDragEnd({ id, position })
    }
  }, [pos.x, pos.y, dragging])

  const handleClick = useCallback((e) => {
    if (dragging) {
      setDragging(false)
    } else {
      onClick(obj)
    }
  }, [dragging])

  return (<Draggable
    position={pos}
    disabled={locked}
    onStart={handleDragStart}
    onDrag={handleDragMove}
    onStop={handleDragEnd}
  >
    <StyledItem width={width} height={height} z={z} onClick={handleClick}>
      <StyledRotateImage id={id} width={width} height={height} angle={angle} src={url} draggable="false" />
    </StyledItem>
  </Draggable>)
}

const Obj = memo(_Obj)

const Screen = ({ field, objects, addObj, setObjPos, setObjForm }) => {
  const width = field.col * field.baseSize
  const height = field.row * field.baseSize
  const containerRef = useNoScrollRef()

  return (<Container ref={containerRef}>
    <Draggable><StyledBoard width={width} height={height}>
    <GridCanvasImage
      url={field.url}
      size={field.baseSize}
      col={field.col}
      row={field.row}
      span={0}
      alpha={0.1}
    />
    {objects.map((obj) => <Obj
      key={obj.id}
      obj={obj}
      size={field.baseSize}
      onDragEnd={setObjPos}
      onClick={setObjForm}
    />)}
    </StyledBoard></Draggable>
    <StyledControls>
      <button onClick={addObj}>New</button>
    </StyledControls>

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
      id: id,
      item: {
        x: position.x,
        y: position.y
      }
    }
  },
  setObjForm: (item) => {
    return {
      type: 'FORM_SET',
      key: 'object',
      item
    }
  }
}

const Container = styled.div``

const StyledBoard = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`

const StyledControls = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
`

const StyledItem = styled.figure`
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
const StyledRotateImage = styled.img`
  transform: ${({ angle }) => `rotateZ(${angle}deg)`};
`

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
