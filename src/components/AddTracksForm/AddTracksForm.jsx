import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as collectionsAPI from "../../utilities/collections-api";
import './AddTrackForm.css';

export default function AddTracksForm({ collection, collections, setCollections, tracks, setTracks, setTrack }) {
    const [title, setTitle] = useState('');
    
    const navigate = useNavigate ();
    const fileInputRef = useRef();

    async function handleUpload(evt) {
      evt.preventDefault();

      const trackData = new FormData();
      trackData.append('title', title);
      trackData.append('track', fileInputRef.current.files[0]);
      const updatedCollection = await collectionsAPI.uploadTrack(collection._id, trackData);
      setCollections(collections.map((c) => c._id === updatedCollection._id ? updatedCollection : c));
      setTitle('');

      fileInputRef.current.value = '';
      navigate(`/${updatedCollection.user.name}/${updatedCollection.title}`);
    };

    async function handleDeleteTrack(trackId) {
      const updatedCollection = await collectionsAPI.deleteTrack(trackId);
      setCollections(collections.map((c) => c._id === updatedCollection._id ? updatedCollection : c));
    }
  

    return (
        <>
            {collection.tracks.map((track, idx) => {
              return (
                <div className="track" key={track._id}>
                    <h3>{idx +1}. {track.title}</h3>
                    <button onClick={() => handleDeleteTrack(track._id)}>Delete</button>
                </div>
              )
            })}
            <form onSubmit={handleUpload}>
                <label>Track Title</label>
                <input 
                  value={title}
                  onChange={(evt) => setTitle(evt.target.value)}
                  placeholder="Title"
                />
                <label>Add a Track:</label>
                <input 
                    type="file"
                    ref={fileInputRef}
                    accept=".mp3, .wav"
                />
                <button type="submit">+</button>
            </form>
        </>
    );
}