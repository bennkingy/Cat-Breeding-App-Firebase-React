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
      <div>
        <form onSubmit={this.onSubmit } className="mb-6">
          <div class="flex flex-wrap -mx-3 mt-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Reset Password
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Enter your email">
            </input>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isInvalid}>Reset My Password</button>
            </div>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </div>
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