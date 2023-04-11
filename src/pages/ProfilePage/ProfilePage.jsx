import CollectionTile from "../../components/CollectionTile/CollectionTile";

export default function ProfilePage({ collections, user }) {
    return(
        <main>
            <section>
                <div className="container">
                    <h1>{user.name}</h1>
                    <div className='tile-grid'>
                        {collections.map((collection) => {
                        return (
                            collection.publish && collection.user.name === user.name && (
                            <CollectionTile collection={collection} key={collection._id} collections={collections}/> 
                            )
                        );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}