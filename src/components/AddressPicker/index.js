import React from 'react'
import Geocode from "react-geocode";
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  address: '',
  user: null,
  loading: false,
}

class AddressPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    console.log(this.props.firebase);
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }
  
  gmapSetup() {

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
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );

  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value})
	};

  onSubmit = e => {
    e.preventDefault();
    this.gmapSetup();
    console.log('done');

  //  this.props.firebase.database().ref('users/' + user.uid).set({
  //    catLocation: catLocationLatLong,
 //   })

	};
	
  render() {

    console.log(this.state)

    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <input
          name="address"
          value={this.state.address}
          onChange={this.onChange}
          type="text"
          placeholder="Enter postcode">
        </input>
        <button type="submit">Submit</button>
        </form>
      </div>
    )

  }

}

export default withFirebase(AddressPicker);