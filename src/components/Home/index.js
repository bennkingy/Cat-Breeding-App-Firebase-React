import React from 'react';
import { withAuthorization } from '../Session';

const HomePage = () => (
	<div>
		<h1>Homepage</h1>
		<p>The homepage is accessible by every signed in user.</p>	
	</div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);