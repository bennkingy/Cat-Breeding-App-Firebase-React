import React from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends React.Component {

  constructor(props) {
		super(props)
		this.state = {
			loading: false,
			users: []
		}
  }

  componentDidMount() {
		this.setState({ loading: true });
		this.props.firebase.users().on('value', snapshot => {
			const usersObject = snapshot.val();
			console.log(usersObject)
			const usersList = Object.keys(usersObject).map(key => ({
				...usersObject[key],
				uid: key
			}));
			console.log(usersList);
			this.setState({
				users: usersList,
				loading: false
			});
		});
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	}

	render() {

		const {loading, users} = this.state;

		console.log(this.state)

		const UserList = ({ users }) => (
			<ul>
				{users.map(user => (
				  <li key={user.uid}>{user.email}, {user.username}</li>
				))}
			</ul>
		)

		return (
			<div>
				<h1>Admin</h1>
				<p>The Admin Page is accessible by every signed in admin user.</p>
				{loading && <div>Loading...</div>}
				<UserList users={users}></UserList>
			</div>
		)

	}

}

const condition = authUser => 
	authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
	withAuthorization(condition),
	withFirebase,)
	(AdminPage);
