import React, { memo } from 'react'
import { Image } from 'react-konva'

const IMAGE_CACHE = {}

// Hooks API is unsupported in react-konva still
class _Image extends React.Component {
  state = {
    image: null
  }
  componentDidMount() {
    const { src } = this.props
    if (IMAGE_CACHE[src]) {
      this.setState({ image: IMAGE_CACHE[src] })
    } else {
      const image = new window.Image()
      image.src = this.props.src
      image.onload = () => {
        IMAGE_CACHE[src] = image
        this.setState({ image })
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { state, props, node } = this
    const isChangedWidth = prevProps.w !== props.w
    const isChangedHeight = prevProps.h !== props.h
    const isChangedSrc = prevProps.src !== props.src
    const isChangedImage = prevState.image !== state.image && (props.filters || prevProps.filters)
    const isChanged = isChangedWidth || isChangedHeight || isChangedSrc || isChangedImage
    if (isChanged && node) {
      node.cache()
    }
  }
  render() {
    if (!this.state.image) return null
    return (
      <Image
        image={this.state.image}
        ref={node => { this.node = node }}
        {...this.props}
      />
    )
  }
}

export default memo(_Image)