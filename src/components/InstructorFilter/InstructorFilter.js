import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap'

class InstructorFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minRating: 'Min Rating...',
            instructorCategory: 'Instructor Category...'
        };
    }
    
    filterResults(e) {
        const filterType = e.target.id;
        if (filterType === 'minRating') {
            this.setState({minRating: e.target.value}, () => {
                this.props.filterResults(this.state);
            });
        }
        else {
            this.setState({instructorCategory: e.target.value}, () => {
                this.props.filterResults(this.state);
            });
        }
    }

    render() {
        return(
            <Form className="class-filter" >
                <Form.Group controlId="minRating" onChange={this.filterResults.bind(this)}>
                    <Form.Control as="select" >
                        <option value={undefined}>Min Rating...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="instructorCategory" onChange={this.filterResults.bind(this)}>
                    <Form.Control as="select" >
                        <option value={undefined}>Instructor Category...</option>
                        <option>Music</option>
                        <option>Art</option>
                        <option>Language</option>
                        <option>Technology</option>
                        <option>Sports</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        );
    }
};

export default InstructorFilter; 