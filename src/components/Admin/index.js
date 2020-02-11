import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
)

class UserListBase extends React.Component {

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
				  <li key={user.uid}>
            {user.email}, {user.username}
            <Link to={{pathname: `${ROUTES.ADMIN}/users/${user.uid}`,state: {user}, }}>Go</Link>
          </li>
				))}
			</ul>
		)

		return (
			<div>
				<h1>Users</h1>
				{loading && <div>Loading...</div>}
				<UserList users={users}></UserList>
			</div>
		)

  }
  
}

class UserItemBase extends React.Component {

  constructor(props) {
		super(props)
		this.state = {
			loading: false,
      user: null,
      ...props.location.state
		}
  }

  componentDidMount() {
    if (this.state.user) {
      return
    }
    this.setState({ loading: true });
		this.props.firebase.user(this.props.match.params.id).on('value', snapshot => {
			this.setState({
				user: snapshot.val(),
				loading: false
			});
		});
  } 

	componentWillUnmount() {
		this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  }

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send Password reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const condition = authUser => 
  authUser && !!authUser.roles[ROLES.ADMIN];
  
const UserList = withFirebase(UserListBase);  
const UserItem = withFirebase(UserItemBase);  

export default compose(
	withAuthorization(condition),)
	(AdminPage);