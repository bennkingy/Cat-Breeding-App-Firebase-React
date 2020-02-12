import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import Geocode from "react-geocode";

const INITIAL_STATE = {
  text: '',
  address: '',
  initialAddress: ''
}

class AddCat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  componentDidMount() {
  }

  getCords(authUser) {
    setTimeout(() => {
      this.props.firebase.cats().push({
        text: this.state.text,
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
        userId: authUser.uid,
        address: this.state.address,
      })
    }, 1000)
  }

  onCreateCat = (e, authUser) => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLEKEY);
    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get latidude & longitude from address.
    Geocode.fromAddress(this.state.initialAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({address: lat + ',' + lng},
          this.getCords(authUser)
        );
      },
      error => {
        console.error(error);
      }
    )
    e.preventDefault();
  }

  onChangeText = e => {
    this.setState({ text: e.target.value });
  };

  onChangeAddress = e => {
    this.setState({ initialAddress: e.target.value });
  };

  render() {

    console.log(this.state);

    return (
      <div>
        <h1>Add cat</h1>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <form onSubmit={e => this.onCreateCat(e, authUser)}>
                <input
                  type="text"
                  value={this.state.text}
                  onChange={this.onChangeText}
                  placeholder="Cats Name"
                />
                <input
                  name="address"
                  value={this.state.initialAddress}
                  onChange={this.onChangeAddress}
                  type="text"
                  placeholder="Cats Postcode">
                </input>
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