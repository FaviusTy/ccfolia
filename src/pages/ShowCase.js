import React, { useState } from "react";

import Messages from "../components/Messages";
import ChatBox from "../components/ChatBox";
import FieldObjectList from "../components/FieldObjectList";

const ShowCase = () => {
  return (
    <div>
      <FieldObjectList />
      <Messages items={[1, 2, 3, 4, 5]} />
      <ChatBox />
    </div>
  );
};

export default ShowCase;
