import {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Button, Card, Col, Row} from "react-bootstrap";
import Product from "./Product";

export default class Products extends Component{
    constructor(props) {
        super(props)

        this.state= {
            products:[]
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
    }

    render() {
        return(
            <div>

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
