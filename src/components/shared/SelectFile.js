import React, { memo, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";

import { useAction } from "../../hooks/redux-action";

import { FaCheck, FaPlus } from "react-icons/fa";

const arrayToMap = array => {
  return array.reduce((map, item, i) => {
    map[item] = i + 1;
    return map;
  }, {});
};

const SelectFile = ({
  files = [],
  selected = [],
  onSelect,
  onDrop,
  max = 99,
  accept = ["image/jpg", "image/png", "image/gif"],
  ...props
}) => {
  // state
  const [selectedUrls, setSelectedUrls] = useState(selected);
  const [show, setShow] = useState(false);
  // callback
  const handleClick = useCallback(({ url }) => {
    setSelectedUrls(state => {
      if (state.includes(url)) {
        return state.filter(fileUrl => fileUrl !== url);
      } else {
        if (state.length >= max) {
          return state;
        } else {
          return [...state, url];
        }
      }
    });
  });
  const handleSelect = useCallback(() => {
    onSelect(selectedUrls);
    setShow(false);
  });
  // memo
  const selectedUrlsMap = useMemo(() => arrayToMap(selectedUrls), [
    selectedUrls
  ]);
  // dispatch
  const { addFiles } = useAction(actions);
  return (
    <Container>
      <button onClick={() => setShow(state => !state)} {...props} />
      {show ? (
        <Dropzone onDrop={addFiles} disableClick accept={accept}>
          {({ getRootProps, getInputProps, isDragActive, open }) => {
            return (
              <Layer {...getRootProps()} data-active={isDragActive}>
                <Header>
                  <input {...getInputProps()} />
                  <Counter>
                    Selected {selectedUrls.length}/{max} items
                  </Counter>
                  <Button onClick={handleSelect} />
                </Header>
                <List>
                  {files.map((file, i) => {
                    const fileType = getFileType(file.contentType);
                    switch (fileType) {
                      case "image": {
                        return (
                          <Item
                            selected={selectedUrlsMap[file.url]}
                            key={i}
                            onClick={() => handleClick(file)}
                          >
                            <Image src={file.url} />
                          </Item>
                        );
                      }
                      case "audio": {
                        return (
                          <Item
                            selected={selectedUrlsMap[file.url]}
                            key={i}
                            onClick={() => handleClick(file)}
                          >
                            <Audio src={file.url} />
                          </Item>
                        );
                      }
                      default: {
                        return <Item key={i}>Null</Item>;
                      }
                    }
                  })}
                </List>
                <AddFileButton onClick={open}>
                  <FaPlus /> Add new file
                </AddFileButton>
              </Layer>
            );
          }}
        </Dropzone>
      ) : null}
    </Container>
  );
};

const getFileType = contentType => {
  return String(contentType).split("/")[0];
};

const actions = {
  addFiles: files => {
    return {
      type: "SELECT_FILE_ADD",
      files
    };
  }
};

const Container = styled.div`
  /* min-height: 50vh; */
`;
const Layer = styled.div`
  margin: auto;
  width: 100%;
  max-width: 420px;
  height: 55vh;
  max-height: 360px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
`;
const List = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  background: #fff;
`;
const Item = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 20%;
  max-width: 90px;
  background: #eee;
  ::before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;
  }
  ::after {
    content: "";
    box-sizing: border-box;
    padding: 4px;
    display: block;
    border: 1px solid #fff;
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
    line-height: 1;
    background: ${({ selected }) => (selected ? "#484" : "#eee")};
    color: #8c8;
    font-size: 10px;
    font-weight: 800;
  }
`;
const AddFileButton = styled.button`
  padding: 12px;
  border: none;
  background: none;
  color: #222;
  vertical-align: middle;
  font-size: 12px;
  svg {
    position: relative;
    top: 1px;
  }
`;
const Image = styled.img`
  outline: 1px solid #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Audio = styled.audio``;
const Header = styled.div`
  padding: 4px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  background: #fff;
`;
const Counter = styled.div`
  margin-left: 4px;
  font-size: 12px;
  color: #888;
`;
const Button = styled(FaCheck)`
  margin-left: auto;
  padding: 8px;
  border: none;
  display: block;
  /* background: #444; */
  color: #444;
  font-size: 12px;
  /* letter-spacing: 0.25em; */
`;

export default memo(SelectFile);
