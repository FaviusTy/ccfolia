import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Route } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Dropzone from "react-dropzone";

import CharacterForm from "../containers/CharacterForm";
import Screen from "../containers/Screen";
import ChatBox from "../containers/ChatBox";
import Messages from "../containers/Messages";
import Tracks from "../containers/Tracks";
import RoomMenu from "../containers/RoomMenu";
import Background from "../containers/Background";
import FieldEdit from "../containers/FieldEdit";
import Settings from "../containers/Settings";

const Room = ({ view, form, uploadAnyFiles, closeControls, closeForm }) => {
  return (
    <>
      <Background />
      <Dropzone onDrop={uploadAnyFiles} disableClick>
        {({ getRootProps, getInputProps, isDragActive, open }) => {
          return (
            <Styled.Container {...getRootProps()} data-active={isDragActive}>
              <input {...getInputProps()} />
              {isDragActive ? "D&D" : null}
              <Styled.InformationArea>
                <Tracks />
              </Styled.InformationArea>
              <Styled.ViewportArea>
                <Screen />
              </Styled.ViewportArea>
              <Styled.ControlArea>
                <Styled.ControlContentArea>
                  <Messages />
                </Styled.ControlContentArea>
                <ChatBox />
                <Styled.ControlNavigationArea>
                  <RoomMenu />
                </Styled.ControlNavigationArea>
              </Styled.ControlArea>
              {form.character ? (
                <Styled.ControlPanelArea>
                  <Styled.CloseButton onClick={closeForm} type="button" />
                  <CharacterForm />
                </Styled.ControlPanelArea>
              ) : null}
              {view.controls ? (
                <Styled.ControlPanelArea>
                  <Styled.CloseButton onClick={closeControls} type="button" />
                  {view.controls === "fields" ? <FieldEdit /> : null}
                  {view.controls === "settings" ? <Settings /> : null}
                </Styled.ControlPanelArea>
              ) : null}
            </Styled.Container>
          );
        }}
      </Dropzone>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    id,
    view: state.room.view,
    form: state.room.form
  };
};

const mapDispatchToProps = {
  init: id => {
    return {
      type: "@ROOM_INIT",
      id
    };
  },
  uploadAnyFiles: files => {
    return {
      type: "@ROOM_ANYFILES_UPLOAD",
      files: files
    };
  },
  closeControls: () => {
    return {
      type: "ROOM_VIEW_SET",
      key: "controls",
      value: null
    };
  },
  closeForm: () => {
    return {
      type: "ROOM_FORM_SET",
      key: "character",
      item: null
    };
  }
};

const RoomContainer = ({ init, ...props }) => {
  useEffect(() => {
    init(props.id);
    return () => init(null);
  }, [props.id]);
  return <Room {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomContainer);

const Styled = {};
Styled.Container = styled.div`
  /* position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px; */
`;
Styled.ControlArea = styled.div`
  /* margin: 0 auto; */
  margin-left: auto;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  z-index: 10;
  max-height: 50vh;
  max-width: 420px;
  /* overflow: scroll; */
  /* background: #f5f5f5; */
  /* background: rgba(240, 240, 240, 0.90); */
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.4); */
`;
Styled.ControlContentArea = styled.div`
  margin-bottom: -16px;
  padding-bottom: 16px;
  height: 240px;
  /* flex: 1; */
  /* overflow: hidden; */
  position: absolute;
  z-index: -1;
  bottom: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
`;
Styled.ControlPanelArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);

  /* flex: 1;
  overflow: auto;
  border-radius: 12px; */
`;
Styled.CloseButton = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 1;
  background: transparent;
  ::after,
  ::before {
    content: "";
    display: block;
    width: 32px;
    height: 1px;
    background: #fff;
  }
  ::after {
    transform: rotate(45deg);
  }
  ::before {
    transform: rotate(-45deg);
  }
`;
Styled.ControlNavigationArea = styled.div`
  /* background: #fff; */
  /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); */
  /* border-radius: 12px; */
`;
Styled.InformationArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
`;
Styled.ViewportArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* background: url(/bg.jpg) 50% 50% no-repeat; */
  background-size: cover;
`;
