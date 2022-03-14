import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";

export const DataContext = React.createContext();

export class DataProvider extends Component{


    state = {
        products:[],
        cart:[],
        categories:[],
        total:1
    }


    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };



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


        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }

    }


    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
            console.log(this.state.cart)
        }
    };

    provider;
    render() {

        const {products,categories,cart,total}=this.state
        const {addCart}=this;
        this.provider=<DataContext.Provider value={{products,categories,addCart,cart,total}}>
            {this.props.children}
        </DataContext.Provider>
        ;
        return this.provider

    }
}