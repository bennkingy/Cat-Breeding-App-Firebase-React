import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CatPage from '../Cats';
import Footer from '../Footer';
import SingleCatPage from '../Cats/singleCat'
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => (
    <Router>
      <Fragment>
        <Header />
          <div className="container mx-auto">
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.CATS} component={CatPage} />
            <Route path={ROUTES.CAT_DETAILS} component={SingleCatPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </div>
        <Footer />
      </Fragment>
    </Router>
)

export default withAuthentication(App);