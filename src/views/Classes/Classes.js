//https://www.robinwieruch.de/react-fetching-data/
import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Pagination from "react-js-pagination";
import { ClassDisplay } from '../../components/ClassDisplay';
import { ClassFilter } from '../../components/ClassFilter';

import './Classes.css'

class Classes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			classListing: [],
			activePage: 1
		};
	}

	componentDidMount() {
		fetch('/api/classes')
			.then(response => response.json())
			.then(data => this.setState({classListing: data}))	
	}

	handlePageChange(pg) {
		this.setState({activePage: pg});
	}
	
	render() {
		
		const classListData = this.state.classListing.map(function(data, index) {
			return <ClassDisplay key={index} title={data.name} description={data.description} price={data.price} instructor={data.instructor} rating={data.rating} category={data.category}/>
		});
		
		
		const CLASSES_PER_PAGE = 2;

		const startIdx = (this.state.activePage - 1) * CLASSES_PER_PAGE;
		const endIdx = startIdx + CLASSES_PER_PAGE;
		const toDisplay = classListData.slice(startIdx, endIdx);
		const pageRange = Math.min(5, classListData.length/CLASSES_PER_PAGE + 1);

		return (
			<div className='class-listing-container'>
				<Jumbotron>
					<h1>Available Classes</h1>
					<p>Below is the list of classes that are available on TeachMe.</p>
				</Jumbotron>
				<ClassFilter />
				<div className='class-listing-display'>
					{toDisplay}
					<div className='pagination-container'>
						<Pagination
							activePage={this.state.activePage}
							itemsCountPerPage={CLASSES_PER_PAGE}
							totalItemsCount={classListData.length}
							pageRangeDisplayed={pageRange}
							onChange={this.handlePageChange.bind(this)}
						/>
					</div>
 				</div>
			</div>
		);
	}
}

export default Classes;