import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

const getTypeFromContentType = (contentType) => {
  return String(contentType).split('/')[0]
}

const File = ({ file }) => {
  const fileType = getTypeFromContentType(file.contentType)
  switch (fileType) {
    case 'image':
      return <img src={file.url} width={100} height={100} />
    default:
      return <Loader />
  }
}

const Files = ({ files, fileAdd, fileDeleteAll }) => {
  const handleDrop = useCallback((files) => {
    files.forEach((file) => {
      fileAdd(file)
    })
  }, [])
  const handleDeleteAllClick = useCallback((e) => {
    e.preventDefault()
    fileDeleteAll()
  }, [])
return (<Container>
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div {...getRootProps()} data-active={isDragActive} >
            <input {...getInputProps()} />
            {isDragActive ?
              <p>IE</p> :
              <p>DD</p>
            }
          </div>
        )
      }}
    </Dropzone>
    <button onClick={handleDeleteAllClick}>DELETE ALL</button>
    {files.map((file) => <File key={file.id} file={file} />)}
  </Container>)
}

const mapStateToProps = (state) => {
  return {
    files: state.user.files
  }
}

const mapDispatchToProps = {
  fileAdd: (file) => {
    return {
      type: '@FILE_ADD',
      file
    }
  },
  fileDeleteAll: () => {
    return {
      type: '@FILE_DELETE_ALL',
    }
  }
}

const Container = styled.div``

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  :after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 6px;
    box-sizing: border-box;
    border: 26px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(Files)