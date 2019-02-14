import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";

import { useAction } from "../hooks/redux-action";
import { FaCog } from "react-icons/fa";

const dummyFieldObjects = [1, 2, 3, 4, 5, 6];
const FieldObjectList = ({ fieldObjects = dummyFieldObjects }) => {
  const [current, setCurrent] = useState(null);
  const { selectFieldObject } = useAction(actions);
  return (
    <Container>
      <List>
        {fieldObjects.map((_, id) => {
          return (
            <Item key={id} onClick={() => selectFieldObject(id)}>
              <Icon onClick={() => setCurrent(id)} src="/bg.jpg" />
              {current === id ? (
                <Body>
                  <Title>田中 太郎</Title>
                  <Text>initiative: 30</Text>
                </Body>
              ) : null}
            </Item>
          );
        })}
      </List>
    </Container>
  );
};

const actions = {
  selectFieldObject: id => {
    return {
      type: "FIELD_OBJECT_SELECT",
      id
    };
  }
};

const Container = styled.div`
  /* padding: 4px; */
  /* background: #000; */
`;
const List = styled.div`
  /* display: flex; */
  /* flex-wrap: wrap; */
`;
const Item = styled.div`
  display: flex;
  & + & {
    margin-top: 4px;
  }
`;
const Icon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  object-position: top;
`;
const Body = styled.div`
  padding: 8px;
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
`;
const Title = styled.div`
  margin-bottom: 2px;
  line-height: 1;
  color: #222;
  font-size: 12px;
  font-weight: 800;
`;
const Text = styled.div`
  line-height: 1;
  color: #888;
  font-size: 10px;
`;

export default memo(FieldObjectList);
