import React from "react";
import { Link } from "react-router-dom";

const RoomItem = ({ id, name, text, url }) => (
  <div>
    <Link to={`room/${id}`}>
      {id}, {name}, {text}, {url}
    </Link>
  </div>
);

const RoomList = () => {
  return (
    <div>
      {[...Array(10)].map((_, i) => {
        return (
          <RoomItem
            key={i}
            id={i}
            name={`ROOM-${i}`}
            text={`TEST ROOM NUMBER ${i}`}
            url={``}
          />
        );
      })}
    </div>
  );
};

export default RoomList;
