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
			<div>	
				<h1>Password Change</h1>	
				<form onSubmit={this.onSubmit}>
					<input
						name="passwordOne"
						value={passwordOne}
						onChange={this.onChange}
						type="password"
						placeholder="Password">
					</input>
					<input
						name="passwordTwo"
						value={passwordTwo}
						onChange={this.onChange}
						type="password"
						placeholder="Password">
					</input>
          
					<button type="submit" disabled={isInvalid}>Change My Password</button>

					{error && <p>{error.message}</p>}
				</form>
			</div>
    );
  }
}

export default withFirebase(PasswordChangeForm);