import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Button, Col, Container, Row} from "react-bootstrap";
import {DataContext} from "./Context";

export default class Product extends Component{
    static contextType= DataContext;

    constructor(props) {
        super(props);
        this.state={
            product:[]
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/product/${this.props.match.params.id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Product read")
                        this.setState({product: res.data.data})
                        console.log(this.state.product)



                        // const image1 = this.state.product.photos[0].filename;
                        // const image2 = this.state.product.photos[1].filename;
                        // const image3 = this.state.product.photos[2].filename;
                        //
                        //
                        // const imageID = this.state.product.photos[0]._id;
                        // axios.get(`${SERVER_HOST}/photo/${image}`)
                        //     .then(res =>
                        //     {
                        //         document.getElementById("img").src = `data:;base64,${res.data.image}`
                        //     })
                        //     .catch(err =>
                        //     {
                        //         // do nothing
                        //     })


                    }
                } else {
                    console.log("Product not found")
                }
            })


    }

   // Images=()=>{
   //      return this.state.product.photos.map((photo)=>{
   //          return <Row>{photo.filename}</Row>
   //      })
   // }


    render() {
       // const {product} = this.state

        const{addCart} = this.context;

        let inStockOrOutOfStock = null
        if (this.state.product.stock < 1){
            inStockOrOutOfStock = <Button disabled>Out of Stock</Button>
        }else{
            inStockOrOutOfStock= <Button onClick={()=> addCart(this.state.product._id)}>Add to cart</Button>
        }



        return(
            <Container>
                <Col>
                    <Row>{this.state.product.name}</Row>
                    <Row>{this.state.product.description}</Row>
                    <Row>{this.state.product.stock}</Row>
                    <Row>€{this.state.product.price}</Row>
                    <Row>{inStockOrOutOfStock}</Row>
                    <Row><img id="img" src=""/></Row>

                    {/*<Row>{this.state.product.photos.map((image)=>(*/}
                    {/*    <h1>{image.filename}</h1>*/}
                    {/*))}</Row>*/}


                </Col>


            </Container>
        )
    }
}