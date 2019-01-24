import React, { memo } from "react";
import styled from "styled-components";

const Board = ({ className, children, ...props }) => {
  return (
    <div className={className}>
      <div className="container" {...props}>
        {children}
      </div>
    </div>
  );
};

const StyledBoard = styled(Board)`
  transform-style: preserve-3d;
  perspective: 1200;
  /* z-index: 1; */
  /* display: content; */

  .container {
    transform-origin: center;
    transform-style: preserve-3d;
    transform: ${props =>
      `translate3d(0, 0, 0px) rotateX(${props.rotateX}deg)`};
    background: red;
    /* opacity: 0.6; */
  }
  .container:nth-child(2) {
    transform: ${props =>
      `translate3d(0, 0, 30px) rotateX(${props.rotateX}deg)`};
  }
  canvas {
    vertical-align: middle;
  }
`;

export default memo(StyledBoard);
