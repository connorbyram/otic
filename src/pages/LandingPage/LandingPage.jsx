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
                <CollectionTile collection={collection} key={collection._id}/> 
              );
            })}
          </div>
        </div>
      </section>
        
    </>
  );
}