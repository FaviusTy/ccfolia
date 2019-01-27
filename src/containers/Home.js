import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RoomItem = ({ id, onDelete, i }) => {
  return (
    <Styled.RoomItem>
      <Link to={`/rooms/${id}`}>ROOM_ID: {id}</Link>
      <button onClick={onDelete} type="button">
        Delete
      </button>
    </Styled.RoomItem>
  );
};

const Home = ({ rooms, addRoom, deleteRoom, user }) => {
  return (
    <Styled.Container>
      <p>USER_ID: {user.uid}</p>
      <nav>
        {rooms.map(({ id }, i) => {
          return (
            <RoomItem id={id} i={i} key={id} onDelete={() => deleteRoom(id)} />
          );
        })}
        <button onClick={addRoom} type="button">
          New Room
        </button>
      </nav>
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div``;
Styled.RoomItem = styled.div``;

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    user: state.user
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
