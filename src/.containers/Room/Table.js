import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Dropzone from "react-dropzone";
import GridCanvasImage from "../../components/GridCanvasImage";
// import Draggable from 'react-draggable'
import { Rnd } from "react-rnd";

const Table = ({ handleDrop, images }) => {
  return (
    <Dropzone
      onDrop={handleDrop}
      disableClick
      accept={["image/jpeg", "image/png", "image/gif"]}
    >
      {({ getRootProps, getInputProps, isDragActive, open }) => {
        return (
          <StyledContainer
            {...getRootProps()}
            className="body"
            data-active={isDragActive}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <StyledDropCover>
                <div>
                  <span>Please drop</span>
                </div>
              </StyledDropCover>
            ) : null}
            <button onClick={() => open()}>+</button>
            <StyledBody>
              <Rnd enableResizing={false}>
                <GridCanvasImage
                  url={null}
                  size={30}
                  col={40}
                  row={30}
                  span={0}
                  alpha={0.1}
                />
                {images.map((url, i) => (
                  <Rnd
                    onDragStart={e => e.stopPropagation()}
                    resizeGrid={[30, 30]}
                    dragGrid={[30, 30]}
                    default={{
                      x: 0,
                      y: 0,
                      width: 30 * 30,
                      height: 30 * 21
                    }}
                  >
                    <img
                      draggable={false}
                      width="100%"
                      height="100%"
                      key={i}
                      src={url}
                    />
                  </Rnd>
                ))}
              </Rnd>
            </StyledBody>
          </StyledContainer>
        );
      }}
    </Dropzone>
  );
};

const mapStateToProps = state => {
  return {
    images: state.room.images
  };
};

const mapDispatchToProps = {
  handleDrop: files => {
    const url = URL.createObjectURL(files[0]);
    return {
      type: "TABLE_ADD_TEST",
      url
    };
  }
};

const StyledContainer = styled.div`
  height: 100%;
  transform-style: preserve-3d;
  perspective: 3000px;
  button {
    position: absolute;
    top: 60px;
    left: 10px;
  }
  img:hover {
    outline: 1px solid #fff;
  }
`;
const StyledBody = styled.div`
  height: 100%;
`;
const StyledDropCover = styled.div`
  padding: 4px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
