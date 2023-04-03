import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import * as collectionsAPI from "../../utilities/collections-api";

export default function AddTracksForm({ collection }) {
    const [title, setTitle] = useState('');
    const [tracks, setTracks] = useState([]);

    const fileInputRef = useRef();
    // const navigate = useNavigate();


    async function handleUpload(evt) {
      evt.preventDefault();

      const trackData = new FormData();
      trackData.append('title', title);
      trackData.append('track', fileInputRef.current.files[0]);
      const newTrack = await collectionsAPI.uploadTrack(collection._id, trackData);
      setTracks([...tracks, newTrack]);
      setTitle('');
      fileInputRef.current.value = '';
    };
  

    return (
        <>
            {collection.tracks.map((track, idx) => {
              return (
                <>
                    <h3>{idx +1} {track.title}</h3>
                    <button>Delete</button>
                </>
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
                    accept=".mp3"
                />
                <button type="submit">+</button>
            </form>
        </>
    );
}