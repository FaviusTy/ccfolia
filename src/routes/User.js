import React, { useState, useEffect, useMemo, useCallback } from 'react'

import UserContainer from '../containers/User'

const UserRoute = ({ match: { params: { id } } }) => {
  return <UserContainer id={id} />
}

export default UserRoute