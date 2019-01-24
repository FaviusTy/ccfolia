import React, { memo, useState, useCallback, useRef, useMemo } from 'react'
import styled from 'styled-components'

import ObjEdit from './EditObj'
import FieldEdit from './EditField'

import { useGetter, useDispatcher, useObserver } from '../../stores/index'

import serialize from 'form-serialize'

const Assets = ({ className }) => {
  // states
  const [currentItem, setCurrentItem] = useState()

  // getters
  const uid = useGetter('user:id')
  const rid = useGetter('room:id')
  const view = useGetter('room:view')
  const assets = useGetter('user:assets')

  // computed
  const currentAsset = useMemo(() => assets[0] || { id: 'default' }, [assets])

  // callbacks
  const { dispatch, commit } = useDispatcher()

  const handleClickAdd = useCallback((e) => {
    e.preventDefault()
    dispatch('user:assets:add', {
      name: 'No title',
      owner: uid
    })
  }, [dispatch, uid])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const target = e.currentTarget
    const data = serialize(target, { hash: true })
    dispatch('user:assets:set', currentAsset.id, {
      owner: uid,
      items: {
        [Date.now().toString(34)]: data
      }
    })
    target.url.value = ''
  }, [dispatch, uid, currentAsset.id])

  const handleFieldSubmit = useCallback((e) => {
    e.preventDefault()
    if (!currentItem) return
    const target = e.currentTarget
    const data = serialize(target, { hash: true })
    data.col = ~~data.col
    data.row = ~~data.row
    dispatch('room:table:set', rid, {
      field: {
        ...data,
        url: currentItem.url
      },
      background: { url: currentItem.url }
    })
  }, [dispatch, rid, currentItem])

  const handleObjDelete = useCallback((id) => {
    dispatch('room:table:obj:delete', rid, { id })
  }, [dispatch, rid])

  const handleObjSubmit = useCallback((e) => {
    e.preventDefault()
    if (!currentItem) return
    const target = e.currentTarget
    const data = serialize(target, { hash: true })

    dispatch('room:table:obj:set', rid, {
      w: ~~data.width,
      h: ~~data.height,
      angle: ~~data.angle,
      ...currentItem
    })
  }, [dispatch, rid, currentItem])

  const handleChange = useCallback((e) => {
    e.preventDefault()
    const target = e.currentTarget
    const data = target.value
  }, [])

  const handleDelete = useCallback((key) => {
    // e.preventDefault()
    const nextItems = { ...currentAsset.items }
    delete nextItems[key]
    dispatch('user:assets:items:delete', currentAsset.id, key)
  }, [currentAsset, dispatch])

  const handleSelect = useCallback((item) => {
    setCurrentItem(item)
    // dispatch('room:table:obj:set', rid, {
    //   ...item
    // })
    // e.preventDefault()
    // dispatch('room:messages:add', rid, {
    //   type: 'images',
    //   images: [{ url }]
    // })
    // dispatch('room:table:set', rid, {
    //   field: { url },
    //   background: { url }
    // })
  }, [currentAsset, dispatch])

  // render
  if (view !== 'assets') return null
  return (<div className={className}>
    <div className="container">
      <header>
        <button onClick={() => commit('room:view', null)}>close</button>
      </header>
      <nav>
        <button onClick={handleClickAdd}>+</button>
        {assets.map(({ id, name }) => {
          return <button key={id}><img src="/bg.jpg" alt=""/></button>
        })}
      </nav>
      <div className="control">
        <ObjEdit id={'test'} />
        <FieldEdit />
        <form onSubmit={handleObjSubmit}>
          w: <input type="number" name="width" defaultValue={2} />
          h: <input type="number" name="height" defaultValue={4} />
          angle: <input type="number" name="angle" defaultValue={0} />
          <button>OBJECT</button>
        </form>

        <form onSubmit={handleSubmit}>
          <input name="url" type="text" />
          <button>Add</button>
        </form>

      </div>
      <div className="main">
        {currentAsset && currentAsset.items ? Object.keys(currentAsset.items).map((key) => {
          const { url } = currentAsset.items[key]
          return <div key={key} className="item" data-current={currentItem && currentItem.url === url}>
            <img src={url} alt="" onClick={() => handleSelect({ id: currentAsset.id, url })} />
            <button onClick={() => handleDelete(key)}>del</button>
          </div>
        }) : null}
      </div>
    </div>
  </div>)

  // return (<div className={className}>
  //   <div className="container">
  //     <button onClick={() => commit('room:view', null)}>close</button>
  //     <div className="tab"><div className="inner">
  //       <button onClick={handleClickAdd}>+</button>
  //       <select onChange={handleChange}>
  //         {assets.map(({ id, name }) => {
  //           return <option value={id} key={id}>{name}</option>
  //         })}
  //       </select>
  //     </div></div>
  //     <header>
  //       <form onSubmit={handleSubmit}>
  //         <input name="url" type="text" />
  //         <button>Add</button>
  //       </form>
  //     </header>
  //     <div className="body">
  //       {currentAsset && currentAsset.items ? Object.keys(currentAsset.items).map((key) => {
  //         const { url } = currentAsset.items[key]
  //         return <div key={key} className="item" data-current={currentItem && currentItem.url === url}>
  //           <img src={url} alt="" onClick={() => handleSelect({ id: currentAsset.id, url })} />
  //           <button onClick={() => handleDelete(key)}>del</button>
  //         </div>
  //       }) : null}
  //     </div>
  //     <footer>
  //       <form onSubmit={handleFieldSubmit}>
  //         col: <input type="number" name="col" defaultValue={16} />
  //         row: <input type="number" name="row" defaultValue={16} />
  //         <button>Field</button>
  //       </form>
  //       <form onSubmit={handleObjSubmit}>
  //         w: <input type="number" name="width" defaultValue={2} />
  //         h: <input type="number" name="height" defaultValue={4} />
  //         angle: <input type="number" name="angle" defaultValue={0} />
  //         <button>OBJECT</button>
  //       </form>
  //       <button onClick={() => handleObjDelete(currentAsset.id)}>Remove OBJ</button>
  //     </footer>
  //   </div>
  // </div>)
}

const StyledAssets = styled(Assets)`
  .container {
    display: grid;
    grid-template-rows: 30px auto 1fr;
    grid-template-columns: 60px 1fr;
    grid-template-areas:
      "head head"
      "side control"
      "side main"
    ;
    width: 90%;
    height: 90%;
  }
  .main {
    display: flex;
    grid-area: main;
    background: rgba(255, 255, 255, 0.4);
    overflow: auto;
  }
  .control {
    grid-area: control;
  }
  nav {
    grid-area: side;
    background: #ccc;
    button {
      box-sizing: border-box;
      margin: 8px;
      border-radius: 4px;
      border: none;
      display: block;
      width: 44px;
      height: 44px;
      background: #fff;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  header {
    grid-area: head;
    button {
      color: #eee;
    }
  }
  .item {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
    }
    &[data-current=true] {
      outline: 2px solid #fff;
    }
  }
`

export default memo(StyledAssets)