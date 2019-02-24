import React from "react";
import styled from "styled-components";
import Titlebar from "../../../components/Titlebar";
import theme from "../../../styles/theme";
import { FaPlusCircle } from "react-icons/fa";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const CharacterSelect = () => {
  return (
    <Container>
      <Frame>
        <Head>
          <HeadContent>
            <Information>{1}/3 items selected</Information>
            <DeleteButton>Delete</DeleteButton>
          </HeadContent>
        </Head>
        <Body>
          {/* <GridList cellHeight={180}>
          <GridListTile>
            <img src="/bg.jpg" alt=""/>
          </GridListTile>
          <GridListTile>
            <img src="/bg.jpg" alt="" />
          </GridListTile>
          <GridListTile>
            <img src="/bg.jpg" alt=""/>
          </GridListTile>
          <GridListTile>
            <img src="/bg.jpg" alt="" />
          </GridListTile>
        </GridList> */}
          <List>
            {[...Array(100)].map((_, id) => {
              return (
                <Tile key={id}>
                  <Item>
                    <CheckBox current={id % 4 === 0} />
                    <Icon>
                      <IconImage src="/bg.jpg" />
                    </Icon>
                    <Text>Lorem, ipsum.</Text>
                  </Item>
                </Tile>
              );
            })}
          </List>
        </Body>
        <Actions>
          <SubmitButton>OK</SubmitButton>
        </Actions>
      </Frame>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(255, 255, 255, 0.9); */
  background: rgba(0, 0, 0, 0.2);
`;
const Frame = styled.div`
  margin: auto;
  max-width: 420px;
  max-height: 60%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: ${theme.color.white};
`;
const Head = styled.div`
  padding: 16px 16px 8px;
`;
const HeadContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Body = styled.div`
  flex: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Information = styled.div``;
const DeleteButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px;
  display: block;
  min-width: 54px;
  background: ${theme.color.base};
  color: ${theme.color.dark};
  font-size: 10px;
  font-weight: 800;
  font-family: sans-serif;
  & + & {
    margin-left: 8px;
  }
`;
const Actions = styled.div`
  padding: 8px;
`;
const SubmitButton = styled.button`
  box-sizing: border-box;
  display: block;
  padding: 12px;
  border: none;
  border-radius: 4px;
  width: 100%;
  background: ${theme.color.dark};
  color: ${theme.color.light};
  font-size: 12px;
`;
const List = styled.div`
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
`;
const Tile = styled.div`
  padding: 8px;
  box-sizing: border-box;
  width: 33.33%;
`;
const Item = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${theme.color.white};
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
`;
const IconImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Text = styled.div`
  margin-top: 8px;
  font-weight: 800;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;
const CheckBox = styled.div`
  padding: 3px;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${theme.color.light};
  ::after {
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    background: ${({ current }) => (current ? theme.color.dark : null)};
  }
  &[current="current"] {
    ::after {
      background: ${theme.color.dark};
    }
  }
`;

export default CharacterSelect;
