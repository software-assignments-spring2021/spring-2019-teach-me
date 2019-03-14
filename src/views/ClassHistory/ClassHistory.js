import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import Pagination from "react-js-pagination";
import { ClassDisplay } from '../../components/ClassDisplay';
import { ClassFilter } from '../../components/ClassFilter';

import './ClassHistory.css'

class ClassHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			classListing: [],
			allClasses: [],
			activePage: 1,
			filterWarning: false,
			noTeachClassWarning: false,
			noTakeClassWarning: false
		};
		/*
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		*/
	}

	//maybe do this in the class detail page
	/*
    handleEdit(event) {

    }

    handleDelete(event) {

	}
	*/

	displayTeach() {
		const { userId } = this.props.match.params;
		const url = '/api/class-history-teach/' + userId;
		console.log(url);
		fetch(url)
			.then(response => response.json())
			.then((data) => {
				console.log(data);
				if (data.length === 0) {
					this.setState({noTeachClassWarning: true, classListing: data, allClasses: data});
				}
				else {
					this.setState({noTeachClassWarning: false, classListing: data, allClasses: data});
				}
			});
				
		/*
		const data = [{"_id":"5c8547511c9d44000024fb63","name":"Piano","description":"Piano","price":75,"proposedSchedule":"Monday","instructor":"5c854805e0c8200000afd73a","rating":"9.6","cateogry":"Art"},{"_id":"5c855c0f7471ed05294dff40","name":"1","description":"1","price":1,"proposedSchedule":"1","rating":6,"instructor":"5c854805e0c8200000afd73a","__v":0},{"_id":"5c858b101c9d4400002224ce","name":"authentic chinese cooking","description":"the best of chinese cooking. all in one class!","price":888,"proposedSchedule":"Monday 2-4pm","instructor":"5c854805e0c8200000afd73a","rating":2.5,"category":"Music"},{"_id":"5c858b9b1c9d4400002224cf","name":"intro to javascript","description":"learning programming with the best programming language ever! (haha not really)","price":123,"proposedSchedule":"Saturdays 3-5pm","instructor":"5c854805e0c8200000afd73a","rating":9.9,"category":"Technology"}];
		if (data.length === 0) {
			this.setState({noTeachClassWarning: true, classListing: data, allClasses: data});
		}
		else {
			this.setState({classListing: data, allClasses: data});
		}
		*/
	}

	displayTake() {
		//TODO: create user-class schema in database & use new api to select documents from db
		fetch('/api/classes')
			.then(response => response.json())
			.then(data => this.setState({noTeachClassWarning: false, classListing: data, allClasses: data}));
		
		/*
		const data = [{"_id":"5c8547511c9d44000024fb63","name":"Something else","description":"not Piano","price":175,"proposedSchedule":"Monday","instructor":"5c854805e0c8200000afd73a","rating":"9.6","cateogry":"Art"},{"_id":"5c855c0f7471ed05294dff40","name":"1","description":"1","price":1,"proposedSchedule":"1","rating":6,"instructor":"5c854805e0c8200000afd73a","__v":0},{"_id":"5c858b101c9d4400002224ce","name":"authentic chinese cooking","description":"the best of chinese cooking. all in one class!","price":888,"proposedSchedule":"Monday 2-4pm","instructor":"5c854805e0c8200000afd73a","rating":2.5,"category":"Music"},{"_id":"5c858b9b1c9d4400002224cf","name":"intro to javascript","description":"learning programming with the best programming language ever! (haha not really)","price":123,"proposedSchedule":"Saturdays 3-5pm","instructor":"5c854805e0c8200000afd73a","rating":9.9,"category":"Technology"}];
		if (data.length === 0) {
			this.setState({noTakeClassWarning: true, classListing: data, allClasses: data});
		}
		else {
			this.setState({classListing: data, allClasses: data});
		}
		*/
	}

	componentDidMount() {
		this.displayTeach();
	}

	handlePageChange(pg) {
		this.setState({activePage: pg});
	}

	filterResults(query) {
		console.log(query);
		const allClasses = this.state.allClasses;
		let filteredClasses = [];

		for (let i = 0; i < allClasses.length; i++) {
			let includeInResult = true;
			const c = allClasses[i];
			if (query['maxPrice'] !== 'Max Price...') {
				if (c.price > parseFloat(query['maxPrice'])) {
					includeInResult = false;
				}
			}

			if (query['minRating'] !== 'Min Rating...') {
				if (c.rating < parseFloat(query['minRating'])) {
					includeInResult = false;
				}
			}

			if (query['classCategory'] !== 'Class Category...') {
				if (c.category !== query['classCategory']) {
					includeInResult = false;
				}
			}

			if (includeInResult) {
				filteredClasses.push(c);
			}
		}
		
		if (filteredClasses.length === 0) {
			this.setState({filterWarning: true, classListing: filteredClasses, activePage: 1});
		}
		else {
			this.setState({filterWarning: false, classListing: filteredClasses, activePage: 1});
		}
				
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
			<div className='class-history-container'>
				<Jumbotron>
					<h1>My Class History</h1>
					<p>Below are the classes you have either taught or taken at TeachMe.</p>
				</Jumbotron>
				<Nav fill variant="tabs" defaultActiveKey="teach" className="class-history-nav">
					<Nav.Item>
						<Nav.Link eventKey="teach" onSelect={this.displayTeach.bind(this)}>Classes I Teach</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="take" onSelect={this.displayTake.bind(this)}>Classes I Take</Nav.Link>
					</Nav.Item>
				</Nav>
				<div className='filter-container filter-container-ch'>
						<ClassFilter filterResults={this.filterResults.bind(this)}/>
					</div>
					<div className='class-listing-display'>
						{toDisplay}
						{ this.state.noTakeClassWarning ? <Alert variant='danger'>It seems that you have no registered class at this time. Go to the class listing page and register for a new class!</Alert> : null }
						{ this.state.noTeachClassWarning ? <Alert variant='danger'>It seems that you are not teaching any class at this time.</Alert> : null }
						{ this.state.filterWarning ? <Alert variant='danger'>It seems that we don't have any classes that satisfy your filter. Try resetting the filter to see more results!</Alert> : null }
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

export default ClassHistory;
