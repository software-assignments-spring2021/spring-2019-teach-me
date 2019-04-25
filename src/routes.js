//https://github.com/evedes/ReactRouter_Boilerplate_01

import { BrowserRouter as Router } from "react-router-dom";
import React from 'react';
import { Home } from './views/Home';
import { NoMatch } from './views/NoMatch';
import { Classes } from './views/Classes'
import { CreateClass } from './views/CreateClass'
import { EditClass } from './views/EditClass'
import { MyAccount } from './views/MyAccount'
import { ClassHistory } from './views/ClassHistory'
import { Instructors } from './views/Instructors'
import { UserProfile } from './views/UserProfile'
import { NavBar } from './components/NavBar';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { Route, Switch, Redirect } from 'react-router-dom';
import ClassDetail from './views/ClassDetail/ClassDetail';
import PrivateRoute from "./views/private-route/PrivateRoute";
import { Dashboard } from "./views/Dashboard";
import { InstructorProfile } from './views/InstructorProfile'
import { About } from './views/about'


import { Provider } from "react-redux";
import { store } from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

export const Routes = () => {
	return (
		<Provider store={store}>
		<Router>
		<div>
			<NavBar />
			<Switch>
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
				<Route exact path="/classes" component={Classes} />
				<Route exact path="/classes/:classId" component={ClassDetail} />
				<Route exact path="/create-class" component={CreateClass} />
				<Route exact path="/edit-class/:classId" component={EditClass} />
				<Route exact path="/my-account" component={MyAccount} />
				<Route exact path="/class-history" component={ClassHistory}/>
				<Route exact path="/instructors" component={Instructors} />
				<Route exact path="/user/:userId" component={UserProfile} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/instructor/:userId/info" component={InstructorProfile} />
				<Route exact path="/about" component={About} />
				<Route component={NoMatch} />
			</Switch>
		</div>
		</Router>
		</Provider>
		
	);
};
