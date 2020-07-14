import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'; 
import Headroom from 'react-headroom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Logo = () => (
  <img src={logo} className="w-4/5" />
);

const Header = () => (
  <Headroom>
    <nav className="flex items-center justify-between py-6 bg-white container mx-auto">
      <div className="">
        <Logo />
      </div>
      <div className="block w-auto flex items-center ">
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
            <NavigationNonAuth />
          )
        }
      </AuthUserContext.Consumer>
      </div>
    </nav>
  </Headroom>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li className="block inline-block text-black hover:text-white mr-4">
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li className="block inline-block text-black hover:text-white mr-4">
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li className="block inline-block text-black hover:text-white mr-4">
      <Link to={ROUTES.CATS}>Cats</Link>
    </li>
    <li className="block inline-block text-black hover:text-white mr-4">
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li className="block inline-block text-black hover:text-white mr-4">
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    )}
    <li className="block inline-block text-black hover:text-white">
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Header;