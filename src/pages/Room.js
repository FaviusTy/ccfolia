import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import CharacterList from "../containers/CharacterList";
import CharacterForm from "../containers/CharacterForm";

const Room = ({
  id,
  messages,
  tracks,
  objects,
  fields,
  characters,
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
      <button onClick={setField} type="button">
        SET FIELD
      </button>
      <button onClick={setCharacter} type="button">
        SET CHARACTER
      </button>
      <input onChange={e => uploadFile(e.target.files)} multiple type="file" />
      <hr />
      <div>{JSON.stringify(tracks)}</div>
      <hr />
      <div>{JSON.stringify(objects)}</div>
      <hr />
      <div>{JSON.stringify(fields)}</div>
      <hr />
      <CharacterList />
      <CharacterForm />
      <hr />
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
