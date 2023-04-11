import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as userService from '../../utilities/users-service';
import "./NavBar.css"
import UserMenu from '../UserMenu/UserMenu';
import blob2 from '../../images/blob2.jpeg';

export default function NavBar({ user, setUser }) {
  const [userMenu, setUserMenu] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <section>
        <div className="nav-container">
          <Link className='logo' to="/"><strong>otic</strong> &#123;oh-tik&#125;</Link>
          <div className="nav-links">
            <Link onClick={() => setUserMenu(!userMenu)} ><img className='profile-img-small' src={blob2} alt="" /></Link>
            {userMenu && <UserMenu user={user} handleLogOut={handleLogOut} setUserMenu={setUserMenu} />}
          </div>
        </div>
      </section>
    </nav>
  );
}