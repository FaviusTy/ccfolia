import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Route } from "react-router-dom";

import CharacterList from "../containers/CharacterList";
import CharacterForm from "../containers/CharacterForm";
import Screen from "../containers/Screen";
import UserMenu from "../containers/UserMenu";
import ChatBox from "../containers/ChatBox";
import Messages from "../containers/Messages";
import Tracks from "../containers/Tracks";
import RoomMenu from "../containers/RoomMenu";
import Background from "../containers/Background";
import ObjectForm from "../containers/ObjectForm";
import FieldInfo from "../containers/FieldInfo";
import FieldEdit from "../containers/FieldEdit";
import TrackEdit from "../containers/TrackEdit";

const Room = () => {
  return (
    <>
      <Styled.Container>
        <Styled.InformationArea>
          <Tracks />
        </Styled.InformationArea>
        <Styled.ViewportArea>
          <Screen />
        </Styled.ViewportArea>
        <Styled.ControlArea>
          <Styled.ControlPanelArea>
            <ChatBox />
          </Styled.ControlPanelArea>
          <Styled.ControlNavigationArea>
            <RoomMenu />
          </Styled.ControlNavigationArea>
        </Styled.ControlArea>
      </Styled.Container>

        {/* <Background /> */}
      {/* <Styled.Container>
        <Styled.ViewportArea>
          <Screen />
          <RoomMenu />
          <Styled.TopArea>
            <Tracks />
          </Styled.TopArea>
          <CharacterList />
        </Styled.ViewportArea>
        <Styled.ChatArea>
          <Messages />
          <Styled.BottomArea>
            <TrackEdit />
            <FieldEdit />
            <ChatBox />
          </Styled.BottomArea>
        </Styled.ChatArea>
        <CharacterForm />
      </Styled.Container> */}
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
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px;
`
Styled.ControlArea = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  max-height: 60vh;
  overflow: scroll;
  background: #f5f5f5;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.2);
`
Styled.ControlPanelArea = styled.div`
  flex: 1;
  /* min-height: 240px; */
  overflow: auto;
`
Styled.ControlNavigationArea = styled.div`
  background: #fff;
  box-shadow: 0 -0 4px rgba(0, 0, 0, 0.2);
  border-radius: 24px 24px 0 0;
`
Styled.InformationArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
`
Styled.ViewportArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(/bg.jpg) 50% 50% no-repeat;
  background-size: cover;
`

// Styled.Container = styled.div`
//   border-radius: 4px;
//   /* overflow: hidden; */
//   display: flex;
//   /* height: 100vh; */
//   min-height: 320px;
//   position: absolute;
//   top: 90px;
//   left: 90px;
//   right: 90px;
//   bottom: 90px;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
//   /* background: #f5f5f5; */
//   @media (max-width: 780px) {
//     border-radius: 0;
//     overflow: visible;
//     display: block;
//     position: relative;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     box-shadow: none;
//     padding-top: 50vh;
//   }
// `;
// Styled.Background = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   overflow: hidden;
//   @media (max-width: 780px) {
//     /* display: none; */
//   }
// `;
// Styled.ViewportArea = styled.div`
//   position: relative;
//   z-index: 1;
//   flex: 1;
//   width: calc(100% - 320px);
//   @media (max-width: 780px) {
//     width: auto;
//     height: 50vh;
//     /* border-bottom: 2px solid #fff; */
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//   }
// `;
// Styled.TopArea = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 10;
//   background: rgba(0, 0, 0, 0.4);
// `;
// Styled.ControlArea = styled.div`
//   box-sizing: border-box;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   height: 180px;
//   background: rgba(0, 0, 0, 0.2);
//   /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.6); */
//   /* display: none; */
//   @media (max-width: 780px) {
//     bottom: auto;
//     top: 100%;
//   }
// `;
// Styled.ChatArea = styled.div`
//   display: flex;
//   position: relative;
//   min-width: 320px;
//   /* box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.6); */
//   /* background: rgba(0, 0, 0, 0.6); */
//   /* background: #fff; */
// `;
// Styled.BottomArea = styled.div`
//   /* background: rgba(0, 0, 0, 0.6); */
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   @media (max-width: 780px) {
//     position: fixed;
//   }
// `;