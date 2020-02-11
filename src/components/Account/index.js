import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import PasswordForgetForm from '../PasswordForget';
import { withAuthorization, AuthUserContext } from '../Session';
import AddCat from '../Cats/add';

const AccountPage = () => (
  <AuthUserContext.Consumer>
		{authUser => (
			<div>
				<h1>Account: {authUser.email}</h1>
				<PasswordChangeForm />
				<PasswordForgetForm />
        <AddCat />
			</div>
		)}
	</AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);