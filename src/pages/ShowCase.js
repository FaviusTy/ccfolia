import React, { useState } from "react";

import Messages from "../components/Messages";
import ChatBox from "../components/ChatBox";
import FieldObjectList from "../components/FieldObjectList";
import FieldObjectEdit from "../components/FieldObjectEdit";
import SceneEdit from "../components/SceneEdit";

const ShowCase = () => {
  return (
    <div>
      <SceneEdit />
      <FieldObjectEdit />
      <FieldObjectList />
      <Messages items={[1, 2, 3, 4, 5]} />
      <ChatBox />
    </div>
  );
};

export default ShowCase;
