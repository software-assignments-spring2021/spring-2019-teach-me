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
			categories: {}
		};
	}

	componentDidMount() {
		fetch('/api/instructors')
			.then(response => response.json())
			.then(data => {
				this.setState({instructorListing: data, allInstructors: data}, () => {
					const allInstructors = this.state.allInstructors;
					var total = {};

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
									total[i] = temp;
									temp = [];
								})
						}

					console.log(total);
					this.setState({categories: total});
				});
			})
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
			return <InstructorDisplay key={index} name={data.name} introduction={data.introduction} rating={data.rating} slug={data._id} userProfilePic={data.profilePicURL}/>
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
