import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FaTimesCircle } from "react-icons/fa";

const CharacterList = ({ items, add, edit, select, remove, close }) => {
  return (
    <Styled.Container>
      <Styled.List>
        {items.map(item => {
          return (
            <CharacterItem
              key={item.id}
              {...item}
              onSelect={() => select(item)}
              onEdit={() => edit(item)}
              onDelete={() => remove(item)}
            />
          );
        })}
      </Styled.List>
      <Styled.AddButton onClick={add} type="button">
        +
      </Styled.AddButton>
      <Styled.CloseButton onClick={close} />
    </Styled.Container>
  );
};

const CharacterItem = ({ name, text, images, onSelect, onEdit, onDelete }) => {
  return (
    <Styled.Item>
      <figure>
        {images && images.length > 0 ? <img src={images[0].url} /> : null}
      </figure>
      <p>{name}</p>
      <button className="del" onClick={onDelete} type="button">
        Delete
      </button>
      <button onClick={onEdit} type="button">
        Edit
      </button>
      <button onClick={onSelect} type="button">
        Add
      </button>
    </Styled.Item>
  );
};

const Styled = {};
Styled.Container = styled.div`
  margin: 0 auto;
  /* max-width: 640px; */
  position: absolute;
  bottom: 8px;
  right: 8px;
  left: 8px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 40%;
  background: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
`;
Styled.List = styled.div`
  overflow: scroll;
  flex: 1;
`;
Styled.Item = styled.div`
  display: flex;
  background: #fff;
  border-bottom: 1px solid #eee;
  > * + * {
    border-left: 1px solid #eee;
  }
  p {
    padding: 4px 8px;
    flex: 1;
    font-size: 12px;
    font-weight: 800;
  }
  figure {
    /* flex: 1; */
    height: 40px;
    width: 60px;
    position: relative;
    figcaption {
      padding: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      color: #fff;
      font-size: 10px;
      background: rgba(0, 0, 0, 0.1);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
  button {
    border: none;
    width: 60px;
    background: #eee;
    color: #888;
    &.del {
      background: #fcc;
      color: #c88;
    }
  }
`;

Styled.AddButton = styled.button`
  box-sizing: border-box;
  padding: 12px;
  border: none;
  border-top: 1px solid #eee;
  display: block;
  width: 100%;
  background: #eee;
  color: #888;
`;

Styled.CloseButton = styled(FaTimesCircle)`
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50%;
  background: #fff;
  color: #444;
  cursor: pointer;
`;

const mapStateToProps = state => {
  return {
    items: state.user.characters,
    view: state.user.view
  };
};

const mapDispatchToProps = {
  add: item => {
    return {
      type: "USER_FORM_SET",
      key: "character",
      item: {
        id: Date.now().toString(34),
        name: "TESTMAN",
        text: "I am a TESTMAN.",
        images: [{ url: "/bg.jpg" }],
        status: [{ key: "hp", value: 0, max: 0 }],
        params: [{ key: "dex", value: 0 }],
        tags: []
      }
    };
  },
  edit: item => {
    return {
      type: "USER_FORM_SET",
      key: "character",
      item: item
    };
  },
  select: ({ id, name, text, images, status }) => {
    return {
      type: "@ROOM_OBJECT_SET",
      itemId: id,
      object: {
        position: [0, 0],
        size: [1, 1],
        text: `${name}\n${text}`,
        hidden: false,
        url: images[0] ? images[0].url : "",
        status: status
      }
    };
  },
  remove: ({ id }) => {
    return {
      type: "@CHARACTER_DELETE",
      id
    };
  },
  close: () => {
    return {
      type: "USER_VIEW_SET",
      key: null
    };
  }
};

const CharacterListContainer = ({ ...props }) => {
  if (props.view !== "character") return null;
  return <CharacterList {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterListContainer);
