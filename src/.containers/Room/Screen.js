import React, { memo, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import GridCanvasImage from "../../components/GridCanvasImage";
import Draggable from "react-draggable";
import { Rnd } from "react-rnd";
import Blur from "react-blur";

import { useNoScrollRef } from "../../hooks/no-scroll-ref";

const _Obj = ({ obj, size, onDragEnd, onClick }) => {
  const {
    id,
    w = 1,
    h = 1,
    x = 0,
    y = 0,
    z = 0,
    url = "",
    angle = 0,
    locked = false
  } = obj;
  const width = w * size;
  const height = h * size;

  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x, y, width, height });
  useEffect(() => {
    setPos({ x, y, width, height });
  }, [x, y]);

  const handleDragStart = useCallback(e => {
    e.stopPropagation();
  }, []);

  const handleDragMove = useCallback(_ => {
    if (dragging) return;
    setDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_, data) => {
      const { lastX: x, lastY: y } = data;
      const position = { x, y };
      setPos(position);
      if (x !== pos.x || y !== pos.y) {
        onDragEnd({ id, position });
      }
    },
    [pos.x, pos.y, dragging]
  );

  const handleResizeStop = useCallback((_a, _b, _c, delta) => {
    setPos(delta);
  });

  const handleClick = useCallback(
    e => {
      if (dragging) {
        setDragging(false);
      } else {
        onClick(obj);
      }
    },
    [dragging, obj]
  );

  return (
    <Rnd
      position={pos}
      disabled={locked}
      onDragStart={handleDragStart}
      onDrag={handleDragMove}
      onDragStop={handleDragEnd}
      onResizeStop={handleResizeStop}
      resizeGrid={[30, 30]}
      dragGrid={[30, 30]}
    >
      <StyledItem width={width} height={height} z={z} onClick={handleClick}>
        <StyledRotateImage
          id={id}
          width={width}
          height={height}
          angle={angle}
          src={url}
          draggable="false"
        />
      </StyledItem>
    </Rnd>
  );
};

const Obj = memo(_Obj);

const Screen = ({
  background,
  field,
  objects,
  addObj,
  setObjPos,
  setObjForm
}) => {
  const width = field.col * field.baseSize;
  const height = field.row * field.baseSize;
  const containerRef = useNoScrollRef();

  return (
    <Container ref={containerRef}>
      <StyledBlur img={background.url} blurRadius={~~background.blur} />
      <Draggable>
        <StyledBoard width={width} height={height}>
          {!field.hidden ? (
            <GridCanvasImage
              url={field.url}
              size={field.baseSize}
              col={field.col}
              row={field.row}
              span={0}
              alpha={0.1}
            />
          ) : (
            <div
              style={{
                width: field.col * field.baseSize + "px",
                height: field.row * field.baseSize + "px",
                background: "rgba(255, 255, 255, 0.1)"
                // border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            />
          )}
          {objects.map(obj => (
            <Obj
              key={obj.id}
              obj={obj}
              size={field.baseSize}
              onDragEnd={setObjPos}
              onClick={setObjForm}
            />
          ))}
        </StyledBoard>
      </Draggable>
      <StyledControls>
        <button onClick={addObj}>New</button>
      </StyledControls>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    field: state.room.table.field,
    background: state.room.table.background,
    objects: state.room.objects
  };
};

const mapDispatchToProps = {
  addObj: () => {
    return {
      type: "@OBJECT_ADD",
      item: {
        x: 0,
        y: 0,
        z: 0,
        w: 1,
        h: 1,
        angle: 0,
        url: "/bg.jpg"
      }
    };
  },
  setObjPos: ({ id, position }) => {
    return {
      type: "@OBJECT_SET",
      id: id,
      item: {
        x: position.x,
        y: position.y
      }
    };
  },
  setObjForm: item => {
    return {
      type: "FORM_SET",
      key: "object",
      item
    };
  }
};

const Container = styled.div``;

const StyledBlur = styled(Blur)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const StyledBoard = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

const StyledControls = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const StyledItem = styled.figure`
  z-index: ${({ z }) => z};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  :active {
    background: rgba(255, 255, 255, 0.5);
  }
`;
const StyledRotateImage = styled.img`
  transform: ${({ angle }) => `rotateZ(${angle}deg)`};
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
