import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';
import OnboardingPage from './PageComponents/OnboardingPage';
import ContentPage from './PageComponents/ContentPage';
import EditJoinContentPage from './PageComponents/EditJoinContentPage';
import EditContentPage from './PageComponents/EditContentPage';
import ProfilePage from './PageComponents/ProfilePage';
import EditUserPage from './PageComponents/EditUserPage';
import LogoutComponent from './LogoutComponent';
import HomePage from './PageComponents/HomePage';
import ErrorPage from './PageComponents/ErrorPage';

import UserDetailsContext from './context/UserDetailsContext';

function App(){
	
	// Session Username
	const [sessionUsername, setSessionUsername] = useState(localStorage.getItem('sessionUsername') || undefined);

	// Session Picture
	const [sessionProfilePicture, setSessionProfilePicture] = useState(localStorage.getItem('sessionProfilePicture') || undefined);

	return(
	<UserDetailsContext.Provider value={{sessionUsername, setSessionUsername, sessionProfilePicture, setSessionProfilePicture}}>
		<NavBar />
		<Switch>
			<Route path="/login">
				<OnboardingPage onboardingMethod="login" />
			</Route>
			<Route path="/signup">
				<OnboardingPage onboardingMethod="signup" />
			</Route>
			<Route path="/content/:contentID">
				<ContentPage />
			</Route>
			<Route path="/upload">
				<EditContentPage contentMethod="create" />
			</Route>
			<Route path="/edit/:contentID">
				<EditContentPage contentMethod="update" />
			</Route>
			<Route path="/user/:userHandle/:contentID/edit">
				<EditJoinContentPage />
			</Route>
			<Route path="/user/:userHandle">
				<ProfilePage />
			</Route>
			<Route path="/account">
				<EditUserPage />
			</Route>
			<Route path="/logout">
				<LogoutComponent />
			</Route>
			<Route path="/error">
				<ErrorPage />
			</Route>
			<Route path="/">
				<HomePage />
			</Route>
		</Switch>
	</UserDetailsContext.Provider>
	);

}

export default App;