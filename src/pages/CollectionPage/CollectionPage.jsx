import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as collectionsAPI from '../../utilities/collections-api';
import CollectionForm from '../../components/CollectionForm/CollectionForm'
import "./CollectionPage.css"

export default function CollectionPage({collections, setCollections, user}) {
    const [edit, setEdit] = useState(false);
    let { collectionID } = useParams();
    let collection = collections.find((c) => c._id === collectionID);

    const navigate = useNavigate();

    async function handleDeleteCollection(id) {
        const deletedCollection = await collectionsAPI.deleteCollection(id);
        console.log(deletedCollection, 'this is our deleted item');
        const remainingCollections = collections.filter((collection) => collection._id !== id);
        setCollections(remainingCollections);
        navigate('/');
    }

    if (collections.length===0) return null;


    return (
        <>
            <button onClick={() => setEdit(!edit)}>Edit</button>
            { edit? 
                <section>
                    <div className="container">
                        <div className="flex">
                            <div className="collection-info">
                                <div className="collection-cover">
                                    <img src={collection.imageUrl} alt="collection art" />
                                    {user._id === collection.user._id?
                                        <div className="controls">
                                            <Link to={`/${collection._id}/update`}>Update</Link>
                                            <button onClick={() => handleDeleteCollection(collection._id)}>Delete</button>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                <div>
                                    <h1>{collection.title}</h1>
                                    <h2> by {collection && collection.user.name}</h2>
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
                <CollectionForm collection={collection} />
            }
        </>

    );
}