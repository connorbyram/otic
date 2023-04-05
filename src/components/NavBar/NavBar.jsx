import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import "./NavBar.css"

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <section>
        <div className="nav-container">
          <Link className='logo' to="/"><><strong>otic</strong></> &#123;oh-tik&#125;</Link>
          <div className="nav-links">
            {user.creator && <Link to="/new_collection">Add Collection</Link> }
            <Link to="" onClick={handleLogOut}>Log Out</Link>
          </div>
        </div>
      </section>
    </nav>
  );
}