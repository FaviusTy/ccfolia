import React, { useState } from "react";

import Messages from "../components/Messages";
import ChatBox from "../components/ChatBox";
import FieldObjectList from "../components/FieldObjectList";
import FieldObjectEdit from "../components/FieldObjectEdit";

const ShowCase = () => {
  return (
    <div>
      <FieldObjectEdit />
      <FieldObjectList />
      <Messages items={[1, 2, 3, 4, 5]} />
      <ChatBox />
    </div>
  );
};

export default ShowCase;
