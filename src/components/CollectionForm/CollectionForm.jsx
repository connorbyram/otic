import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/NewCollectionPage/NewCollectionPage.css"
import * as collectionsAPI from "../../utilities/collections-api";
import './CollectionForm.css';

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
 

export default function NewCollectionPage({ collection, collections, setCollections }) {
  const isAdd = !collection
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl:collection ? collection.imageUrl : "",
    title: collection ? collection.title : "", 
    releaseDate: collection ? collection.releaseDate : "", 
    embed: collection ? collection.embed : "", 
    notes: collection ? collection.notes : "", 
    genre: collection ? collection.genre : "",
    agreement: false
  });

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isAdd) {
      const imageData = new FormData();
      imageData.append('image', fileInputRef.current.files[0]);
      const newImage = await collectionsAPI.uploadImage(imageData);
      formData.imageUrl = newImage.url;
      setImage(image);
      fileInputRef.current.value = '';

    }

    isAdd ? addCollection(formData) : updateCollection(formData);
    setFormData({
      imageUrl:"",
      title:"", 
      releaseDate: "",
      embed: "", 
      notes: "", 
      genre:"",
      agreement:false
    });
    navigate('/');
  }

  function handleChange(evt) {
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setFormData({...formData, [evt.target.name]: value })
    if (evt.target.name === 'agreement') {
      setIsAgreementChecked(evt.target.checked);
    }
  }

  async function addCollection(collection) {
    const newCollection = await collectionsAPI.create(collection);
    setCollections([newCollection, ...collections]);
    navigate(`/${newCollection.user.name}/${newCollection.title}`);
  }

  async function updateCollection(formData) {
    const { imageUrl, ...collectionData } = formData;
    const updatedCollection = await collectionsAPI.updateCollection(collection._id, collectionData);
    setCollections(collections.map((c) => c._id === updatedCollection._id ? updatedCollection : c));
    navigate(`/${updatedCollection.user.name}/${updatedCollection.title}`);
  }

  function handlePreview(evt) {
    const file = evt.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <form className="NewCollectionForm" onSubmit={handleSubmit}>
            <div className="flex">
              <div className="column" id="left">
                {collection && collection.imageUrl && (
                  <img src={collection.imageUrl} alt="Current cover art" />
                )}
                {previewImage ? (
                  <img src={previewImage} alt="Preview" />
                ) : (
                  <img src="/images/img.jpeg" alt="Preview" />
                )}
              </div>
              <div className="column">
                {!collection && (
                  <>
                    <label>Upload Cover Art:</label>
                    <input 
                      type="file"
                      name="image"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handlePreview}
                    />
                  </>
                )}
                <input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Title"
                  autoComplete="off" 
                />
                <input
                  type="date" 
                  name="releaseDate"
                  value={formData.releaseDate ? formData.releaseDate.slice(0,10) : ''} 
                  onChange={handleChange} 
                />
                <input 
                  name="embed" 
                  value={formData.embed} 
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
              </div>
            </div>
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