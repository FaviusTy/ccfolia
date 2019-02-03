import React, { useRef, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import DraggableObject from "../components/DraggableObject";

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

const Obj = ({ item, baseSize = 120, scale, onDelete, onEdit, onChange }) => {
  const { id, position: positionAxis = [] } = item;
  const [xAxis = 0, yAxis = 0] = positionAxis;
  const x = baseSize * xAxis;
  const y = baseSize * yAxis;
  const [position, setPosition] = useState({ x, y });
  const onDragStop = useCallback(
    (_, d) => {
      setPosition({ x: d.lastX, y: d.lastY });
      const item = {
        position: [~~(d.lastX / baseSize), ~~(d.lastY / baseSize)]
      };
      onChange({ id, item });
    },
    [setPosition, onChange, id]
  );
  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);
  return (
    <Styled.Obj
      onDragStart={e => e.stopPropagation()}
      onDragStop={onDragStop}
      scale={scale}
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
      <img
        draggable={false}
        width="100%"
        height="100%"
        src={item.images[0].url || "/icon-100x100.png"}
      />
      {scale}
      <button onClick={() => onDelete({ id: item.id })} type="button">
        remove
      </button>
      <button onClick={() => onEdit({ item })} type="button">
        edit
      </button>
    </Styled.Obj>
  );
};

const Field = ({ background, children }) => {
  if (!background) return null;
  return (
    <Styled.Field>
      <img src={background.url} draggable={false} />
      {children}
    </Styled.Field>
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
  update: ({ id, item }) => {
    return {
      type: "@ROOM_OBJECT_UPDATE",
      itemId: id,
      object: item
    };
  },
  edit: ({ item }) => {
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
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
  }
`;
