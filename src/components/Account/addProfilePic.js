import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import firebase from 'firebase/app';
import 'firebase/storage';
import UploadFile from './uploadFile';

const INITIAL_STATE = {
  address: '',
  imageURL: ''
};

class AddProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  uploadDP(authUser) {
    this.props.firebase.updateProfile({
      photoURL: this.state.imageURL,
      userId: authUser.uid,
    });
    this.setState({ ...INITIAL_STATE });
  }

  handleChange = (e) => {
    const image = e.target.files[0];
    if (!image) return alert('Add an image');
    if (image.type === 'image/jpeg' || image.type === 'image/png')
      this.setState({ image, name: image.name });
    else alert('Only files with format jpeg and png is allowed');
  };

  handleUpload = async () => {
    try {
      const uploadTask = await firebase
        .storage()
        .ref(`/images/${this.state.name}`)
        .put(this.state.image);
        if (uploadTask.state === 'success') {
          this.setState({
            ...this.state,
            imageURL: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/images%2F${this.state.name}?alt=media`,
          });
        }
      else {
        alert('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <h1>Add profile pic</h1>
        <AuthUserContext.Consumer>
          {(authUser) => (
            <div>
              <form onSubmit={() => this.uploadDP(authUser)}>
                <UploadFile
                  handleChange={this.handleChange}
                  handleUpload={this.handleUpload}
                  imageURL={this.state.imageURL}
                />
                <button type='submit'>Add display pic</button>
              </form>
            </div>
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AddProfilePic);