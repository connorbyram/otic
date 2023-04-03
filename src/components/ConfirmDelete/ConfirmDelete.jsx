import { useNavigate } from "react-router-dom";
import * as collectionsAPI from '../../utilities/collections-api';

export default function ConfirmDelete({ collection, collections, setCollections, setConfirmDelete, setShowMenu }) {
    const navigate = useNavigate();

    async function handleDeleteCollection(id) {
        await collectionsAPI.deleteCollection(id);
        const remainingCollections = collections.filter((collection) => collection._id !== id);
        setCollections(remainingCollections);
        navigate('/');
    }

    return (
        <div className='confirm-delete'>
            <div>
                <h2>Are you sure you want to delete your collection?</h2>
                <p>This action cannot be undone. Your collection will be immediately deleted from our database.</p>
                <button className='back' onClick={() => {setConfirmDelete(false); setShowMenu(false)} }>Take Me Back!</button>
                <button className='confirm-delete-btn' onClick={() => handleDeleteCollection(collection._id)}>Delete Collection</button>   
            </div>
        </div>
    );
}