import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './About.css'

const About = props => {
	return (
		<Jumbotron>
		<div>
			<h1>About TeachMe</h1>
			<p>Teach Me is a software project designed to connect users to teach each other creative skills. Teach Me provides creatively skilled individuals (musicians, artists etc.) with an additional source of income, while allowing non-skilled individuals to explore skills that they might be interested in learning.</p>
			<p className="bold-text">As a learner</p>
			<p>
				<div>TeachMe allows you to explore a wide spectrum of classes offered by others. In order to take the classes, you can: </div>
				<div>Sign up for a TeachMe account with your email</div>
				<div>Search for or Click on the classes you are interested in</div>
				<div>CLick a single button to sign up for the classes!<div>
			</P>
			<p>
			<div>In addition, you might want to take a look at the schedule and pricing for the classes. Some classes are free while some require payments</div>
			<div>Once you have taken a class, you can rate your instructor and leave comments for others to see</div>
			</p>
			<p className="bold-text">As an instructor</p>
			<p>
				<div>TeachMe provides you with a platform where you can teach your talent and skill to interested learners. Either you are passionate in teaching or willing to obtain another source of income, TeachMe provides this opportunity with only a few clicks needed: </div>
				<div>Sign up for a TeachMe account with your email. If you already have one, sign in with your existing account</div>
				<div>Under Quick Access which is located on the right side of the navigate bar, click on "Publish New Class"</div>
				<div>Fill in the requried information, including course name, price, description, etc.<div>
				<div>Hit submit and your classe will be seen by all users!</div>
			</P>
			<p>In addition, you might want to take a look at the schedule and pricing for the classes. Some classes are free while some require payments</p>
			<p>For any users, you can be an instructor and a learner at the same time, no need for different accounts!</p>
			<p>This website is created by Sameer Tulshyan, Cathy Yang, Haomiao Han, Junyang Ma, and Derek Huang </P>
		</div>
		</Jumbotron>
	);
};
export default About;
