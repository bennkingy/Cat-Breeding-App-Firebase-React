import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
			<SignInForm />
      <SignInGoogle />
			<SignUpLink />
  </div>
);

class SignInGoogleBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  onSubmit = e => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in FIrebase DB too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        })
      })
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      })
      e.preventDefault();
  }

  render() {
    const { error } = this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <button type="Submit">Sign In With Google</button>
        {error && <p>{Error.message}</p>}
      </form>
    )
  }

}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = e => {
		const {email, password } = this.state
		this.props.firebase 
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
			  this.setState({...INITIAL_STATE});
			  this.props.history.push(ROUTES.HOME);
  			})
			.catch(error => {
			  this.setState({ error });
			})
			e.preventDefault();
  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value})
  };

  render() {
    const {
      email, password, error 
		} = this.state;
		
		const isInvalid =
			password === '' ||
			email === '';

    return (
      <form onSubmit={this.onSubmit}>
				<input
					name="email"
					value={email}
					onChange={this.onChange}
					type="text"
					placeholder="Email address">
				</input>
				<input
					name="password"
					value={password}
					onChange={this.onChange}
					type="password"
					placeholder="Password">
				</input>

				<button type="submit" disabled={isInvalid}>Sign In</button>

				{error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
	withRouter,
	withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase)

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignInPage;
export { SignInForm, SignInGoogle };