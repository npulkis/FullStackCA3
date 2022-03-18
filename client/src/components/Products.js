import {Component, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import {DataContext} from "./Context";
import placeholder from "../placeholder/placeholder.jpg";
import ProductCard from "./ProductCard";


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
           <Container style={{backgroundColor: "#ffffff"}}>
                {/*<h1>{cart.length}</h1>*/}
               <Row >
                   <Col>
                       <MDBCol md="4">
                           <MDBInput hint="Search" type="text" name="search" onChange={this.handleChange}   onKeyUp={()=>searchProducts(this.state.search)}/>
                       </MDBCol>
                   </Col>
               </Row>

                <Row>
                    <Col>


                        <Form.Select name="category" onChange={this.handleCategoryChange} >
                            <option >Select Category</option>
                            {categories.map((category) =>(
                                <option key={category._id} value={category.category}>{category.category}</option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col>
                        <Form.Select>
                            <option>Sort</option>
                            <option>Sort price low-high</option>
                            <option>Sort price high-low</option>
                        </Form.Select>
                    </Col>
                </Row>

           </Container>

            <Container>


                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                           <ProductCard product={product}/>

                        </Col>
                    ))}
                </Row>

            </Container>
            </div>


        )
    }

}
