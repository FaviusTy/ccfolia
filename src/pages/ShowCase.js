import React, { useState } from "react";
import styled from "styled-components";

import Messages from "../components/Messages";
import ChatBox from "../components/ChatBox";
import FieldObjectList from "../components/FieldObjectList";
import FieldObjectEdit from "../components/FieldObjectEdit";
import SceneEdit from "../components/SceneEdit";

const ShowCase = () => {
  return (
    <Container>
      <Main />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const Frame = styled.div``;
const Main = styled.div``;
const Side = styled.div``;

export default ShowCase;
