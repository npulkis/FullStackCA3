import {Component} from "react";
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

                    }
                } else {
                    console.log("Product not found")
                }
            })
    }


    render() {
       const {product} = this.state

        const{addCart} = this.context;

        let inStockOrOutOfStock = null
        if (product.stock < 1){
            inStockOrOutOfStock = <Button disabled>Out of Stock</Button>
        }else{
            inStockOrOutOfStock= <Button onClick={()=> addCart(product._id)}>Add to cart</Button>
        }

        return(
            <Container>
                <Col>
                    <Row>{product.name}</Row>
                    <Row>{product.description}</Row>
                    <Row>{product.stock}</Row>
                    <Row>€{product.price}</Row>
                    <Row>{inStockOrOutOfStock}</Row>

                </Col>


            </Container>
        )
    }
}