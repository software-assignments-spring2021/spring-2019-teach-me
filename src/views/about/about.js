
import React from 'react';

import './about.css'

class About extends Component{

	constructor(){
		super();
		this.state = {};
	}
	
	render(){
		return (
			<h1>About TeachMe</h1>
			<div>
			<p>Teach Me is a software project designed to connect users to teach each other creative skills. Teach Me provides creatively skilled individuals (musicians, artists etc.) with an additional source of income, while allowing non-skilled individuals to explore skills that they might be interested in learning.</p>
			<p className="bold-text">This website is still under consturction. Please come back later :)</p>
			</div>
		);
	}
};
