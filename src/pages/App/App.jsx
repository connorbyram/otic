import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as collectionsAPI from '../../utilities/collections-api'
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import AuthPage from '../AuthPage/AuthPage';
import LandingPage from '../LandingPage/LandingPage';
import CollectionPage from '../CollectionPage/CollectionPage'
import NewCollectionPage from '../NewCollectionPage/NewCollectionPage';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [collections, setCollections] = useState([]);

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
              <Route path="/" element={<LandingPage collections={collections} setCollections={setCollections} />} />
              <Route path="/new_collection" element={<NewCollectionPage collections={collections} setCollections={setCollections} />} />
              <Route path="/:userName/:collectionTitle" element={<CollectionPage collections={collections} setCollections={setCollections} user={user} />} />
              {/* <Route path="/collections/favorites" element={<LandingPage collections={collections} />} /> */}
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
