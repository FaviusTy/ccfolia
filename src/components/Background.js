import React, { memo } from "react";

const Background = ({ url }) => {
  const blur = 8;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `-${blur}px`,
          left: `-${blur}px`,
          right: `-${blur}px`,
          bottom: `-${blur}px`,
          backgroundSize: "cover",
          backgroundImage: `url(${url})`,
          backgroundRepeat: "none",
          filter: `blur(${blur}px) brightness(45%)`
        }}
      />
    </div>
  );
};

export default memo(Background);
