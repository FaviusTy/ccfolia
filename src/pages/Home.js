import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { log } from "util";

const RoomItem = ({ id, onDelete }) => {
  return (
    <Styled.RoomItem>
      <Link to={`/rooms/${id}`}>{id}</Link>
      <button onClick={onDelete} type="button">
        Delete
      </button>
    </Styled.RoomItem>
  );
};

const Home = ({ uid, name, rooms, addRoom, deleteRoom }) => {
  return (
    <Styled.Container>
      <p>USER_ID: {name || uid}</p>
      <nav>
        {rooms.map(({ id, t }, i) => {
          return (
            <RoomItem id={id} i={i} key={id} onDelete={() => deleteRoom(id)} />
          );
        })}
        <Styled.CreateButton onClick={addRoom} type="button">
          New Room
        </Styled.CreateButton>
      </nav>
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div`
  padding-bottom: 60px;
  　p {
    padding: 20px;
  }
`;
Styled.RoomItem = styled.div`
  display: flex;
  a {
    display: block;
    padding: 20px;
    flex: 1;
    background: #fff;
    text-decoration: none;
    color: #888;
  }
  button {
    padding: 20px;
    border: none;
    background: #444;
    color: #fff;
  }
`;
Styled.CreateButton = styled.div`
  padding: 20px;
  border: none;
  border-top: 1px solid #eee;
  background: #fff;
  color: #888;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const compareTimestamp = (a, b) => {
  const v1 = Number(a.t);
  const v2 = Number(b.t);
  if (!v1 || !v2) {
    return 0;
  } else if (v1 === v2) {
    return 0;
  } else if (v1 > v2) {
    return -1;
  } else if (v1 < v2) {
    return 1;
  }
};

const mapStateToProps = state => {
  return {
    uid: state.user.uid,
    name: state.user.name,
    rooms: state.user.rooms.sort(compareTimestamp)
  };
};

const mapDispatchToProps = {
  addRoom: () => {
    return {
      type: "@ROOM_ADD"
    };
  },
  deleteRoom: id => {
    return {
      type: "@ROOM_DELETE",
      id
    };
  }
};

const HomeContainer = ({ ...props }) => {
  return <Home {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
