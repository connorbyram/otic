import React, { useState, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
import './Player.css'

export default function Player({ tracks, collection }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  function handleTrackSelect(track) {
    setCurrentTrack(track);
  }

  function handleAudioEnd() {
    // Find the index of the current track
    const currentIndex = collection.tracks.findIndex(track => track._id === currentTrack._id);
    
    // If there is a next track, set it as the current track
    if (currentIndex < collection.tracks.length - 1) {
      setCurrentTrack(collection.tracks[currentIndex + 1]);
    }
  }

  return (
    <div className="audio">
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
        onEnded={() => handleAudioEnd()}
      />
      {collection.tracks.map((track, idx) => {
        return (
          <div className="track" key={track._id}>
            <button 
              className={`play-btn ${track === currentTrack ? "current" : ""}`} 
              onClick={() => handleTrackSelect(track)}
            >
              <img className="play-img" src={process.env.PUBLIC_URL + '/images/play.svg'} alt="play button"/>
            </button>
            <h3>{idx + 1}. {track.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
