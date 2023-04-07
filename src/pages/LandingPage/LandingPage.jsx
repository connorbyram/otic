import './LandingPage.css'
import CollectionTile from "../../components/CollectionTile/CollectionTile";
import Featured from '../../components/Featured/Featured';

export default function LandingPage({ collections }) {

  return (
    <>
      <section>
        <div className="container">
          <Featured collections={collections} />
        </div>
      </section>
      <section>
        <div className='container'>
          <h3>Browse Releases</h3>
          <div className='tile-grid'>
            {collections.map((collection) => {
              return (
                collection.publish && (
                  <CollectionTile collection={collection} key={collection._id} collections={collections}/> 
                )
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}