import React, { memo } from "react";
import styled from "styled-components";

const Messages = ({ items }) => {
  return (
    <Container>
      {items.map(() => {
        return (
          <Item>
            <Title component="textarea">NAME</Title>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio,
              nam accusamus nihil ipsam iusto unde obcaecati, iure praesentium,
              accusantium aperiam reiciendis eum eligendi quidem atque sunt
              vitae minima ab veniam.
            </Text>
          </Item>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  max-height: 50vh;
  ::-webkit-scrollbar {
    display: none;
  }
  background: rgba(255, 255, 255, 0.94);
`;
const Item = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
`;
const Title = styled.div`
  margin-right: 8px;
  display: inline;
  font-weight: 800;
  ::after {
    content: ":";
  }
`;
const Text = styled.div`
  display: inline;
`;

export default memo(Messages);
