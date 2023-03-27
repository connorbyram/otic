import { useParams } from "react-router-dom";

export default function CollectionPage({collections}) {
    let { collectionTitle } = useParams();
    let collection = collections.find((c) => c.title === collectionTitle);

    return (
        <div>
            <h1>{collection.title}</h1>
            {/* <h2>{collection.user.name}</h2> */}
            <span>{collection._id}</span>
        </div>

    );
}