import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from '../components/styles/Navigation.module.css'

const Navigation = ({ url, onBack }) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <NavLink className={styles.btn} to="/">back</NavLink>
      <NavLink replace className={styles.btn} to={`${url}/console`}>console</NavLink>
      {/* <NavLink replace className={styles.btn} to={`${url}/objects`}>objects</NavLink> */}
      {/* <NavLink replace className={styles.btn} to={`${url}/books`}>assets</NavLink> */}
      {/* <NavLink replace className={styles.btn} to={`${url}/effects`}>effects</NavLink> */}
    </div>
  </div>
)

export default Navigation