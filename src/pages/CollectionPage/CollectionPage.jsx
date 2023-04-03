import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import * as collectionsAPI from '../../utilities/collections-api';
import CollectionForm from '../../components/CollectionForm/CollectionForm';
import CollectionTile from '../../components/CollectionTile/CollectionTile';
import "./CollectionPage.css";

export default function CollectionPage({ collections, setCollections, user }) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [edit, setEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [collection, setCollection] = useState(null);
    const { userName, collectionTitle } = useParams();
    const currentPage = collection;
    
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
                                {user._id === collection.user._id ?
                                    <div className="menu" onMouseLeave={() => setShowMenu(false)}>
                                        <button className='hamburger' onClick={() => setShowMenu(!showMenu)}><img src={process.env.PUBLIC_URL + '/images/menu.png'} alt="menu button"></img></button>
                                        { showMenu ?
                                            <div className='controls'>
                                                <button className='edit-btn' onClick={() => {setEdit(!edit); setShowMenu(false)}}>Edit</button>
                                                <button className='delete-btn' onClick={() => setConfirmDelete(!confirmDelete)}>Delete</button>
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                    :
                                    <></>
                                }
                                {hasOtherCollections && <h3>Other Collections:</h3>}
                                <div className='other-collections'>
                                    {collections.map((collection) => {
                                        return (
                                            <>
                                                {currentPage.user.name === collection.user.name && currentPage.title !== collection.title  ?
                                                    <CollectionTile collection={collection} key={collection._id} collections={collections}/> 
                                                :
                                                <></>
                                                }
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="column">
                                <h1>{collection.title}</h1>
                                <text>
                                    <h2>{collection.user.name}</h2>
                                    <h4>{new Date(collection.releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
                                </text>     
                                <iframe 
                                    title={collection.title}
                                    src={`https://bandcamp.com/EmbeddedPlayer/album=${collection.embed}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/`} seamless>
                                </iframe>
                                <p>{collection.notes}</p>
                            </div>
                        </div>
                    </div>
                    { confirmDelete ?
                        <div className='confirm-delete'>
                            <div>
                                <h2>Are you sure you want to delete your collection?</h2>
                                <p>This action cannot be undone. Your collection will be immediately deleted from our database.</p>
                                <button className='back' onClick={() => {setConfirmDelete(false); setShowMenu(false)} }>Take Me Back!</button>
                                <button className='confirm-delete-btn' onClick={() => handleDeleteCollection(collection._id)}>Delete Collection</button>   
                            </div>
                        </div>
                        :
                        <></>
                    }
                </section>
                :
                <>
                    <CollectionForm collection={collection} collections={collections} setCollections={setCollections} edit={edit} setEdit={setEdit} />
                </>
            }
        </>

    );
}