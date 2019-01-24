import React, { memo, useLayoutEffect, useRef } from "react";

const _Message = ({ name, type, text, images, color }) => (
  <div className="Message" from={name === "KP" ? "me" : null}>
    <h1>{name}</h1>
    <div className="body" style={{ backgroundColor: color }}>
      <p className={type}>{text}</p>
      {images
        ? images.map(() => (
            <figure>
              <img src={images.url} alt="" />
            </figure>
          ))
        : null}
    </div>
  </div>
);
const Message = memo(_Message);

const Messages = ({ messages }) => {
  const wrapRef = useRef(null);
  useLayoutEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollTop = 99999999;
    }
  });
  return (
    <div className="Messages" ref={wrapRef}>
      <div className="inner">
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
};

export default memo(Messages);
