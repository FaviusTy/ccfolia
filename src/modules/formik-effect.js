// https://github.com/jaredpalmer/formik-effect/issues/4

import { Component } from 'react'
import { connect } from 'formik'

const compareValues = (values, nextValues) => {
  const keys = Object.keys(values)
  const nextKeys = Object.keys(nextValues)
  // compare keys
  if (keys.join(',') !== nextKeys.join(',')) {
    return false
  }
  // compare values
  return keys.some((key) => {
    return values[key] !== nextValues[key]
  })
}

class Effect extends Component {
  componentWillReceiveProps(nextProps) {
    const { values } = this.props.formik
    const {
      values: nextValues
    } = nextProps.formik
    if (compareValues(values, nextValues)) {
      this.props.onChange(nextValues)
    }
  }

  // eslint-disable-next-line
  render() {
    return null
  }
}

export default connect(Effect)