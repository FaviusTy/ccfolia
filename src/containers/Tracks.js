import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactHowler from "react-howler";
// import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa";

const Tracks = ({ tracks }) => {
  return (
    <Styled.Container>
      {tracks.map((track, i) => (
        <Track key={i} {...track} />
      ))}
    </Styled.Container>
  );
};

const Track = ({ name, url, loop, muted, volume }) => {
  const [playing, setPlaying] = useState(true);
  return (
    <Styled.Track>
      {url ? (
        <ReactHowler
          format={["mp3", "wav"]}
          src={url}
          playing={playing}
          loop={loop}
          muted={muted}
          volume={volume}
          onStop={() => setPlaying(false)}
        />
      ) : null}
      <button onClick={() => setPlaying(!playing)}>
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <div className="info">
        <h1>{name || "NONAME"}</h1>
        <p>
          loop:{loop ? "on" : "off"} muted:{muted ? "on" : "off"} volume:
          {volume}
        </p>
      </div>
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
    </Styled.Track>
  );
};

const mapStateToProps = state => {
  if (state.room.fields[0]) {
    return {
      tracks: state.room.fields[0].tracks || []
    };
  } else {
    return {
      tracks: []
    };
  }
};

const mapDispatchToProps = {};

const Styled = {};
Styled.Container = styled.div``;
Styled.Track = styled.div`
  padding: 8px;
  display: flex;
  color: #fff;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
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
    color: #fff;
  }
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
