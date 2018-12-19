import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from '../styles/ui/Frame.module.css'

const Frame = ({ onClose, children, title }) => (
  <CSSTransition classNames="fade" in appear={true} timeout={1000}>
    <div className={styles.wrapper} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose(e)
      }
    }}>
      <header>
        <h1>{title}</h1>
        <div className={styles.close} onClick={onClose}></div>
      </header>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  </CSSTransition>
)

export default memo(Frame)