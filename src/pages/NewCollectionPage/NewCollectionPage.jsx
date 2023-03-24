import { useState } from "react";
import { useNavigate } from "react-router-dom";

const options = [
  'Alternative',
  'Ambient',
  'Blues',
  'Classical',
  'Country',
  'Dance',
  'Electronic',
  'Experimental',
  'Folk',
  'Funk',
  'Hip-Hop/Rap',
  'Jazz',
  'Metal',
  'Podcast',
  'Pop',
  'Punk',
  'R&B/Soul',
  'Reggae',
  'Rock',
  'Soundtrack',
  'Spoken Word',
  'World',
  'Other'
] 

export default function NewCollectionPage({ addCollection }) {
  const [formData, setFormData] = useState({
    title:"", 
    releaseDate: "", 
    embed: "", 
    notes: "", 
    genre:"",
  });
  const navigate = useNavigate();

  function handleSubmit(evt) {
    console.log(formData)
    evt.preventDefault();
    addCollection(formData);
    setFormData({
      title:"", 
      releaseDate: "", 
      embed: "", 
      notes: "", 
      genre:"",
    });
    // navigate('/');
  }

  function handleChange(evt) {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  return (
    <>
      <h1>NewCollectionPage</h1>
      <form className="NewCollectionForm" onSubmit={handleSubmit}>
        <input 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Title" 
        />
        <input 
          name="releaseDate" 
          value={formData.releaseDate} 
          onChange={handleChange} 
          placeholder="Release Date" 
        />
        <input 
          name="embed" 
          value={formData.embed} 
          onChange={handleChange} 
          placeholder="Embed Code" 
        />
        
        <select name="genre" value={formData.genre} onChange={handleChange}>
          {/* <option disabled selected value>Select One...</option> */}
          { options.map(function(option, idx) {
            return <option key={option} value={option}>{option}</option>
          }) };
        </select>
        <textarea 
          name="notes"
          onChange={handleChange}  
          id="" 
          value={formData.notes} 
          cols="30" rows="10"
          placeholder="Notes"
        >
        </textarea>
        <button type="submit">Add Collection</button>
      </form>
    </>
  );
}