import React, { useCallback } from 'react'
import { useStore } from '../stores/characters'

const Character = ({ name, image }) => (
  <>
    <p>{name}</p>
    <figure><img src={image} width="100" alt=""/></figure>
  </>
)

const Characters = ({ characters }) => (
  <div>
    {characters.map((character, i) => <Character key={i} {...character} />)}
  </div>
)

const CharacterForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input name="name" type="text" />
    </div>
    <div>
      image: <input name="image" type="text" defaultValue="https://rc.folia.me/img/icon.314bc60f.png" />
    </div>
    <button>ADD</button>
  </form>
)

const CharactersContainer = ({ id }) => {
  const [characters, store] = useStore()
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const form = e.currentTarget
    const { name, image } = form
    store.add(Date.now().toString(36), {
      name: name.value,
      image: image.value
    })
  }, [store])
  return (
    <>
      <CharacterForm onSubmit={onSubmit}></CharacterForm>
      <Characters characters={characters}></Characters>
    </>
  )
}

export default CharactersContainer