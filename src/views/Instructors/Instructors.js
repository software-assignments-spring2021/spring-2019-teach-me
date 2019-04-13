//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Pagination from "react-js-pagination";
import { InstructorDisplay } from '../../components/InstructorDisplay';
import { InstructorFilter } from '../../components/InstructorFilter';

import './Instructors.css'

class Instructors extends Component {
	constructor(props) {
		super(props);

		this.state = {
			instructorListing: [],
			allInstructors: [],
			activePage: 1,
			showWarning: false,
			categories: []
		};
	}

	componentDidMount() {
		// fetch('/api/instructors')
		// 	.then(response => response.json())
		// 	.then(data => this.setState({instructorListing: data, allInstructors: data}))
		const data = [{"_id":"5c8420601c9d440000dc7530","userID":"5ca7c1b41c9d44000002a798","rating":7,"sumOfRating":35,"numOfRating":5,"credentials":"Professional Tennis Player","introduction":"hi","name":"A"},{"_id":"5ca68e2b1c9d440000d6ec74","userID":"5c8060e6ea8bdc07cd5e06a2","credentials":"wut","introduction":"hi","rating":4.2,"sumOfRating":100,"numOfRating":24,"name":"Sameer Tulshyan"}];
		
		this.setState({instructorListing: data, allInstructors: data}, () => {

			const allInstructors = this.state.allInstructors;
			var total = [];

				for (let i = 0; i < allInstructors.length; i++) {
					var temp = [];
					// console.log(temp);
					const url = '/api/class-history-teach/' + allInstructors[i]._id;
					console.log(url);
					fetch(url)
						.then(response => response.json())
						.then(data => {
							console.log(data);
							for (let j = 0; j < data.length; j++) {
								// console.log(data[j]);
								temp.push(data[j].category);
							}
							// console.log(temp);
							total.push(temp);
							temp = [];
						})
				}

			console.log(total);
			this.setState({categories: total});
		});
	}

	handlePageChange(pg) {
		this.setState({activePage: pg});
	}

	filterResults(query) {
		// console.log(query);
		// console.log(this.state.categories);
		const allInstructors = this.state.allInstructors;
		let filteredClasses = [];

		for (let i = 0; i < allInstructors.length; i++) {
			let includeInResult = true;
			const c = allInstructors[i];

			if (query['minRating'] !== 'Min Rating...') {
				if (c.rating < parseFloat(query['minRating'])) {
					includeInResult = false;
				}
			}

			if (query['instructorCategory'] !== 'Instructor Category...') {
				var noMatch = true;
				for (let j = 0; j < this.state.categories[i].length; j++) {
					if (query['instructorCategory'] == this.state.categories[i][j]) {
						noMatch = false;
					}
				}
				if (noMatch) {
					includeInResult = false;
				}
			}

			if (includeInResult) {
				filteredClasses.push(c);
			}
		}

		// console.log(filteredClasses.length);
		if (filteredClasses.length === 0) {
			this.setState({showWarning: true, instructorListing: filteredClasses, activePage: 1});
		}
		else {
			this.setState({showWarning: false, instructorListing: filteredClasses, activePage: 1});
		}

	}

	render() {

		const instructorListData = this.state.instructorListing.map((data, index) => {
			return <InstructorDisplay key={index} name={data.name} introduction={data.introduction} rating={data.rating} slug={data._id}/>
		});

		const INSTRUCTORS_PER_PAGE = 4;

		const startIdx = (this.state.activePage - 1) * INSTRUCTORS_PER_PAGE;
		const endIdx = startIdx + INSTRUCTORS_PER_PAGE;
		const toDisplay = instructorListData.slice(startIdx, endIdx);
		const pageRange = Math.min(5, instructorListData.length/INSTRUCTORS_PER_PAGE + 1);

		return (
			<div className='instructor-listing-container'>
				<Jumbotron>
					<h1>Instructors</h1>
					<p>Below is the list of instructors on TeachMe.</p>
				</Jumbotron>
				<div className='filter-container'>
					<InstructorFilter filterResults={this.filterResults.bind(this)}/>
				</div>
				<div className='instructor-listing-display'>
					{toDisplay}
					{ this.state.showWarning ? <Alert variant='danger'>It seems that we don't have any instructors that satisfy your filter. Try resetting the filter to see more results!</Alert> : null }
					<div className='pagination-container'>
						<Pagination
							activePage={this.state.activePage}
							itemsCountPerPage={INSTRUCTORS_PER_PAGE}
							totalItemsCount={instructorListData.length}
							pageRangeDisplayed={pageRange}
							onChange={this.handlePageChange.bind(this)}
						/>
					</div>
 				</div>
			</div>
		);
	}
}

export default Instructors;
