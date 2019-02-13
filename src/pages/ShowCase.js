import React, { useState } from "react";
import Chat from "../components/Chat";

const ShowCase = () => {
  return (
    <div>
      <Chat messages={[1, 2, 3, 4, 5]} />
    </div>
  );
};

export default ShowCase;
