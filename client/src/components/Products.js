import {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Product from "./Product";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";


export default class Products extends Component{
    constructor(props) {
        super(props)

        this.state= {
            search:"",
            products:[],
            categories:[]
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`)
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

        axios.get(`${SERVER_HOST}/categories`)
            .then(res =>
            {
                if (res.data){
                    if (res.data.errorMessage){
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("categories read")
                        this.setState({categories: res.data})

                    }
                }else {
                    console.log("categories not found")
                }
            })

    }

    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }

  handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
           console.log("Enter Pressed")

            axios.get(`${SERVER_HOST}/products/${this.state.search}`)
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
        return(
            <div>

                <MDBCol md="6">
                    <MDBInput hint="Search" type="text" name="search" onChange={this.handleChange}   onKeyUp={this.handleKeypress}/>
                </MDBCol>
                <Form.Select name="category" onChange={this.handleChange} >
                    <option>Select Category</option>
                    {this.state.categories.map((category) =>(
                        <option key={category._id} value={category.category}>{category.category}</option>
                    ))}

                </Form.Select>

                <Form.Select>
                    <option>Sort</option>
                    <option>Sort price low-high</option>
                    <option>Sort price high-low</option>
                </Form.Select>

                <Row>
                    {this.state.products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }

}
