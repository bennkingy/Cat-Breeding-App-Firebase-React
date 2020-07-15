import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import Geocode from 'react-geocode';
import firebase from 'firebase/app';
import 'firebase/storage';

import UploadFile from '../Account/uploadFile';

const INITIAL_STATE = {
  text: '',
  lat: '',
  lng: '',
  address: '',
  imageURL: '',
  description: '',
};

class AddCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLEGEOCODEKEY);
    // set response language. Defaults to english.
    Geocode.setLanguage('en');
    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion('es');
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get latidude & longitude from address.
  }

  getCords(authUser) {
    this.props.firebase.cats().push({
      text: this.state.text,
      imageURL: this.state.imageURL,
      userId: authUser.uid,
      lat: this.state.lat,
      lng: this.state.lng,
      description: this.state.description
    });
    this.setState({ ...INITIAL_STATE });
  }

  onCreateCat = (e, authUser) => {
    Geocode.fromAddress(this.state.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ lat: lat, lng: lng }, () => this.getCords(authUser));
      },
      (error) => {
        console.error(error);
      }
    );
    e.preventDefault();
  };

  onChangeText = (e) => {
    this.setState({ text: e.target.value });
  };

  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

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
        <h1>Add cat</h1>
        <AuthUserContext.Consumer>
          {(authUser) => (
            <div>
              <form onSubmit={(e) => this.onCreateCat(e, authUser)}>
                <input
                  type='text'
                  value={this.state.text}
                  onChange={this.onChangeText}
                  placeholder='Cat name'
                />
                <input
                  name='address'
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  type='text'
                  placeholder='Cat postcode'
                ></input>
                <input
                  name='description'
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  type='text'
                  placeholder='Cat description'
                ></input>
                <UploadFile
                  handleChange={this.handleChange}
                  handleUpload={this.handleUpload}
                  imageURL={this.state.imageURL}
                />
                <button type='submit'>Send</button>
              </form>
            </div>
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AddCat);