import {Component, useState} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import {DataContext} from "./Context";
import placeholder from "../placeholder/placeholder.jpg";
import Product from "./Product";


export default class Products extends Component{

    constructor(props) {
        super(props)

        this.state= {
            search:"",
            category: ""
        }
    }

    static contextType= DataContext;

    handleChange=(e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }
    handleCategoryChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
        // console.log(this.state)

        this.context.filterProducts(e.target.value);
    }



  // handleKeypress = (e) => {
  //       //it triggers by pressing the enter key
  //       if (e.keyCode === 13) {
  //
  //
  //
  //          console.log("Enter Pressed")
  //
  //
  //           }
  //
  //   };



    render() {

    const{products,categories,searchProducts} = this.context;


        return(
            <div>
                {/*<h1>{cart.length}</h1>*/}
                <MDBCol md="6">
                    <MDBInput hint="Search" type="text" name="search" onChange={this.handleChange}   onKeyUp={()=>searchProducts(this.state.search)}/>
                </MDBCol>

                <Form.Select name="category" onChange={this.handleCategoryChange} >
                    <option >Select Category</option>
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
                           <Product product={product}/>

                        </Col>
                    ))}
                </Row>



            </div>


        )
    }

}
