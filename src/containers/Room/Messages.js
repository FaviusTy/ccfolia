import React, { memo, useRef, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Messages = ({ messages }) => {
  const wrapRef = useRef(null)
  useLayoutEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollTop = 99999999
    }
  })
  return (
    <Container ref={wrapRef}>
      <div className="inner">
        {messages.map(message => <Message key={message.id} {...message} />)}
      </div>
    </Container>
  )
}

const _Message = ({ name, type, text, images, color }) => (
  <div className="item" from={name === 'KP' ? 'me' : null}>
    <h1>{name}</h1>
    <div className="body" style={{ backgroundColor: color }}>
      <p className={type}>{text}</p>
      {images ? images.map(({ url }, i) => (
        <figure key={i}><img src={url} alt="" /></figure>
      )) : null}
    </div>
  </div>
)
const Message = memo(_Message)

const mapStateToProps = (state) => {
  return {
    messages: state.room.messages
  }
}

const mapDispatchToProps = {}

const Container = styled.div`
  box-sizing: border-box;
  padding: 8px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
  }
  .inner {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  /* Item */
  .item {
    margin-bottom: 8px;
    max-width: 90%;
    align-self: flex-start;
    .body {
      padding: 4px 8px;
      border-radius: 0 8px 8px 8px;
      background: #fff;
      color: #222;
    }
    h1 {
      margin-bottom: 2px;
      font-size: 10px;
      font-weight: 800;
    }
    p {
      font-size: 12px;
      line-height: 1.6;
      word-wrap: break-word;
    }
    p.dice {
      margin: 4px 0;
      border-radius: 4px;
      padding: 4px 8px;
      background: #444;
      color: #fff;
    }
    p.dice::before {
      margin-right: 4px;
      content: "🎲";
    }
    p.note {
      margin: 4px 0;
      padding: 4px 8px;
      position: relative;
      border-radius: 4px;
      max-width: 128px;
      max-height: 64px;
      line-height: 1.4;
      overflow: hidden;
      background: #eee;
      color: #222;
      font-size: 10px;
    }
    p.note::before {
      margin-right: 4px;
      content: "🗒";
    }
    p.note::after {
      content: ">>";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4px;
      height: 1em;
      line-height: 1em;
      background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      text-align: right;
      color: #888;
    }
    figure {
      margin: 4px 0;
      border-radius: 4px;
      max-width: 240px;
      max-height: 135px;
      overflow: hidden;
      text-align: center;
    }
    figure img {
      vertical-align: middle;
      max-width: 100%;
      max-height: 100%;
    }

    &[from="me"] {
      align-self: flex-end;
    }
    &[from="me"] .body {
      border-radius: 8px 0 8px 8px;
      background: #fff;
    }

    &[from="me"] h1 {
      /* display: none; */
      text-align: right;
    }

    &[from="sys"] {
      border-radius: none;
      align-self: center;
      background: none;
      font-size: 10px;
    }

    &[from="sys"] h1 {
      display: none;
    }

    &[from="sys"] p {
      font-size: 10px;
      text-align: center;
    }
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(Messages)

// import React, { memo, useLayoutEffect, useRef } from 'react'
// import styled from 'styled-components'
// import { useGetter, useDispatcher, useObserver } from '../../stores/index'

// const Messages = ({ className }) => {
//   const wrapRef = useRef(null)
//   const messages = useGetter('room:messages')

//   useLayoutEffect(() => {
//     if (wrapRef.current) {
//       wrapRef.current.scrollTop = 99999999
//     }
//   })
//   return (
//     <div className={className} ref={wrapRef}>
//       <div className="inner">
//         {messages.map(message => <Message key={message.id} {...message} />)}
//       </div>
//     </div>
//   )
// }

// const _Message = ({ name, type, text, images, color }) => (
//   <div className="item" from={name === 'KP' ? 'me' : null}>
//     <h1>{name}</h1>
//     <div className="body" style={{ backgroundColor: color }}>
//       <p className={type}>{text}</p>
//       {images ? images.map(({ url }, i) => (
//         <figure key={i}><img src={url} alt="" /></figure>
//       )) : null}
//     </div>
//   </div>
// )
// const Message = memo(_Message)

// const StyledMessages = styled(Messages)`
//   box-sizing: border-box;
//   padding: 8px;
//   overflow: auto;
//   -webkit-overflow-scrolling: touch;
//   height: 100%;
//   flex: 1;
//   &::-webkit-scrollbar {
//     display: none;
//   }
//   .inner {
//     margin: 0 auto;
//     display: flex;
//     flex-direction: column;
//   }
//   /* Item */
//   .item {
//     margin-bottom: 8px;
//     max-width: 90%;
//     align-self: flex-start;
//     .body {
//       padding: 4px 8px;
//       border-radius: 0 8px 8px 8px;
//       background: #fff;
//       color: #222;
//     }
//     h1 {
//       margin-bottom: 2px;
//       font-size: 10px;
//       font-weight: 800;
//     }
//     p {
//       font-size: 12px;
//       line-height: 1.6;
//       word-wrap: break-word;
//     }
//     p.dice {
//       margin: 4px 0;
//       border-radius: 4px;
//       padding: 4px 8px;
//       background: #444;
//       color: #fff;
//     }
//     p.dice::before {
//       margin-right: 4px;
//       content: "🎲";
//     }
//     p.note {
//       margin: 4px 0;
//       padding: 4px 8px;
//       position: relative;
//       border-radius: 4px;
//       max-width: 128px;
//       max-height: 64px;
//       line-height: 1.4;
//       overflow: hidden;
//       background: #eee;
//       color: #222;
//       font-size: 10px;
//     }
//     p.note::before {
//       margin-right: 4px;
//       content: "🗒";
//     }
//     p.note::after {
//       content: ">>";
//       display: block;
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       padding: 4px;
//       height: 1em;
//       line-height: 1em;
//       background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
//       text-align: right;
//       color: #888;
//     }
//     figure {
//       margin: 4px 0;
//       border-radius: 4px;
//       max-width: 240px;
//       max-height: 135px;
//       overflow: hidden;
//       text-align: center;
//     }
//     figure img {
//       vertical-align: middle;
//       max-width: 100%;
//       max-height: 100%;
//     }

//     &[from="me"] {
//       align-self: flex-end;
//     }
//     &[from="me"] .body {
//       border-radius: 8px 0 8px 8px;
//       background: #fff;
//     }

//     &[from="me"] h1 {
//       /* display: none; */
//       text-align: right;
//     }

//     &[from="sys"] {
//       border-radius: none;
//       align-self: center;
//       background: none;
//       font-size: 10px;
//     }

//     &[from="sys"] h1 {
//       display: none;
//     }

//     &[from="sys"] p {
//       font-size: 10px;
//       text-align: center;
//     }
//   }
// `

// export default memo(StyledMessages)