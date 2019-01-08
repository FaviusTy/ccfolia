import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

const getTypeFromContentType = (contentType) => {
  return String(contentType).split('/')[0]
}

const File = ({ file, size, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(file)
  }, [file])
  if (!file.uploaded) return <StyledLoader size={size} />
  const fileType = getTypeFromContentType(file.contentType)
  switch (fileType) {
    case 'image':
      return <img onClick={handleClick} src={file.url} width={size} height={size} draggable={false} />
    case 'audio':
      return <audio src={file.url} controls />
    default:
      return <StyledLoader size={size} />
  }
}

const Files = ({ files, accept, tags, size, onSelect, fileAdd, fileDeleteAll }) => {
  const handleDrop = useCallback((files) => {
    files.forEach((file) => {
      fileAdd(file, tags)
    })
  }, [...tags])
  const handleDeleteAllClick = useCallback((e) => {
    e.preventDefault()
    fileDeleteAll()
  }, [])

  return (<StyledContainer>
    {/* <p><a onClick={handleDeleteAllClick}>DELETE ALL</a></p> */}
    {/* <div className=""><input type="text" /></div> */}
    <Dropzone onDrop={handleDrop} accept={accept}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (<div {...getRootProps()} className="container" data-active={isDragActive}>
          <input id="fileInput" {...getInputProps()} />
          {isDragActive ? <StyledDropCover>
            <div><span>Please drop</span></div>
          </StyledDropCover> : null}
          <StyledBody onClick={(e) => e.stopPropagation()}>
            <div className="inner">
              <StyledFileItem size={size}><label for="fileInput">+</label></StyledFileItem>
              {files.map((file) => <StyledFileItem size={size}>
                <File onClick={onSelect} key={file.id} file={file} size={size} />
              </StyledFileItem>)}
            </div>
          </StyledBody>
        </div>)
      }}
    </Dropzone>
  </StyledContainer>)
}

const mapStateToProps = (state, {
  accept = ['image/jpeg', 'image/png', 'image/gif'],
  size = 42,
  tags = [],
  onSelect,
}) => {
  return {
    files: state.user.files.filter((file) => {
      const isAcceptedFile = accept.includes(file.contentType)
      const isTaggedFile = tags.every((tag) => {
        if (file.tags) {
          return file.tags.includes(tag)
        } else {
          return true
        }
      })
      return isAcceptedFile && isTaggedFile
    }),
    size,
    accept,
    tags,
    onSelect
  }
}

const mapDispatchToProps = {
  fileAdd: (file, tags) => {
    return {
      type: '@FILE_ADD',
      file,
      tags
    }
  },
  fileDeleteAll: () => {
    return {
      type: '@FILE_DELETE_ALL'
    }
  }
}

const StyledContainer = styled.div`
  box-sizing: border-box;
  padding: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  .container {
    outline: none;
    display: flex;
    flex-direction: column;
  }
`

const StyledBody = styled.div`
  /* padding-bottom: 4px; */
  /* flex-wrap: wrap; */
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  .inner {
    display: flex;
    /* align-content: flex-start; */
    /* justify-content: flex-start; */
  }
`

const StyledDropCover = styled.div`
  padding: 4px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #444;
  div {
    border-radius: 8px;
    box-sizing: border-box;
    height: 100%;
    border: 2px dotted #222;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 18px;
  }
`

const StyledFileItem = styled.div`
  margin-right: 8px;
  padding: 4px;
  border-radius: 4px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: #eee;
  img {
    object-fit: contain;
  }
  label {
    display: block;
    width: 42px;
    height: 42px;
    line-height: 40px;
    text-align: center;
    background: #222;
  }
`

const StyledLoader = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  :after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: ${({ size }) => ~~(6 * size / 64)}px;
    box-sizing: border-box;
    border: ${({ size }) => ~~(26 * size / 64)}px solid #fff;
    border-color: #888 transparent #888 transparent;
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