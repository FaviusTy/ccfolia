import React, { memo, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const Draggable = ({ scale = 1, children }) => {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x, y, width, height });

  useEffect(() => {
    setPos({ x, y, width, height });
  }, [x, y]);

  const handleTouchStart = useCallback(e => {
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

  return <div>{children}</div>;
};

export default memo(Draggable);
