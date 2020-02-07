import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ( { firebase } ) => (
  <button type="button" onClick={firebase.doSignOut, () => window.location.reload(true)}>
    Sign Out
  </button>
)

export default withFirebase(SignOutButton);