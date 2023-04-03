export default function EditMenu({ showMenu, setShowMenu, edit, setEdit, confirmDelete, setConfirmDelete }) {
    return (
        <> 
            <div className="menu" onMouseLeave={() => setShowMenu(false)}>
                <button className='hamburger' onClick={() => setShowMenu(!showMenu)}><img src={process.env.PUBLIC_URL + '/images/menu.png'} alt="menu button"></img></button>
                { showMenu ?
                    <div className='controls'>
                        <button className='edit-btn' onClick={() => {setEdit(!edit); setShowMenu(false)}}>Edit</button>
                        <button className='delete-btn' onClick={() => setConfirmDelete(!confirmDelete)}>Delete</button>
                    </div>
                    :
                    <></>
                }
            </div>

        </>
    );
}