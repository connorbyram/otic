import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import * as collectionsAPI from '../../utilities/collections-api';
import CollectionForm from '../../components/CollectionForm/CollectionForm'
import "./CollectionPage.css"

export default function CollectionPage({ collections, setCollections, user }) {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [collection, setCollection] = useState(null);
    const { userName, collectionTitle } = useParams();
    
    useEffect(function() {
        const collection = collections.find((c) => c.user.name === userName && c.title === collectionTitle);
        setCollection(collection);
    }, [collections, collectionTitle, userName]);

    async function handleDeleteCollection(id) {
        await collectionsAPI.deleteCollection(id);
        const remainingCollections = collections.filter((collection) => collection._id !== id);
        setCollections(remainingCollections);
        navigate('/');
    }

    if (!collection) return null;


    return (
        <>
            
            { !edit? 
                <section>
                    <div className="container">
                        <div className="flex">
                            <div className="collection-info">
                                <div className="collection-cover">
                                    <img src={collection.imageUrl} alt="collection art" />
                                    {user._id === collection.user._id?
                                        <div className="controls">
                                            <button onClick={() => setEdit(!edit)}>Edit</button>
                                            <button onClick={() => handleDeleteCollection(collection._id)}>Delete</button>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                <div>
                                    <h1>{collection.title}</h1>
                                    <h2> by {collection && collection.user.name}</h2>
                                    <h3>{collection.releaseDate}</h3>
                                </div>
                            </div>
                            <div className="collection-player">
                                <iframe 
                                    title={collection.title}
                                    src={`https://bandcamp.com/EmbeddedPlayer/album=${collection.embed}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/`} seamless>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <>
                    <button onClick={() => setEdit(!edit)}>Close</button>
                    <CollectionForm collection={collection} collections={collections} setCollections={setCollections} />
                </>
            }
        </>

    );
}