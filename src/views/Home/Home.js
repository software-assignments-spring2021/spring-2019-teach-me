import React, { Component }from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { ClassDisplay } from '../../components/ClassDisplay';
import { InstructorDisplay } from '../../components/InstructorDisplay';

import './Home.css'

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			featuredClasses: [],
			featuredInstructors: [],
			currentDisplay: 'class'
		}

		this.displayClasses = this.displayClasses.bind(this);
		this.displayInstructors = this.displayInstructors.bind(this);
	}

	displayClasses() {
		this.setState({currentDisplay: 'class'});

		/*
		const url = '/api/classes/featured';
		fetch(url)
			.then(response => response.json())
			.then((data) => this.setState({featuredClasses: data, currentDisplay: 'class'}));
		*/

		/*
		const data = [{"_id":"5c8547511c9d44000024fb63","name":"Piano","description":"Piano","price":75,"proposedSchedule":"Monday","instructor":"5c854805e0c8200000afd73a","rating":"9.6","cateogry":"Art"},{"_id":"5c855c0f7471ed05294dff40","name":"1","description":"1","price":1,"proposedSchedule":"1","rating":6,"instructor":"5c854805e0c8200000afd73a","__v":0},{"_id":"5c858b101c9d4400002224ce","name":"authentic chinese cooking","description":"the best of chinese cooking. all in one class!","price":888,"proposedSchedule":"Monday 2-4pm","instructor":"5c854805e0c8200000afd73a","rating":2.5,"category":"Music"},{"_id":"5c858b9b1c9d4400002224cf","name":"intro to javascript","description":"learning programming with the best programming language ever! (haha not really)","price":123,"proposedSchedule":"Saturdays 3-5pm","instructor":"5c854805e0c8200000afd73a","rating":9.9,"category":"Technology"}];
		this.setState({featuredClasses: data, currentDisplay: 'class'});
		*/
	}

	displayInstructors() {
		this.setState({currentDisplay: 'instructor'});
		/*
		const url = '/api/instructors/featured';
		fetch(url)
			.then(response => response.json())
			.then((data) => this.setState({featuredInstructors: data, currentDisplay: 'instructor'}));
			*/

		/*
		const data = [{"_id":"5c8547511c9d44000024fb63","name":"Piano","introduction":"Piano","proposedSchedule":"Monday","instructor":"5c854805e0c8200000afd73a","rating":"9.6","cateogry":"Art"},{"_id":"5c855c0f7471ed05294dff40","name":"1","description":"1","price":1,"proposedSchedule":"1","rating":6,"instructor":"5c854805e0c8200000afd73a","__v":0},{"_id":"5c858b101c9d4400002224ce","name":"authentic chinese cooking","description":"the best of chinese cooking. all in one class!","price":888,"proposedSchedule":"Monday 2-4pm","instructor":"5c854805e0c8200000afd73a","rating":2.5,"category":"Music"},{"_id":"5c858b9b1c9d4400002224cf","name":"intro to javascript","description":"learning programming with the best programming language ever! (haha not really)","price":123,"proposedSchedule":"Saturdays 3-5pm","instructor":"5c854805e0c8200000afd73a","rating":9.9,"category":"Technology"}];
		this.setState({featuredInstructors: data, currentDisplay: 'instructor'})
		*/
	}

	componentDidMount() {
		const url = '/api/classes/featured';
		fetch(url)
			.then(response => response.json())
			.then((data) => this.setState({featuredClasses: data, currentDisplay: 'class'}));

		const url2 = '/api/instructors/featured';
		fetch(url2)
			.then(response => response.json())
			.then((data) => this.setState({featuredInstructors: data}));
	}

	render() {

		const classListData = this.state.featuredClasses.map(function(data, index) {
			return <ClassDisplay key={index} title={data.name} description={data.description} price={data.price} instructor={data.instructorName} rating={data.rating} category={data.category} slug={data._id} instructorProfilePic={data.instructorProfilePic}/>
		});

		const moreClassBtn = 
			<div className="all-classes-btn-container">
				<LinkContainer to="/classes" className="all-classes-btn"><Button variant="info">See More Classes</Button></LinkContainer>
			</div>;
	
		classListData.push(moreClassBtn);

		const instructorListData = this.state.featuredInstructors.map((data, index) => {
			return <InstructorDisplay key={index} name={data.name} introduction={data.introduction} rating={data.rating} slug={data._id} userProfilePic={data.profilePicURL}/>
		});

		const moreInstructorBtn = 
			<div className="all-classes-btn-container">
				<LinkContainer to="/instructors" className="all-classes-btn"><Button variant="info">See More Instructors</Button></LinkContainer>
			</div>;
		instructorListData.push(moreInstructorBtn);

		return (
			<div className="homepage-container">
				<div className="homepage-header">
					<h1>Welcome to TeachMe</h1>
					<div className="intro-text">
						<p>From programming to piano, TeachMe offers a variety of classes to learn from. Want to teach your skill to others? Publish your own class - only the sky's the limit. </p>
						<p className="bold-text">To get started, <LinkContainer className="registration-link" to='/register'><span>register an account</span></LinkContainer> and start taking and/or teaching classes! </p>
					</div>
				</div>
				<div className="featured-container">
					<Nav variant="pills" defaultActiveKey="featuredClasses" className="featured-nav">
						<Nav.Item>
							<Nav.Link eventKey="featuredClasses" onSelect={this.displayClasses}>Featured Classes</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="featuredInstructors" onSelect={this.displayInstructors}>Featured Instructors</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
				<div className="class-listing-display featured-classes-display">
					{this.state.currentDisplay === 'class' ? classListData : instructorListData}
				</div>
			</div>
			
		);
	}
}

export default Home;