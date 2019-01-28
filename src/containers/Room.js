import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import room from "../stores/reducers/room";

const Room = ({
  id,
  messages,
  addMessage,
  resetMessageAll,
  setTrack,
  setObject,
  setField,
  setCharacter,
  uploadFile
}) => {
  return (
    <Styled.Container>
      {id}
      <button onClick={addMessage} type="button">
        SEND MESSAGE
      </button>
      <button onClick={resetMessageAll} type="button">
        RESET MESSAGE ALL
      </button>
      <button onClick={setTrack} type="button">
        CHANGE TRACK
      </button>
      <button onClick={setObject} type="button">
        SET OBJECT
      </button>
      <button onClick={setCharacter} type="button">
        SET CHARACTER
      </button>
      <button onClick={setField} type="button">
        SET FIELD
      </button>
      <input onChange={e => uploadFile(e.target.files)} multiple type="file" />
      {messages.map(({ name, text, id }) => (
        <p key={id}>
          {name}: {text}
        </p>
      ))}
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div``;

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    id,
    messages: state.room.messages
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
        name: "",
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
      object: {
        id: "test",
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
      type: "ROOM_FIELD_SET",
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
      character: {
        name: "",
        text: "",
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
