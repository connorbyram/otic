import { useParams } from "react-router-dom";
import * as collectionsAPI from '../../utilities/collections-api';
import "./CollectionPage.css"

export default function CollectionPage({collections, setCollections, user}) {
    let { collectionID } = useParams();
    let collection = collections.find((c) => c._id === collectionID);

    async function handleDeleteCollection(id) {
        await collectionsAPI.deleteCollection(id);
        const remainingCollections = collections.filter(collection => collection._id !==id);
        setCollections(remainingCollections);
    }

    if (collections.length===0) return null;

    return (
        <section>
            <div className="container">
                <div className="flex">
                    <div className="collection-info">
                        <div>
                            <img src={collection.imageUrl} alt="collection art" />
                            {user._id === collection.user._id?
                                <div><button onClick={() => handleDeleteCollection(collection._id)}>Delete</button></div>
                                :
                                <></>
                            }
                        </div>
                        <div>
                            <h1>{collection.title}</h1>
                            <h2> by {collection.user.name}</h2>
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

    );
}