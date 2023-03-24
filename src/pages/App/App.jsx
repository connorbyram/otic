import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as collectionsAPI from '../../utilities/collections-api'
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import LandingPage from '../LandingPage/LandingPage';
import NewCollectionPage from '../NewCollectionPage/NewCollectionPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [collections, setCollections] = useState([]);

  async function addCollection(collection) {
    const newCollection = await collectionsAPI.create(collection);
    setCollections([...collections, newCollection]);
  }

  useEffect(function() {
    async function getCollections() {
      const allCollections = await collectionsAPI.index();   
      setCollections(allCollections);
    }
    getCollections()
  }, [])



  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<LandingPage collections={collections} />} />
              <Route path="/new_collection" element={<NewCollectionPage addCollection={addCollection} />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
