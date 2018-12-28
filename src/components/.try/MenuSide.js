import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

const MenuSide = ({ onBack }) => (
  <div className="MenuSide">
    <button onClick={onBack}>back</button>
  </div>
)

export default memo(MenuSide)
