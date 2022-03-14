import {Component, useState} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Product from "./Product";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import {DataContext} from "./Context";
import placeholder from "../placeholder/placeholder.jpg";


export default class Products extends Component{
    constructor(props) {
        super(props)

        this.state= {
            search:""
        }
    }

    static contextType= DataContext;

    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }


  handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {



           console.log("Enter Pressed")

            axios.get(`${SERVER_HOST}/search/${this.state.search}`)
                .then(res =>
                {
                    if (res.data){
                        if (res.data.errorMessage){
                            console.log(res.data.errorMessage)
                        }
                        else {
                            console.log("Products read")
                            this.setState({products: res.data})

                        }
                    }else {
                        console.log("Products not found")
                    }
                })
            }

    };



    render() {

    const{products,categories,addCart} = this.context;


        return(
            <div>
                {/*<h1>{cart.length}</h1>*/}
                <MDBCol md="6">
                    <MDBInput hint="Search" type="text" name="search" onChange={this.handleChange}   onKeyUp={this.handleKeypress}/>
                </MDBCol>

                <Form.Select name="category" onChange={this.handleChange} >
                    <option>Select Category</option>
                    {categories.map((category) =>(
                        <option key={category._id} value={category.category}>{category.category}</option>
                    ))}
                </Form.Select>

                <Form.Select>
                    <option>Sort</option>
                    <option>Sort price low-high</option>
                    <option>Sort price high-low</option>
                </Form.Select>

                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Card className="border-0" >
                                <Card.Body>
                                    <Card.Img src={placeholder}/>
                                    <Card.Title> {product.name}</Card.Title>
                                    {/*<Card.Text>{product.description}</Card.Text>*/}
                                    {/*<Card.Text>Category:{product.category}</Card.Text>*/}
                                    {/*<Card.Text>Stock:{product.stock}</Card.Text>*/}
                                    <Card.Text>Price: €{product.price}</Card.Text>
                                    <Button onClick={()=> addCart(product._id)}>Add to cart</Button>
                                    <Button>View</Button>
                                </Card.Body>
                            </Card>

                        </Col>
                    ))}
                </Row>


            </div>
        )
    }

}
