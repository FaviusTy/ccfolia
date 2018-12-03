import React, { memo } from 'react'
import { Filters } from 'konva'
import Image from './Image'

// Hooks API is unsupported in react-konva still
class BlueImage extends React.Component {
  render() {
    return (
      <Image
        filters={[Filters.Blur]}
        {...this.props}
      />
    )
  }
}

export default memo(BlueImage)