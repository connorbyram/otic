import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser, setShowSignUp, confirmPage }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      if(confirmPage) {
        await usersService.confirm(credentials);
      } else{
        // The promise returned by the signUp service method 
        // will resolve to the user object included in the
        // payload of the JSON Web Token (JWT)
        const user = await usersService.login(credentials);
        setUser(user);
      }
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
        { confirmPage ? 
          <>
            <label>Confirmation Code</label>
            <input type="text" name="confirmationCode" value={credentials.confirmationCode} onChange={handleChange} required />
            <div className="btns">
              <button type="submit">CONFIRM</button>
              <button className='btn-2' onClick={() => setShowSignUp(true)}>SIGN UP</button>
            </div>
          </>
          :
          <>
            <label>Password</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            <div className="btns">
              <button type="submit">LOG IN</button>
              <button className='btn-2' onClick={() => setShowSignUp(true)}>SIGN UP</button>
            </div>
          </>
        
        }
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}