import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as collectionsAPI from '../../utilities/collections-api'
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import LandingPage from '../LandingPage/LandingPage';
import NewCollectionPage from '../NewCollectionPage/NewCollectionPage';
import CollectionPage from '../CollectionPage/CollectionPage'
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [collections, setCollections] = useState([]);

  async function addCollection(collection) {
    const newCollection = await collectionsAPI.create(collection);
    console.log(newCollection);
    setCollections([...collections, newCollection]);
  }

  useEffect(function() {
    async function getCollections() {
      const allCollections = await collectionsAPI.index();   
      setCollections(allCollections);
    }
    getCollections()
  }, [collections])



  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<LandingPage collections={collections} />} />
              <Route path="/new_collection" element={<NewCollectionPage addCollection={addCollection} />} />
              <Route path="/:collectionID" element={<CollectionPage collections={collections} user={user} setCollections={setCollections}/>} />
              <Route path="/:userName" element={<LandingPage collections={collections} />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
