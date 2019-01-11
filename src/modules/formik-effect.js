// https://github.com/jaredpalmer/formik-effect/issues/4

import { useState, useEffect } from 'react'
import { connect } from 'formik'

const compareValues = (values, nextValues) => {
  const keys = Object.keys(values)
  const nextKeys = Object.keys(nextValues)
  // compare keys
  if (keys.join(',') !== nextKeys.join(',')) {
    return true
  }
  // compare values
  return keys.some((key) => {
    return values[key] !== nextValues[key]
  })
}

export const _FormikEffect = ({ onChange, formik }) => {
  const [values, setValues] = useState(formik.values)
  useEffect(() => {
    if (compareValues(values, formik.values)) {
      onChange(formik.values)
      setValues(formik.values)
    }
  })
  return null
}

export const FormikEffect = connect(_FormikEffect)
