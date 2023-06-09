import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as collectionsAPI from '../../utilities/collections-api'
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import AuthPage from '../AuthPage/AuthPage';
import LandingPage from '../LandingPage/LandingPage';
import CollectionPage from '../CollectionPage/CollectionPage'
import NewCollectionPage from '../NewCollectionPage/NewCollectionPage';
import ConfirmPage from '../ConfirmPage/ConfirmPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import AboutUs from '../AboutUs/AboutUs';
import TermsOfService from '../TermsOfService/TermsOfService';


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
              {/* Protected route components */}
              <Route path="/" element={<LandingPage collections={collections} setCollections={setCollections} />} />
              <Route path="/about" element={<AboutUs/>} />
              <Route path="/termsofservice" element={<TermsOfService/>} />
              <Route path="/new_collection" element={<NewCollectionPage collections={collections} setCollections={setCollections} />} />
              <Route path="/:userName" element={<ProfilePage collections={collections} user={user}/>} />
              <Route path="/:userName/:collectionTitle" element={<CollectionPage collections={collections} setCollections={setCollections} user={user} />} />
              {/* <Route path="/collections/favorites" element={<LandingPage collections={collections} />} /> */}
            </Routes>
            <Footer/>
          </>
          :
          <Routes>
            {/* Unprotected route components */}
            <Route path="/" element={<AuthPage setUser={setUser} />} />
            <Route path="/confirm" element={<ConfirmPage setUser={setUser} />} />
          </Routes>
      }
    </main>
  );
}
