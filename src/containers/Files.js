import React, { useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Dropzone from "react-dropzone";

const Files = ({ files, accept, tags, fileAdd, fileDeleteAll, children, ...props }) => {
  const handleDrop = useCallback(
    files => {
      files.forEach(file => {
        fileAdd(file, tags);
      });
    },
    [...tags]
  );
  const handleDeleteAllClick = useCallback(e => {
    e.preventDefault();
    fileDeleteAll();
  }, []);

  return (
    <StyledContainer {...props}>
      {/* <div className=""><input type="text" /></div> */}
      <Dropzone onDrop={handleDrop} disableClick accept={accept}>
        {({ getRootProps, getInputProps, isDragActive, open }) => {
          return (
            <div {...getRootProps()} data-active={isDragActive}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <StyledDropCover>
                  <div>
                    <span>Please drop</span>
                  </div>
                </StyledDropCover>
              ) : null}
              {children ? children({ files, open, fileDeleteAll }) : null}
              {/* <StyledFileItem size={size}>
                <span onClick={() => open()}>+</span>
              </StyledFileItem>
              {files.map(file => (
                <StyledFileItem size={size} key={file.id}>
                  <File onClick={onSelect} file={file} size={size} />
                </StyledFileItem>
              ))} */}
            </div>
          );
        }}
      </Dropzone>
    </StyledContainer>
  );
};

const mapStateToProps = (
  state,
  {
    accept = ["image/jpeg", "image/png", "image/gif"],
    size = 42,
    tags = [],
    onSelect
  }
) => {
  return {
    files: state.room.files.filter(file => {
      const isAcceptedFile = accept.includes(file.contentType);
      const isTaggedFile = tags.every(tag => {
        if (file.tags) {
          return true;
          return file.tags.includes(tag);
        } else {
          return true;
        }
      });
      return isAcceptedFile && isTaggedFile;
    }),
    size,
    accept,
    tags,
    onSelect
  };
};

const mapDispatchToProps = {
  fileAdd: (file, tags) => {
    return {
      type: "@FILE_ADD",
      file,
      tags
    };
  },
  fileDeleteAll: () => {
    return {
      type: "@FILE_DELETE_ALL"
    };
  }
};

const StyledContainer = styled.div`
  /* padding: 0 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;
  .body {
    outline: none;
    display: flex;
    flex-direction: column;
  } */
  > div {
    outline: none;
  }
`;

const StyledDropCover = styled.div`
  padding: 4px;
  position: absolute;
  top: 0;
  left: 8px;
  right: 8px;
  bottom: 0;
  background: #eee;
  div {
    border-radius: 4px;
    box-sizing: border-box;
    height: 100%;
    border: 2px dotted #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    font-size: 18px;
  }
`;

const StyledFileItem = styled.div`
  margin-right: 8px;
  padding: 4px;
  border-radius: 4px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: #eee;
  ::after {
    content: "";
    display: block;
  }
  img {
    object-fit: contain;
  }
  span {
    display: block;
    width: 42px;
    height: 42px;
    line-height: 40px;
    text-align: center;
    background: #222;
  }
  button {
    box-sizing: border-box;
    display: block;
    padding: 2px;
    width: 42px;
    height: 42px;
    word-break: break-all;
    font-size: 10px;
    border-radius: 0;
    border: none;
    line-height: 1.1;
    overflow: hidden;
    background: #eee;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

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
    margin: ${({ size }) => ~~((6 * size) / 64)}px;
    box-sizing: border-box;
    border: ${({ size }) => ~~((26 * size) / 64)}px solid #fff;
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
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Files);
