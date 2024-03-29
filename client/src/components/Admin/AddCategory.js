import React, {Component} from "react";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Link, Redirect} from "react-router-dom";
import {DataContext} from "../Context";

export class AddCategory extends Component{
    constructor(props) {
        super(props)
        this.state = {
            category:"",
            redirectToAdmin:false
        }
    }
    static contextType= DataContext;

    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state);
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/products/add_category/${this.state.category}`,{headers:{"authorization":localStorage.token}})
            .then(res =>
            {

                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully registered
                    {
                        console.log("category Added")

                        document.getElementById("category").value="";

                    }
                }
                else
                {
                    console.log("Category failed to add")
                }
            })
        this.setState({redirectToAdmin:true})

    }


    render() {

        const{categories} = this.context;
        return(

            <Container>
                {this.state.redirectToAdmin ? <Redirect to="/admin"/> : null}
            <h1>Categories</h1>
           <Container>
               <Row>

                <Col>


                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {categories.map((category)=>(
                        <tr key={category._id}>
                            <th>{category.category}</th>
                            <th>
                                <Link to={"/DeleteCategory/"+category._id}>
                                    <Button variant="danger"> Delete</Button>
                                </Link>
                            </th>
                        </tr>
                    ))}
                    </tbody>

                </Table>
                </Col>

                   <Col>
            <Form>
                <Form.Group className="mb-3" id="category">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control value={this.state.name} name="category" id="category" type="text" onChange={this.handleChange}/>
                </Form.Group>

                <Button onClick={this.handleSubmit}>Submit</Button>

            </Form></Col>
               </Row>
           </Container>
            </Container>
        )
    }

}