import './CollectionTile.css'
import { Link } from "react-router-dom";

export default function CollectionTile({ collection }) {

    return (
        <Link to={`/${collection.title}`}>
            <img src="https://f4.bcbits.com/img/a1288843402_16.jpg" alt="" />
            <div className='flex-vert'>
                <h3>{collection.title}</h3>
                <h4>by {collection.creator.name}</h4>
            </div>


        </Link>
    );
}