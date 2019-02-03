import React, { useRef, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import DraggableObject from "../components/DraggableObject";

const touchmoveHandler = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

const Screen = ({ objects, field, remove, update }) => {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('touchmove', touchmoveHandler, { passive: false })
      return () => ref.current.removeEventListener('touchmove', touchmoveHandler)
    }
  }, [ref.current])
  return (
    <Styled.Container ref={ref}>
      <Styled.Board>
        <Field {...field}>
          {objects.map(object => {
            return <Obj key={object.id} item={object} onDelete={remove} onChange={update} />;
          })}
        </Field>
      </Styled.Board>
    </Styled.Container>
  );
};

const Obj = ({ item, baseSize = 120, onDelete, onChange }) => {
  const { id, position: positionAxis = [] } = item
  const [xAxis = 0, yAxis = 0] = positionAxis
  const x = baseSize * xAxis
  const y = baseSize * yAxis
  const [position, setPosition] = useState({ x, y })
  const onDragStop = useCallback((_, d) => {
    setPosition({ x: d.lastX, y: d.lastY })
    const item = {
      position: [
        ~~(d.lastX / baseSize),
        ~~(d.lastY / baseSize)
      ]
    }
    onChange({ id, item })
  }, [setPosition, onChange, id])
  useEffect(() => {
    setPosition({ x, y })
  }, [x, y])
  return (
    <Styled.Obj
      onDragStart={e => e.stopPropagation()}
      onDragStop={onDragStop}
      position={position}
      resizeGrid={[baseSize, baseSize]}
      dragGrid={[baseSize, baseSize]}
      enableResizing={false} // todo
      default={{
        x: x,
        y: y,
        width: baseSize * 1,
        height: baseSize * 1
      }}
    >
      {/* <Styled.Obj> */}
        <img
          draggable={false}
          width="100%"
          height="100%"
          src={item.images[0].url || "/icon-100x100.png"}
        />
        <button onClick={() => onDelete({ id: item.id })} type="button">
          remove
        </button>
      {/* </Styled.Obj> */}
    </Styled.Obj>
  );
};

const Field = ({ background, children }) => {
  if (!background) return null;
  return (
    <Rnd enableResizing={false}>
      <Styled.Field>
        <img src={background.url} draggable={false} />
      </Styled.Field>
      {children}
    </Rnd>
  );
};

const mapStateToProps = state => {
  return {
    field: state.room.fields[0],
    objects: state.room.objects
  };
};

const mapDispatchToProps = {
  remove: ({ id }) => {
    return {
      type: "@ROOM_OBJECT_DELETE",
      itemId: id
    };
  },
  update: ({ id, item }) => {
    return {
      type: "@ROOM_OBJECT_UPDATE",
      itemId: id,
      object: item
    };
  }
};

const ScreenContainer = ({ ...props }) => {
  return <Screen {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenContainer);

const Styled = {};
Styled.Container = styled.div`
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
`;
Styled.Board = styled.div`
  position: relative;
`;
Styled.Obj = styled(Rnd)`
  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
  figure {
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
Styled.Field = styled.div`
  width: 1280px;
  height: 960px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
