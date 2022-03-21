import React, {Component} from "react";
import {DataContext} from "../Context";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";

export default class CartProduct extends Component{
    static contextType = DataContext;



    componentDidMount() {

        const image = this.props.product.photos[0].filename;
        const imageID = this.props.product.photos[0]._id;
        axios.get(`${SERVER_HOST}/photo/${image}`)
            .then(res =>
            {
                document.getElementById(imageID).src = `data:;base64,${res.data.image}`
            })
            .catch(err =>
            {
                // do nothing
            })

    }

    render() {


        const {increase,decrease, removeProduct} = this.context;


        return(
            <div className="app">
                {

                    <div className="details" key={this.props.product._id}>
                        <div className="big-img">
                            <img src=""  id={this.props.product.photos[0]._id} />
                        </div>

                        <div className="box">
                            <div className="row">
                                <h2>{this.props.product.name}</h2>
                                <span>€{this.props.product.price}</span>
                            </div>

                            <p>Stock: {this.props.product.stock}</p>

                                        <button className="count" onClick={() => decrease(this.props.product._id)} >-</button>
                                         <span className="quantity"> {this.props.product.count} </span>
                                         <button  className="count" onClick={() => increase(this.props.product._id)} >+</button>

                            <div>
                                <button className="cart" onClick={() => removeProduct(this.props.product._id)}>Remove</button>
                            </div>






                        </div>
                    </div>

                }
            </div>
        );
    };

}