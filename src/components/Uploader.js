import React from 'react'
import Dropzone from 'react-dropzone'

const Uploader = ({ onDrop, children }) => {
  return (<div className="Uploader">
    <Dropzone onDrop={onDrop}>{({ getRootProps, getInputProps }) => (
      <div {...getRootProps()}>
        {children}
        <input {...getInputProps()} />
      </div>
    )}</Dropzone>
  </div>)
}

export default Uploader