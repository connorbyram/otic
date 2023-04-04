import './LandingPage.css'
import CollectionTile from "../../components/CollectionTile/CollectionTile";

export default function LandingPage({ collections }) {

  return (
    <>
      <section>
        <div className='container'>
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