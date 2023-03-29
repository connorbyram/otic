import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as collectionsAPI from '../../utilities/collections-api'
import '../NewCollectionPage/NewCollectionPage.css'

export default function UpdateCollectionPage({collections, setCollections}) {
    const navigate = useNavigate();
    const { collectionId } = useParams();
    const changedCollection = collections.find((c) => c._id === collectionId);
    const [formData, setFormData] = useState(changedCollection);
    const [releaseDate, setReleaseDate] = useState("");
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    if (!changedCollection) return null;

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


    async function handleUpdateCollection(formData, collectionId) {
        await collectionsAPI.updateCollection(formData, collectionId);
        const updatedCollections = await collectionsAPI.index();
        setCollections(updatedCollections);
        navigate(`/${collectionId}`);
    }

    function handleChange(evt) {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        setFormData({...formData, [evt.target.name]: value })
        if (evt.target.name === 'agreement') {
          setIsAgreementChecked(evt.target.checked);
        }
    }

    function handleSubmitUpdate(evt) {
        evt.preventDefault();
        handleUpdateCollection(formData, collectionId);
    }

    return (
        <>
            <h1>NewCollectionPage</h1>
            <section>
                <div className="container">
                <form className="NewCollectionForm" onSubmit={handleSubmitUpdate}>
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