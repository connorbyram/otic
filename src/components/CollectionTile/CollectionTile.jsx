import './CollectionTile.css'
import { Link } from "react-router-dom";

export default function CollectionTile({ collection }) {

    return (
        <Link className='tile' to={`/${collection.user.name}/${collection.title}`}>
            <img className='tile-img' src={collection.imageUrl} alt="collection art" />
            <div className='flex-vert'>
                <h3>{collection.title}</h3>
                <h4>{collection.user.name}</h4>
            </div>
        </Link>
    );
}