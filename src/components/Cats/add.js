import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

class AddCat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  onCreateCat = (e, authUser) => {
    this.props.firebase.cats().push({
      text: this.state.text,
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
      userId: authUser.uid
    });
    this.setState({ text: '' });
    e.preventDefault();
  }

  onChangeText = e => {
    this.setState({ text: e.target.value });
  };

  render() {

    const { text } = this.state;

    return (
      <div>
      <h1>Add cat</h1>
      <AuthUserContext.Consumer>
      {authUser => (
      <div>
        <form onSubmit={e => this.onCreateCat(e, authUser)}>
          <input
            type="text"
            value={text}
            onChange={this.onChangeText}
          />
          <button type="submit">Send</button>
        </form>
      </div>
       )}
       </AuthUserContext.Consumer>
       </div>
    );
    
  }

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddCat);