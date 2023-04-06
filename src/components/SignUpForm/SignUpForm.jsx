import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch (err) {
      console.log(err);
      const errorString = JSON.stringify(err);
      if (errorString.includes('name')) {
        this.setState({error: `The name "${this.state.name}" is already taken`});
      } else if (errorString.includes('email')) {
        this.setState({ error: `The email "${this.state.email}" is already taken`});
      }
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="btns">
            <div className="flex-vrt">
              <label>Name</label>
              <input className='login-input' type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className="flex-vrt">
              <label>Email</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="btns">
            <div className="flex-vrt">
              <label>Password</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className="flex-vrt">
              <label>Confirm Password</label>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="btns">
            <button type="submit" disabled={disable}>SIGN UP</button>
            <button className='btn-2' onClick={() => this.props.setShowSignUp(false)}>LOGIN</button>
          </div>
        </form>
        <p className="error-message">{this.state.error}</p>
      </>
    );
  }
}