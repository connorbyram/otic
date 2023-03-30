import "react-datepicker/dist/react-datepicker.css";
import CollectionForm from '../../components/CollectionForm/CollectionForm'
import './NewCollectionPage.css'
// import * as collectionsAPI from '../../utilities/collections-api';

export default function NewCollectionPage({ collection, collections, setCollections }) {
  return (
    <CollectionForm collection={collection} collections={collections} setCollections={setCollections} />
  );
}