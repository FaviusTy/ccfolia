import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from '../components/styles/Navigation.module.css'

const Navigation = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <NavLink className={styles.btn} to="/">home</NavLink>
      <NavLink className={styles.btn} to="/objects">objects</NavLink>
      <NavLink className={styles.btn} to="/books">scenario</NavLink>
    </div>
  </div>
)

export default Navigation