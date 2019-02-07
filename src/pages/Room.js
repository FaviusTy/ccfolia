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
import TrackEdit from "../containers/TrackEdit";

const Room = ({
  view,
  form,
  uploadAnyFiles,
  closeControls,
  closeForm,
  resetMessageAll
}) => {
  return (
    <>
      <Background />
      <Dropzone onDrop={uploadAnyFiles} disableClick>
        {({ getRootProps, getInputProps, isDragActive, open }) => {
          return (
            <Styled.Container {...getRootProps()} data-active={isDragActive}>
              <input {...getInputProps()} />
              {isDragActive ? "drop" : null}
              <Styled.InformationArea>
                <Tracks />
              </Styled.InformationArea>
              <Styled.ViewportArea>
                <Screen />
              </Styled.ViewportArea>
              <Styled.ControlArea>
                <Styled.ControlContentArea>
                  <button onClick={() => resetMessageAll()} type="button">
                    RESET
                  </button>
                  <Messages />
                </Styled.ControlContentArea>
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
                  {/* {view.controls === "objects" ? <CharacterForm /> : null} */}
                  <Styled.CloseButton onClick={closeControls} type="button" />
                  {view.controls === "fields" ? <FieldEdit /> : null}
                  {view.controls === "tracks" ? <TrackEdit /> : null}
                  {view.controls === "messages" ? <ChatBox /> : null}
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
    messages: state.room.messages,
    objects: state.room.objects,
    tracks: state.room.tracks,
    fields: state.room.fields,
    view: state.room.view,
    form: state.room.form,
    characters: state.user.characters
  };
};

const mapDispatchToProps = {
  init: id => {
    return {
      type: "@ROOM_INIT",
      id
    };
  },
  addMessage: () => {
    return {
      type: "@ROOM_MESSAGE_ADD",
      message: {
        name: "PL01",
        text: "say " + Date.now().toString(16)
      }
    };
  },
  resetMessageAll: () => {
    return {
      type: "@ROOM_MESSAGE_RESET_ALL"
    };
  },
  setTrack: () => {
    return {
      type: "@ROOM_TRACK_SET",
      itemId: "main",
      track: {
        url: "/sample.mp3",
        loop: true,
        muted: false,
        volume: 0.05
      }
    };
  },
  setObject: () => {
    return {
      type: "@ROOM_OBJECT_SET",
      itemId: "test",
      object: {
        position: [0, 0],
        size: [1, 1],
        text: "",
        hidden: false,
        status: [
          {
            key: "HP",
            type: "number",
            value: 1,
            max: 10
          }
        ]
      }
    };
  },
  setField: () => {
    return {
      type: "@ROOM_FIELD_SET",
      field: {
        images: [
          {
            url: "/bg.jpg",
            size: [1, 1],
            position: [0, 0]
          }
        ],
        background: {
          url: "/bg.jpg"
        }
      }
    };
  },
  setCharacter: () => {
    return {
      type: "@CHARACTER_SET",
      id: "test",
      character: {
        name: "TESTMAN",
        text: "I am a TESTMAN.",
        images: [],
        status: [],
        params: [],
        tags: []
      }
    };
  },
  uploadFile: files => {
    return {
      type: "@FILE_ADD",
      files
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
  background: #f5f5f5;
  /* background: rgba(240, 240, 240, 0.90); */
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
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
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
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
