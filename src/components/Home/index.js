import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const HomePage = () => (
	<div>
		<h1>Homepage</h1>
		<p>The homepage is accessible by every signed in user.</p>
    <Messages />
	</div>
)

class MessageBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: []
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();
      const messageList = Object.keys(messageObject).map(key => ({
        ...messageObject[key],
        uid: key
      }))
      if (messageObject) {
        this.setState({ messages: messageList, loading: false})
      } else {
        this.setState({ messages: null, loading: false })
      }
    })
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onCreateMessage = (e, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid
    });
    this.setState({ text: '' });
    e.preventDefault();
  }

  onChangeText = e => {
    this.setState({ text: e.target.value });
  };

  render() {

    console.log(this.state);

    const { text, messages, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
        <div>
          {loading && <div>Loading ...</div>}
          {messages ? (
          <MessageList messages={messages} />
          ) : (
            <div>There are no messages</div>
          )}
          <form onSubmit={e => this.onCreateMessage(e, authUser)}>
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
    );
  }

}

const MessageList = ({ messages}) => (
  <ul>
    {messages.map(message => (
      <MessageItem key={message.uid} message={message} />
    ))}
  </ul>
)

const MessageItem = ({ message }) => (
  <li>
    <strong>{message.userId}</strong> {message.text}
  </li>
)

const Messages = withFirebase(MessageBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);