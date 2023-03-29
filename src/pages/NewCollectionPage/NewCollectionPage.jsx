import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './NewCollectionPage.css'
// import * as collectionsAPI from '../../utilities/collections-api';

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
  const [releaseDate, setReleaseDate] = useState("");
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl:"",
    title:"", 
    releaseDate: "", 
    embed: "", 
    notes: "", 
    genre:"",
    agreement:false
  });

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    await addCollection({
      ...formData,
      releaseDate: releaseDate,
    });
    setFormData({
      imageUrl:"",
      title:"", 
      releaseDate: "",
      embed: "", 
      notes: "", 
      genre:"",
      agreement:false
    });
    setReleaseDate("");
    navigate('/');
  }

  function handleChange(evt) {
      const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
      setFormData({...formData, [evt.target.name]: value })
      if (evt.target.name === 'agreement') {
        setIsAgreementChecked(evt.target.checked);
      }
  }

  return (
    <>
      <h1>NewCollectionPage</h1>
      <section>
        <div className="container">
          <form className="NewCollectionForm" onSubmit={handleSubmit}>
            <input 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              placeholder="Cover URL" 
              autoComplete="off"
            />
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="Title"
              autoComplete="off" 
            />
            <DatePicker 
              className="date"
              name="releaseDate" 
              selected={releaseDate} 
              onChange={(date) => setReleaseDate(date)} 
              placeholderText="Release Date"
              autoComplete="off" 
            />
            <input 
              name="embed" 
              selected={formData.embed} 
              onChange={handleChange} 
              placeholder="Embed Code" 
              autoComplete="off"
            />
            
            <select name="genre" value={formData.genre} onChange={handleChange}>
              <option value="" disabled>Select genre...</option>
              { options.map(function(option, idx) {
                return <option key={option} value={option}>{option}</option>
              }) };
            </select>
            <textarea 
              name="notes"
              onChange={handleChange}  
              id="" 
              value={formData.notes} 
              cols="30" rows="5"
              placeholder="Notes"
            />
            <div className="agreement">
              <input
                type="checkbox"
                name="agreement"
                onChange={handleChange}
                value={formData.agreement} 
              />
              <p>By checking this box and submitting this new collection, you certify that you own or control all rights to all of the submitted data.</p>
            </div>
            <button type="submit" disabled={!isAgreementChecked}>Add Collection</button>
          </form>
        </div>
      </section>
    </>
  );
}