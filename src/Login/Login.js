import React from 'react';
import * as config from '../config/config';

class Login extends React.Component {


	render() {


	const scopes = [
		"user-library-read",
		"streaming",
		"user-top-read",
		"user-read-private",
		'user-read-recently-played'
	];

	const CLIENT_ID = config.CLIENT_ID;
	const REDIRECT_URI = config.REDIRECT_URL;

	var url = "https://accounts.spotify.com/authorize?client_id=" +
			CLIENT_ID +
			"&redirect_uri=" +
			encodeURIComponent(REDIRECT_URI) +
			"&scope=" +
			encodeURIComponent(scopes.join(" ")) +
			"&response_type=token"

		return (

			<div className="login">
				<h1 className="login-intro">Spotify Client built with React.Js and Redux.</h1>
				<a href={url} className="login-text">Login Via Spotify</a>
				<a href="http://github.com/rohitpotato/react-spotify" className="login-text">View on Github</a>
			</div>
		);
	}
}

export default Login;