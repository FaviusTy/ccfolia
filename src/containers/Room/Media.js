import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactHowler from 'react-howler'
import ReactPlayer from 'react-player'
import { FaPlay, FaPause } from 'react-icons/fa'

// import ReactPlayer from 'react-player' // todo: support youtube

const Media = ({ media: { name, url, loop, muted, volume } }) => {
  const [playing, setPlaying] = useState(true)
  return (
    <StyledContainer>
      {url ? <ReactHowler
        format={['mp3', 'wav']}
        src={url}
        playing={playing}
        loop={loop}
        muted={muted}
        volume={volume}
        onStop={() => setPlaying(false)}
      /> : null}
      {/* <ReactPlayer
        className="player"
        url={url}
        playing={playing}
        // controls={true}
        playsinline={true}
        loop={loop}
        muted={muted}
        volume={volume}
        width={112}
        height={63}
      /> */}
      <button onClick={() => setPlaying(!playing)}>{ playing ? <FaPause /> : <FaPlay /> }</button>
      <div className="info">
        <h1>{name || 'NONAME'}</h1>
        <p>loop:{loop ? 'on' : 'off'} muted:{muted ? 'on' : 'off'} volume:{volume}</p>
      </div>
    </StyledContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    media: state.room.table.media
  }
}

const mapDispatchToProps = {
}

const StyledContainer = styled.div`
  padding: 8px;
  display: flex;
  background: rgba(0, 0, 0, 0.4);

  button {
    border: 1px solid #fff;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    line-height: 1;
    svg {
      vertical-align: middle;
    }
  }

  .player {
    border-radius: 4px;
    overflow: hidden;
  }

  .info {
    padding: 2px 8px;
    flex: 1;
  }
  .info h1 {
    font-size: 12px;
    font-weight: 800;
  }
  .info p {
    display: flex;
    border-radius: 12px;
    font-size: 10px;
    color: #eee;
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media)