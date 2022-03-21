
import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import './Product.css'
import {DataContext} from "../Context";


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
                        this.getPhoto()

                    }
                } else {
                    console.log("Product not found")
                }
            })

    }

    getPhoto = () =>{
        const image = this.state.product.photos[0].filename;
        axios.get(`${SERVER_HOST}/photo/${image}`)
            .then(res =>
            {
                document.getElementById("image").src = `data:;base64,${res.data.image}`
            })
            .catch(err =>
            {
                // do nothing
            })

    }


    render() {


        let inStockOrOutOfStock = null
        if (this.state.product.stock < 1){
            inStockOrOutOfStock = <button className="cart" disabled>Out of Stock</button>
        }else{
            inStockOrOutOfStock= <button className="cart" onClick={()=> addCart(this.state.product._id)}>Add to cart</button>
        }

        const{addCart} = this.context;


        return(
            <div className="app">
                {

                        <div className="details" key={this.state.product._id}>
                            <div className="big-img">
                                <img src="" id="image"  />
                            </div>

                            <div className="box">
                                <div className="row">
                                    <h2>{this.state.product.name}</h2>
                                    <span>€{this.state.product.price}</span>
                                </div>

                                <h6> {this.state.product.category}</h6>
                                <p>Stock: {this.state.product.stock}</p>

                                <p>{this.state.product.description}</p>


                                {inStockOrOutOfStock}
                            </div>
                        </div>

                }
            </div>
        );
    };
}
