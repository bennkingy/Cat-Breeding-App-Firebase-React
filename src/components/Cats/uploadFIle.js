import React from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

class ReactFirebaseFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  handleChange = (e) => {
    const image = e.target.files[0];
    this.setState({ image, name: image.name });
  };

  handleUpload = () => {
    const uploadTask = firebase
      .storage()
      .ref()
      .child(`/images/${this.state.name}`)
      .put(this.state.image);

    uploadTask.on(
      'state_changed',
      () => {
        this.setState({
          ...this.state,
          ImageURL: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/images%2F${this.state.name}?alt=media`,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <div>
        <input type='file' onChange={this.handleChange} />
        <button type='submit' onClick={this.handleUpload}>
          Upload image
        </button>
        {this.state.ImageURL && (
          <img src={this.state.ImageURL} width={40} height={40} alt='cat' />
        )}
      </div>
    );
  }
}

export default ReactFirebaseFileUpload;
