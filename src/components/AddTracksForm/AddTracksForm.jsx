import { useState, useRef } from "react";

export default function AddTracksForm() {
    const [tracks, setTracks] = useState([]);
    const fileInputRef = useRef();
    const titleInputRef = useRef();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const title = titleInputRef.current.value;
      const track = fileInputRef.current.files[0];
      const number = tracks.length + 1;
      
      setTracks((prevTracks) => [...prevTracks, { title, track, number }]);
      titleInputRef.current.value = "";
      fileInputRef.current.value = "";
    };
  

    return (
        <>
            {tracks.map((track, index) => (
                <div key={index}>
                    <span>{track.number} - </span>
                    <span>{track.title}</span>
                </div>
            ))}
            <form onSubmit={handleSubmit}>
                <label>Track Title</label>
                <input 
                  name="title" 
                  type="text"
                  ref={titleInputRef}
                  placeholder="Title"
                  autoComplete="off" 
                  required
                />
                <label>Add a Track:</label>
                <input 
                    type="file"
                    name="track"
                    ref={fileInputRef}
                    // accept=".wav, .mp3"
                />
                <button type="submit">+</button>
            </form>
        </>
    );
}