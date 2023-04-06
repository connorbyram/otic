import React, { useState, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
import * as collectionsAPI from "../../utilities/collections-api";
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

  async function updatePlayCount(audioRef) {
    if (listenAdded) return;
    setListenTime(listenTime + 1);
    if (listenTime >= trackDuration * 0.6) {
      setListenAdded(true);
      const updatedTrack = { ...currentTrack, listens: currentTrack.listens + 1 };
      await collectionsAPI.updateTrack(updatedTrack._id, updatedTrack);
    };
  }

  return (
    <div className="audio">
      <div className="player-head">
        {currentTrack?
          <h4><strong>Now Playing:</strong> {currentTrack?.title} by {collection?.user.name} </h4>
          :
          <><h4><strong>Now Playing:</strong></h4></>
        }
        <ReactAudioPlayer 
          className="player"
          ref={audioRef}
          title={currentTrack?.title}
          src={currentTrack?.url}
          autoPlay
          controls
          controlsList="nodownload noplaybackrate"
          onPause={() => setIsPlaying(false)}
          onPlay={() => { 
            const duration = audioRef.current.audioEl.current.duration;
            setTrackDuration(duration);
            setIsPlaying(true)}}
          onEnded={() => handleAudioEnd()}
          listenInterval={1000}
          onListen={() => updatePlayCount(audioRef)} 
        />

      </div>
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
