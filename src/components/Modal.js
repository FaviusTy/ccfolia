import React from 'react'
import styles from './styles/Modal.module.css'

const Modal = ({ onClose, children, show }) => (
  show ? (
    <div className={styles.wrapper} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose(e)
      }
    }}>
      <div className={styles.container}>
        {children}
      </div>
      <div className={styles.close} onClick={onClose}></div>
    </div>
  ) : null
)

export default Modal