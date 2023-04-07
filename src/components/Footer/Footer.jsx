import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './Footer.css'

export default function Footer() {
    return (
        <>
            <section id="footer">
                <div className="container" id="footer-container">
                    <div className="brand">
                        <Link className='logo' to="/"><h3><strong>otic</strong> &#123;oh-tik&#125;</h3></Link>
                        <br/>
                        <p>: a music platform for musicians,<br/>by musicians</p>
                    </div>
                    <div className="sitemap">
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="/termsofservice">Terms of Service</Link>
                    </div>
                </div>
            </section>
        </>
    );
}