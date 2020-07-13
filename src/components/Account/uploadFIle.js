import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

export class ReactFirebaseFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null
    }
  }

  handleChange = e => {
    if(e.target.files[0]) {
      this.setState(
        {
          image: e.target.files[0]
        });
    }
  };

  handleUpload = () => {
    const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
          })
      }
    )
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange} />
        <button type="submit" onClick={this.handleUpload}>Send</button>
      </div>
    );
  }

};