import React from 'react'
import { Filters } from 'konva'
import { Image } from 'react-konva'

// Hooks API is unsupported in react-konva still
class BlueImage extends React.Component {
  state = {
    image: null
  }
  componentDidMount() {
    const image = new window.Image()
    image.src = this.props.src
    image.onload = () => {
      this.setState({ image }, () => {
        this.node.cache()
      })
    }
  }
  render() {
    if (!this.state.image) return null
    return (
      <Image
        color={this.state.color}
        image={this.state.image}
        filters={[Filters.Blur]}
        ref={node => { this.node = node }}
        {...this.props}
      />
    )
  }
}

export default BlueImage