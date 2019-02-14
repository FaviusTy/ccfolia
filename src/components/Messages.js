import React, { memo, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

const Messages = ({ items }) => {
  const wrapRef = useRef(null);
  useLayoutEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollTop = 99999999;
    }
  });
  return (
    <Container ref={wrapRef}>
      {items.map((_, i) => {
        return (
          <Item key={i}>
            <Head>
              <Icon src="/bg.jpg" />
            </Head>
            <Body>
              <Title>NAME (Display name)</Title>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                vitae soluta dolor nihil obcaecati reprehenderit dolores, ipsa
                suscipit voluptates voluptatum, debitis laborum tempora velit
                officia. Nihil quos vitae ex expedita?
              </Text>
            </Body>
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
  max-height: 40vh;
  ::-webkit-scrollbar {
    display: none;
  }
  background: rgba(255, 255, 255, 0.94);
`;
const Item = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
`;
const Head = styled.div`
  margin-right: 8px;
  width: 36px;
  height: 36px;
`;
const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #eee;
`;
const Body = styled.div`
  flex: 1;
`;
const Title = styled.div`
  margin-right: 8px;
  font-size: 10px;
  font-weight: 800;
  color: #888;
`;
const Text = styled.div``;

export default memo(Messages);
