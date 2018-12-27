import React, { memo } from 'react'
import ReactPlayer from 'react-player'

const Media = ({ media: { name, url, loop, muted, volume } }) => (
  <div className="Media">
    <ReactPlayer
      className="player"
      url={url}
      playing
      loop={loop}
      muted={muted}
      volume={volume}
      width={112}
      height={63}
    />
    <div className="info">
      <h1>{name || 'NONAME'}</h1>
      <p>loop:{loop ? 'on' : 'off'} muted:{!muted ? 'on' : 'off'} volume:{volume}</p>
    </div>
  </div>
)

export default memo(Media)
