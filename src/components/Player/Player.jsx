import React, { useState, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
import './Player.css'

export default function Player({ tracks, collection }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  function handlePlayPause() {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }

  function handleTrackSelect(track) {
    setCurrentTrack(track);
    setIsPlaying(true);
    audioRef.current.src = track.url;
    audioRef.current.play();
  }

  return (
    <div>
      {/* <h3>{currentTrack?.title}</h3> */}
      <ReactAudioPlayer 
        className="player"
        ref={audioRef}
        title={currentTrack?.title}
        src={currentTrack?.url}
        autoPlay
        controls
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      {collection.tracks.map((track, idx) => {
        return (
          <div className="track" key={track._id}>
            <h3>{idx + 1}. {track.title}</h3>
            <button onClick={() => handleTrackSelect(track)}>
              Play
            </button>
          </div>
        );
      })}
    </div>
  );
}
