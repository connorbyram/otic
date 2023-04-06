import { useState, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'
import blob1 from '../../images/blob.jpeg';
import blob2 from '../../images/blob2.jpeg';

export default function AuthPage({ setUser, confirmPage }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [blobBackground, setBlobBackground] = useState(blob2);

  useEffect(() => {
    setBlobBackground(showSignUp ? blob2 : blob1);
  }, [showSignUp]);

  return (
    <div className="wrapper">
      <div className="frost">
      </div>
      <div className="login">
        <h1><strong>otic</strong> &#123;oh-tik&#125;</h1>
        <h2>: a music platform for musicians,<br/>by musicians</h2>
        { confirmPage? 
          <LoginForm setUser={setUser} setShowSignUp={setShowSignUp} confirmPage={confirmPage} />
        :
          <>
              { showSignUp ?
                <SignUpForm setUser={setUser} setShowSignUp={setShowSignUp} />
                :
                <LoginForm setUser={setUser} setShowSignUp={setShowSignUp} />
              }
          </>
        }
      </div>
      <div className="blobs">
        <div className="blob" style={{ backgroundImage: `url(${blobBackground})` }} />
        <div className="blob-two" style={{ backgroundImage: `url(${blobBackground})` }} />
      </div>
    </div>
  );
}