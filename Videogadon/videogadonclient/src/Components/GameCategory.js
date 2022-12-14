import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';


function onClick(){
    console.log("clicked game category");
}

export class GameCategory extends Component{
    render(){
        return(
            <div className="badges" onClick={onClick}>
                <div>
                    <br></br>
                    <h2>Create new game category</h2>
                    <br></br>
                </div>
                <div>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                type="text"
                                name="productName"
                                value={this.state.productName}
                                onChange={this.handleChange}
                                placeholder="Product Name"/>
                            </Form.Group>
                            <Form.Group controlId="sku">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control
                                type="text"
                                name="sku"
                                value={this.state.sku}
                                onChange={this.handleChange}
                                placeholder="SKU" />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                type="text"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleChange}
                                placeholder="Price" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="hidden" name="id" value={this.state.id} />
                                <Button variant="success" type="submit">Save</Button>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}