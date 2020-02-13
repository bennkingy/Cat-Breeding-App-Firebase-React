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

  onEditMessage = () => {

  }

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
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
          <MessageList
            messages={messages}
            onRemoveMessage={this.onRemoveMessage}
            onEditMessage={this.onEditMessage}
          />
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

const MessageList = ({ messages, onRemoveMessage, onEditMessage }) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onRemoveMessage={onRemoveMessage}
        onEditMessage={onEditMessage}
      />
    ))}
  </ul>
)

class MessageItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editText: this.props.message.text
    }
  }

  onTogleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text
    }))
  }

  onChangeEditText = e => {
    this.setState({ editText: e.target.value })
  }

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText)
    this.setState({editMode: false})
  }

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;
    return(
      <li>
        {editMode ? (
          <input type="text" value={editText} onChange={this.onChangeEditText} />
        ) : (<div>
         <strong>{message.userId}</strong> <p>{message.text}</p></div>
        )}
        {editMode ? (
          <span>
            <button onClick={this.onSaveEditText}>Save</button>
            <button onClick={this.onToggleEditMode}>Reset</button>
          </span>
        ) : (
            <button onClick={this.onToggleEditMode}>Edit</button>
        )}
        {!editMode && (
        <button type="button" onClick={() => onRemoveMessage(message.uid)}>Delete</button>
        )}
      </li>
    )
  }

}

const Messages = withFirebase(MessageBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);