import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
  error: null
}

class PasswordChangeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = e => {
		const { passwordOne } = this.state
		this.props.firebase 
			.doPasswordUpdate(passwordOne)
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
      passwordOne, passwordTwo, error
		} = this.state;
		
		const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
			<form onSubmit={this.onSubmit} className="mb-6">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              New Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Enter new password">
            </input>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
             Repeat New Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Enter new password">
            </input>
          </div>
          </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isInvalid}>Change My Password</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);