import React, {Component} from 'react'
import { Descriptions } from 'antd';
import {DataContext} from "../Context";
import {Button} from "react-bootstrap";
import './Product.css'

export default class ProductInfo extends Component{
    static contextType= DataContext;


    render() {
        const{addCart} = this.context;
        const{info} = this.props

        console.log(this.props)


        let inStockOrOutOfStock = null
        if (info.stock < 1){
            inStockOrOutOfStock = <Button disabled>Out of Stock</Button>
        }else{
            inStockOrOutOfStock= <Button onClick={()=> addCart(info.product._id)}>Add to cart</Button>
        }
        return (
            <div>
                <Descriptions title="Product Info">
                    <Descriptions.Item label="Price"> {info.price}</Descriptions.Item>
                    <Descriptions.Item label="Stock">{info.stock}</Descriptions.Item>
                    {/*<Descriptions.Item label="View"> {Product.views}</Descriptions.Item>*/}
                    <Descriptions.Item label="Description"> {info.description}</Descriptions.Item>
                </Descriptions>

                <br />
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {inStockOrOutOfStock}
                </div>
            </div>
        )
    }


}

