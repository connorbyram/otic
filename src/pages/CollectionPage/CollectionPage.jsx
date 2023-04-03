import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import React from 'react';
import CollectionForm from '../../components/CollectionForm/CollectionForm';
import CollectionTile from '../../components/CollectionTile/CollectionTile';
import AddTracksForm from '../../components/AddTracksForm/AddTracksForm';
import EditMenu from '../../components/EditMenu/EditMenu';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import "./CollectionPage.css";

export default function CollectionPage({ collections, setCollections, user }) {
    const [collection, setCollection] = useState(null);
    const [edit, setEdit] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [track, setTrack] = useState(null);
    const { userName, collectionTitle } = useParams();

    const currentPage = collection;
    
    useEffect(function() {
        const collection = collections.find((c) => c.user.name === userName && c.title === collectionTitle);
        setCollection(collection);
    }, [collections, collectionTitle, userName, track]);

    if (!collection) return null;

    const otherCollections = collections.filter((c) => c.user.name === currentPage.user.name && c.title !== currentPage.title);
    const hasOtherCollections = otherCollections.length > 0;


    return (
        <>
            { !edit ? 
                <section>
                    <div className="container">
                        <div className="flex">
                            <div className="column" id="left">
                                <img className='cover-art' src={collection.imageUrl} alt="collection art" />
                                {user._id === collection.user._id && (
                                    <EditMenu 
                                        collection={collection} 
                                        collections={collections} setCollections={setCollections} 
                                        showMenu={showMenu} setShowMenu={setShowMenu} 
                                        edit={edit} setEdit={setEdit} 
                                        confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete}
                                    />
                                )}
                                {hasOtherCollections && <h3>Other Collections:</h3>}
                                <div className='other-collections'>
                                    {collections.map((collection) => {
                                        return (
                                            <React.Fragment key={collection._id}>
                                                {currentPage.user.name === collection.user.name && currentPage.title !== collection.title  ?
                                                    <CollectionTile collection={collection} key={collection._id} collections={collections}/> 
                                                :
                                                <></>
                                                }
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="column">
                                <h1>{collection.title}</h1>
                                <span>
                                    <h2>{collection.user.name}</h2>
                                    <h4>{new Date(collection.releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
                                </span>
                                {user._id === collection.user._id &&  (
                                    < AddTracksForm 
                                        collection={collection} setCollections={setCollections} 
                                        collections={collections}
                                        tracks={tracks} setTracks={setTracks} 
                                        setTrack={setTrack}
                                    />
                                )}     
                                <iframe 
                                    title={collection.title}
                                    src={`https://bandcamp.com/EmbeddedPlayer/album=${collection.embed}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/`} seamless>
                                </iframe>
                                <p>{collection.notes}</p>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <CollectionForm collection={collection} collections={collections} setCollections={setCollections} edit={edit} setEdit={setEdit} />
            }
            { confirmDelete && (
                <ConfirmDelete 
                    collection={collection}
                    collections={collections} setCollections={setCollections}
                    setConfirmDelete={setConfirmDelete}
                    setShowMenu={setShowMenu}
                />
            )}
        </>

    );
}