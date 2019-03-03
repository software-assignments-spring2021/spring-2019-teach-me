import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'

import './Home.css'

const Home = props => {
	return (
		<Jumbotron>
			<h1>Welcome to TeachMe</h1>
			<p>Teach Me is a software project designed to connect users to teach each other creative skills. Teach Me provides creatively skilled individuals (musicians, artists etc.) with an additional source of income, while allowing non-skilled individuals to explore skills that they might be interested in learning.</p>
			<hr />
			<p className="bold-text">This website is still under consturction. Please come back later :)</p>
		</Jumbotron>
	);
};

export default Home;