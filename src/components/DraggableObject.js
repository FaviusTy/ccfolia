import React, { memo, useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";

const DraggableObject = ({ item, baseSize = 30, scale = 1, onChange, onClick }) => {
  const {
    id,
    images = [],
    size: [w = 0, h = 0],
    position: [x = 0, y = 0, z = 0],
    angle = 0,
    locked = false
  } = item;

  const width = w * baseSize;
  const height = h * baseSize;

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
        onChange({ id, position });
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
        onClick(item);
      }
    },
    [dragging, item]
  );

  return (
    <Rnd
      position={pos}
      disabled={locked}
      onDragStart={handleDragStart}
      onDrag={handleDragMove}
      onDragStop={handleDragEnd}
      onResizeStop={handleResizeStop}
      resizeGrid={[baseSize, baseSize]}
      dragGrid={[baseSize, baseSize]}
    >
      <Styled.Item width={width} height={height} z={z} onClick={handleClick}>
        <Styled.RotateImage
          id={id}
          width={width}
          height={height}
          angle={angle}
          src={images[0].url}
          draggable="false"
        />
      </Styled.Item>
    </Rnd>
  );
};

const Styled = {}

Styled.Item = styled.figure`
  z-index: ${({ z }) => z};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  :active {
    background: rgba(255, 255, 255, 0.5);
  }
`;
Styled.RotateImage = styled.img`
  transform: ${({ angle }) => `rotateZ(${angle}deg)`};
`;

export default memo(DraggableObject)