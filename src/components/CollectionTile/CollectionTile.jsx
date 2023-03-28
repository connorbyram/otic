import './CollectionTile.css'
import { Link } from "react-router-dom";

export default function CollectionTile({ collection }) {

    return (
        <Link to={`/${collection._id}`}>
            <img src={collection.imageUrl} alt="collection art" />
            <div className='flex-vert'>
                <h3>{collection.title}</h3>
                <h4>by {collection.user.name}</h4>
            </div>
        </Link>
    );
}