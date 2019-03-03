import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

import './NoMatch.css'

const NoMatch = props => {
	return (
		<Jumbotron>
			<h1>Oops</h1>
			<p>That's a 404 error - It seems that we cannot find the page you requested.</p>
		</Jumbotron>
	);
};

export default NoMatch;