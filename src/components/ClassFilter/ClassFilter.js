import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col} from 'react-bootstrap'


class ClassFilter extends Component {
    render() {
        return(
            <Form className="class-filter">
                <Row>
                    <Col>
                        <Form.Group controlId="maxPrice">
                            <Form.Control as="select">
                                <option>Max Price...</option>
                                <option>$50</option>
                                <option>$100</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="minRating">
                            <Form.Control as="select">
                                <option>Min Rating...</option>
                                <option>70%</option>
                                <option>85%</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="classCategory">
                            <Form.Control as="select">
                                <option>Class Category...</option>
                                <option>Music</option>
                                <option>Art</option>
                                <option>Language</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sm={1}>
                        <Button variant="info" type="submit">
                            Filter
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
};

export default ClassFilter; 