import { useParams } from "react-router-dom";
import "./CollectionPage.css"

export default function CollectionPage({collections}) {
    let { collectionTitle } = useParams();
    let collection = collections.find((c) => c.title === collectionTitle);
    console.log(collections, "detail page");

    if (collections.length===0) return null;

    return (
        <section>
            <div className="container">
                <div className="flex">
                    <div className="collection-info">
                        <img src={collection.imageUrl} alt="collection art" />
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