import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
  error: null
}

const PasswordForgetPage = () => (
	<div>
		<h1>Password Forgot</h1>
		<PasswordForgetForm />
	</div>
)

class PasswordForgetFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = e => {
		const { email } = this.state
		this.props.firebase 
			.doPasswordReset(email)
			.then(() => {
			  this.setState({...INITIAL_STATE});
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
      email, error
		} = this.state;
		
		const isInvalid =
			email === '';

    return (
      <form onSubmit={this.onSubmit}>
				<input
					name="email"
					value={email}
					onChange={this.onChange}
					type="text"
					placeholder="Email">
				</input>

				<button type="submit" disabled={isInvalid}>Reset My Password</button>

				{error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
   <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);


export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };