import React, { useRef, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Draggable from "react-draggable";
// import DraggableObject from "../components/Draggable";

const touchmoveHandler = e => {
  e.stopPropagation();
  e.preventDefault();
};

const Screen = ({ objects, field, setting, remove, update, edit }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("touchmove", touchmoveHandler, {
        passive: false
      });
      return () =>
        ref.current.removeEventListener("touchmove", touchmoveHandler);
    }
  }, [ref.current]);
  if (!field) return null
  return (
    <Styled.Container ref={ref}>
      <Styled.Board style={{ transform: `scale(${setting.scale})` }}>
        <Field {...field} scale={setting.scale}>
          {objects.map(object => {
            return (
              <Obj
                key={object.id}
                item={object}
                onDelete={remove}
                onEdit={edit}
                onChange={update}
                scale={setting.scale}
              />
            );
          })}
        </Field>
      </Styled.Board>
    </Styled.Container>
  );
};

const Obj = ({ item, baseSize = 30, scale, onDelete, onEdit, onChange }) => {
  const { id, position: positionAxis = [0, 0], size = [1, 1] } = item;
  const [xAxis, yAxis] = positionAxis;
  const x = baseSize * xAxis;
  const y = baseSize * yAxis;
  const [position, setPosition] = useState({ x, y });
  const onDragStop = useCallback(
    (_, d) => {
      const xAxisFromPosition = Math.round(d.x / baseSize)
      const yAxisFromPosition = Math.round(d.y / baseSize)
      setPosition({ x: xAxisFromPosition * baseSize, y: yAxisFromPosition * baseSize });
      const item = {
        position: [xAxisFromPosition, yAxisFromPosition]
      };
      onChange(id, item);
    },
    [setPosition, onChange, id]
  );
  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);
  return (
    <Draggable
      onStart={e => e.stopPropagation()}
      onStop={onDragStop}
      scale={scale}
      position={position}
      grid={[baseSize * scale, baseSize * scale]}
    >
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <img
          draggable={false}
          width={baseSize * size[0]}
          height={baseSize * size[1]}
          src={item.images[0].url || "/icon-100x100.png"}
        />
        <button onClick={() => onDelete(item) } type="button">Delete</button>
        <button onClick={() => onEdit(item)} type="button">Edit</button>
      </div>
    </Draggable>
  );
};

const Field = ({ images, baseSize, size, scale, children }) => {
  return (
    <Draggable scale={scale}>
      <Styled.Field style={{
        width: baseSize * size[0] + 'px',
        height: baseSize * size[1] + 'px'
      }}>
        {images.map((image) => {
          return <Styled.Background src={image.url} draggable={false} />
        })}
        {children}
      </Styled.Field>
    </Draggable>
  );
};

const mapStateToProps = state => {
  return {
    field: state.room.fields[0],
    objects: state.room.objects,
    setting: state.setting.screen
  };
};

const mapDispatchToProps = {
  remove: ({ id }) => {
    return {
      type: "@ROOM_OBJECT_DELETE",
      itemId: id
    };
  },
  update: (id, item) => {
    return {
      type: "@ROOM_OBJECT_UPDATE",
      itemId: id,
      object: item
    };
  },
  edit: (item) => {
    return {
      type: "USER_FORM_SET",
      key: "character",
      item: item
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
  position: relative;
  width: 100%;
  height: 100%;
  /* background: #eee; */
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
`;
Styled.Board = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
Styled.Background = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.6);
`;
Styled.Field = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;