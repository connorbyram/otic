import { Link } from 'react-router-dom';
import './UserMenu.css';

export default function UserMenu({user, handleLogOut, setUserMenu}) {
    return(
        <div className="user-menu" onMouseLeave={() => setUserMenu(false)}>
            {/* <Link to={`/${user.name}`} onClick={() => setUserMenu(false)}>My Profile</Link> */}
            {user.creator && <Link to="/new_collection" onClick={() => setUserMenu(false)}>Add Collection</Link> }
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </div>
    )
}