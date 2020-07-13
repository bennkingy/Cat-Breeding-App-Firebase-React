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
    if (image.type === 'image/jpeg' || image.type === 'image/png')
      this.setState({ image, name: image.name });
    else alert('Only files with format jpeg and png is allowed');
  };

  handleUpload = async () => {
    const uploadTask = await firebase
      .storage()
      .ref()
      .child(`/images/${this.state.name}`)
      .put(this.state.image);
    if (uploadTask.state === 'success') {
      this.setState({
        ...this.state,
        ImageURL: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/images%2F${this.state.name}?alt=media`,
      });
    }
    else {
      alert('something went wrong');
    }
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