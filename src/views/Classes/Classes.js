//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';

import './Classes.css'

class Classes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			classListing: []
		};
	}

	componentDidMount() {
		fetch('/api/classes')
			.then(response => response.json())
			.then(data => this.setState({classListing: data}))	
	}

	render() {
		const classListData = this.state.classListing.map(function(data, index) {
			return <li>{data.instructor} is teaching {data.name} for ${data.price}</li> 
		});

		return (
			<div className='class-listing'>
				<h3>Sample Class Listing (for testing MongoDB integration purposes only)</h3>
				<ul>
					{classListData}
				</ul>
			</div>
		);
	}
}

export default Classes;