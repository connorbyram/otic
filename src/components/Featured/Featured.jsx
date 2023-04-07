import './Featured.css';
import { Link } from "react-router-dom";

export default function Featured({ collections }) {
  const publishedCollections = collections.filter(collection => collection.publish);
  const latestCollection = publishedCollections.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

  return (
    <div className="feature">
      {latestCollection && (
        <>
          <img src={latestCollection.imageUrl} alt="album art" />
          <div className='feature-copy'>
            <h2>Latest Album:</h2>
            <h3>{latestCollection.title} by {latestCollection.user.name}</h3>
            <Link className='button-main' to={`/${latestCollection.user.name}/${latestCollection.title}`}>
              Listen Now
            </Link>
          </div>
        </>
      )}
    </div>
  );
}