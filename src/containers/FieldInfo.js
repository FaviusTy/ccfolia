import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const FieldInfo = ({ items }) => {
  return (
    <Styled.Container>
      {/* {JSON.stringify(items)} */}
      {items.map(item => {
        return <Item key={item.id} {...item} />;
      })}
    </Styled.Container>
  );
};

const Item = ({ name, text, status, url }) => {
  return (
    <Styled.Item>
      <figure>
        <img src={url} />
      </figure>
      <Styled.ItemInfo>
        <h2>
          {name}
          {text}
        </h2>
        {status.map((state, i) => {
          return (
            <Styled.Bar key={i}>
              <Styled.BarLabel>
                {state.key}: {state.value}/{state.max}
              </Styled.BarLabel>
              <button type="button">-</button>
              <button type="button">+</button>
            </Styled.Bar>
          );
        })}
      </Styled.ItemInfo>
    </Styled.Item>
  );
};

const mapStateToProps = state => {
  return {
    items: state.room.objects.filter(object => {
      return object.status.length > 0;
    })
  };
};

const mapDispatchToProps = {};

const FieldInfoContainer = ({ ...props }) => {
  return <FieldInfo {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldInfoContainer);

const Styled = {};
Styled.Container = styled.div`
  border-top: 1px solid #222;
  box-sizing: border-box;
  padding: 4px;
  padding-top: 64px;
  padding-bottom: 16px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  max-height: 100%;
  max-width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;
Styled.Item = styled.div`
  margin-bottom: 8px;
  /* display: flex; */
  font-size: 10px;
  color: #fff;
  /* background: #fff; */
  h2 {
    margin-bottom: 2px;
    width: 90px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 10px;
    font-weight: 400;
    /* display: none; */
  }
  figure {
    width: 8px;
    width: 0;
    display: none;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
  /* @media (max-width: 780px) {
    figure {
      display: none;
    }
  } */
`;
Styled.ItemInfo = styled.div``;
Styled.Bar = styled.div`
  padding: 2px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  line-height: 1;
  background: #fff;
  button {
    border: none;
    border-left: 1px solid #fff;
    width: 16px;
    background: #eee;
  }
  & + & {
    margin-top: 2px;
  }
`;
Styled.BarLabel = styled.div`
  margin-right: 4px;
  flex: 1;
  color: #444;
`;
