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

    decrease = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.stock === item.count ? item.count = item.stock : item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }

    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };


    provider;
    render() {

        const {products,categories,cart,total}=this.state
        const {addCart,removeProduct,decrease,increase,getTotal}=this;
        this.provider=<DataContext.Provider value={{products,categories,addCart,cart,total,removeProduct,decrease,increase,getTotal}}>
            {this.props.children}
        </DataContext.Provider>
        ;
        return this.provider

    }
}