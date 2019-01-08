import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

const getTypeFromContentType = (contentType) => {
  return String(contentType).split('/')[0]
}

const File = ({ file, onClick }) => {
  const fileType = getTypeFromContentType(file.contentType)
  const handleClick = useCallback(() => {
    onClick(file)
  }, [file])
  switch (fileType) {
    case 'image':
      return <img onClick={handleClick} src={file.url} width={64} height={64} draggable={false} />
    case 'audio':
      return <audio src={file.url} controls />
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
    <p><button onClick={handleDeleteAllClick}>DELETE ALL</button></p>
    <div className=""><input type="text" /></div>
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (<div {...getRootProps()} className="dropzone" data-active={isDragActive}>
          <input {...getInputProps()} />
          {isDragActive ? <div className="dropcover">
            <div className="dropcontent"><span>Drop here</span></div>
          </div> : null}
          <p>Drag &amp; Drop</p>
          <div className="body" onClick={(e) => e.stopPropagation()}>
            {files.map((file) => <div><File onClick={console.log} key={file.id} file={file} /></div>)}
          </div>
        </div>)
      }}
    </Dropzone>
  </Container>)
}

const mapStateToProps = (state) => {
  return {
    files: state.user.files.reverse()
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
      type: '@FILE_DELETE_ALL'
    }
  }
}

const Container = styled.div`
  margin-top: -160px;
  margin-left: -160px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 320px;
  background: #444;
  .dropzone {
    outline: none;
    display: flex;
    flex-direction: column;
  }
  .dropcover {
    padding: 8px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #444;
    .dropcontent {
      border-radius: 8px;
      box-sizing: border-box;
      height: 100%;
      border: 2px dotted #222;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #888;
      font-size: 24px;
    }
  }
  .body {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-content: flex-start;
    justify-content: flex-start;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    > div {
      width: 64px;
      height: 64px;
    }
  }
`

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
  :after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 3px;
    box-sizing: border-box;
    border: 13px solid #fff;
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