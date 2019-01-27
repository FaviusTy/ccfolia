import React, { memo } from "react";
import { Route, NavLink } from "react-router-dom";

import { CSSTransition } from "react-transition-group";
import styles from "../styles/ui/Frame.module.css";

const Frame = ({ onClose, children, title }) => (
  <CSSTransition classNames="_fade" in appear={true} timeout={1000}>
    <div
      className={styles.wrapper}
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose(e);
        }
      }}
    >
      <header>
        <h1>{title}</h1>
        <div className={styles.close} onClick={onClose} />
      </header>
      <div className={styles.container}>{children}</div>
      <footer>
        {/* <NavLink replace to={`/room/0/characters`}>👨‍👩‍👧‍👦</NavLink> */}
        <NavLink replace to={`/room/0/chatpalets`}>
          🎲
        </NavLink>
        {/* <NavLink replace to={`/room/0/dice`}>🎲</NavLink> */}
        <NavLink replace to={`/room/0/datasheats`}>
          📊
        </NavLink>
        <NavLink replace to={`/room/0/effects`}>
          🎬
        </NavLink>
        <NavLink replace to={`/room/0/objects`}>
          ⛄
        </NavLink>
        <NavLink replace to={`/room/0/notes`}>
          🗒
        </NavLink>
        <NavLink replace to={`/room/0/media`}>
          🎥
        </NavLink>
        {/* <NavLink replace to={`/room/0/console`}>💻</NavLink> */}
      </footer>
    </div>
  </CSSTransition>
);

export default memo(Frame);
