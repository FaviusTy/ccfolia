import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Characters = ({ items, add, select, remove }) => {
  return <Styled.Container>
      <Styled.List>
        {items.map((item) => {
          return (
            <CharacterItem
              key={item.id}
              name={item.name}
              images={item.images}
              onSelect={() => select(item)}
              onDelete={() => remove(item)}
            />
          );
        })}
        <button onClick={add}>( + )</button>
      </Styled.List>
    </Styled.Container>
}

const CharacterItem = ({ name, images, onSelect, onDelete }) => {
  return (
    <Styled.Item>
      <h1>{name}</h1>
      {images && images.length > 0 ? (
        <figure>
          <img src={images[0].url} />
        </figure>
      ) : null}
      <button onClick={onDelete} type="button">Delete</button>
      <button onClick={onSelect} type="button">Add</button>
    </Styled.Item>
  );
};

const Styled = {}
Styled.Container = styled.div``
Styled.List = styled.div`
  display: flex;
  flex-wrap: wrap;
`
Styled.Item = styled.div`
  h1 {
    font-size: 12px;
  }
`

const mapStateToProps = (state) => {
  return {
    items: state.user.characters
  }
}

const mapDispatchToProps = {
  add: () => {
    return {
      type: '@CHARACTER_SET',
      id: Date.now().toString(34),
      character: {
        name: "TESTMAN",
        text: "I am a TESTMAN.",
        images: [],
        status: [],
        params: [],
        tags: []
      }
    }
  },
  select: ({ id }) => {
    return {
      type: '@ROOM_OBJECT_SET',
      itemId: id,
      object: {
        position: [0, 0],
        size: [1, 1],
        text: "",
        hidden: false,
        status: [
          {
            key: "HP",
            type: "number",
            value: 1,
            max: 10
          }
        ]
      }
    }
  },
  remove: ({ id }) => {
    return {
      type: '@CHARACTER_DELETE',
      id
    }
  }
}

const CharactersContainer = ({ ...props }) => {
  return <Characters {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersContainer)
