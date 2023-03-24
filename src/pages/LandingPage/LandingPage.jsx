import CollectionTile from "../../components/CollectionTile/CollectionTile";

export default function LandingPage({ collections }) {
  const collection = collections.map((collection, idx) => (
    <CollectionTile collection={collection} key={idx} />
  ));

  return (
    <>
      <h1>LandingPage</h1>
      <div>
        {collection}
      </div>
        
    </>
  );
}