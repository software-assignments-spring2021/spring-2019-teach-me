import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap'


class ClassFilter extends Component {
    constructor(props) {
		super(props);

		this.state = {
            maxPrice: 'Max Price...',
            minRating: 'Min Rating...',
            classCategory: 'Class Category...',
            isArchived: 'See Archived/Completed Classes...'
		};
    }
    
    filterResults(e) {
        const filterType = e.target.id;
        if (filterType === 'maxPrice') {
            this.setState({maxPrice: e.target.value}, () => {
                this.props.filterResults(this.state);
            });
        }
        else if (filterType === 'minRating') {
            this.setState({minRating: e.target.value}, () => {
                this.props.filterResults(this.state);
            });
        }
        else if (filterType === 'classCategory'){
            this.setState({classCategory: e.target.value}, () => {
                this.props.filterResults(this.state);
            });
        }
        else {
            this.setState({isArchived: e.target.value}, () => {
                this.props.filterResults(this.state);
            });
        }
    }

    render() {
        return(
            <Form className="class-filter" >
                <Form.Group controlId="maxPrice" onChange={this.filterResults.bind(this)}>
                    <Form.Control as="select" >
                        <option value={undefined}>Max Price...</option>
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        <option value={200}>$200</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="minRating" onChange={this.filterResults.bind(this)}>
                    <Form.Control as="select" >
                        <option value={undefined}>Min Rating...</option>
                        <option>3</option>
                        <option>3.5</option>
                        <option>4</option>
                        <option>4.5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="classCategory" onChange={this.filterResults.bind(this)}>
                    <Form.Control as="select" >
                        <option value={undefined}>Class Category...</option>
                        <option value="Art/Creative">Art/Creative</option>
                        <option value="Music">Music</option>
                        <option value="Technology">Technology</option>
                        <option value="Language">Language</option>
                        <option value="Sports">Sports</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Business">Business</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </Form.Control>
                </Form.Group>
                { this.props.displayArchiveOptions 
                    ? 
                    <Form.Group controlId="isArchived" onChange={this.filterResults.bind(this)}>
                        <Form.Control as="select" >
                            <option value={undefined}>See Archived/Completed Classes...</option>
                            <option value="show">Show All Classes</option>
                            <option value="hide">Hide Archived/Completed Classes</option>
                        </Form.Control>
                    </Form.Group>
                    : 
                    null}
            </Form>
        );
    }
};

export default ClassFilter; 