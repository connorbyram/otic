import React, { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import './Player.css'

export default function Player({ tracks, collection }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [listenTime, setListenTime] = useState(0);
  const [listenAdded, setListenAdded] = useState(false);
  const audioRef = useRef(null);

  function handleTrackSelect(track) {
    if (track === currentTrack) {
      if (isPlaying) {
        setIsPlaying(false);
        audioRef.current.audioEl.current.pause();
        return;
      } else {
        setIsPlaying(true);
        audioRef.current.audioEl.current.play();
      }
      console.log('returned');
      return;
    } else {
      setCurrentTrack(track);
      setListenTime(0);
      setListenAdded(false);
    }
  }

  useEffect(() => {
    console.log(`${listenTime} seconds of ${trackDuration}, listen added: ${listenAdded}`)
  }, [listenTime]);

  function handleAudioEnd() {
    setListenTime(0);
    setListenAdded(false);

    // Find the index of the current track
    const currentIndex = collection.tracks.findIndex(track => track._id === currentTrack._id);
    
    // If there is a next track, set it as the current track
    if (currentIndex < collection.tracks.length - 1) {
      setCurrentTrack(collection.tracks[currentIndex + 1]);
    }
  }

  function updatePlayCount(audioRef) {
    if (listenAdded) return;
    setListenTime(listenTime + 10);
    if (listenTime >= trackDuration * 0.6) {
      console.log('Plus 1 listent!')
      setListenAdded(true);
    };
  }

  return (
    <div className="audio">
      <ReactAudioPlayer 
        className="player"
        ref={audioRef}
        title={currentTrack?.title}
        src={currentTrack?.url}
        autoPlay
        controls
        onPause={() => setIsPlaying(false)}
        onPlay={() => { 
          const duration = Math.floor(audioRef.current.audioEl.current.duration / 10) * 10;
          setTrackDuration(duration);
          setIsPlaying(true)}}
        onEnded={() => handleAudioEnd()}
        onListen={() => updatePlayCount(audioRef)} 
      />
      {collection.tracks.map((track, idx) => {
        return (
          <div className="track" key={track._id}>
            <button 
              className={`play-btn ${track === currentTrack ? "current" : ""}`} 
              onClick={() => handleTrackSelect(track)}
            >
              {track === currentTrack && isPlaying ? 
              <img className="play-img" src={process.env.PUBLIC_URL + '/images/pause.svg'} alt="play button"/>
              :
              <img className="play-img" src={process.env.PUBLIC_URL + '/images/play.svg'} alt="play button"/>
              }
            </button>
            <h3>{idx + 1}. {track.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
