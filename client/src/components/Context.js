import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";

export const DataContext = React.createContext();

export class DataProvider extends Component {


    state = {
        products: [],
        cart: [],
        categories: [],
        isLoggedIn: false,
        total: 0
    }


    componentDidUpdate() {

        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))

    };


    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Products read")
                        this.setState({products: res.data.data})

                    }
                } else {
                    console.log("Products not found")
                }
            })

        axios.get(`${SERVER_HOST}/categories`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("categories read")
                        this.setState({categories: res.data})

                    }
                } else {
                    console.log("categories not found")
                }
            })


        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({total: dataTotal});
        }

    }

    clearCart = () => {
        this.setState({cart: []})
        this.setState({total: 0})
    }

    addCart = (id) => {
        const {products, cart} = this.state;
        const check = cart.every(item => {
            return item._id !== id
        })
        if (check) {
            const data = products.filter(product => {
                return product._id === id
            })
            this.setState({cart: [...cart, ...data]})
        } else {
            alert("The product has been added to cart.")
            console.log(this.state.cart)
        }
        this.getTotal()
        this.getTotal()
    };

    decrease = id => {
        const {cart} = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id => {
        const {cart} = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.stock === item.count ? item.count = item.stock : item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            const {cart} = this.state;
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }

    };

    getTotal = () => {
        const {cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };

    filterDesc = () => {
        axios.get(`${SERVER_HOST}/products/desc`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Products read")
                        this.setState({products: res.data.data})

                    }
                } else {
                    console.log("Products not found")
                }
            })
    }

    searchProducts = (search) => {
        if (search === "") {
            axios.get(`${SERVER_HOST}/products`)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("Products read")
                            this.setState({products: res.data.data})

                        }
                    } else {
                        console.log("Products not found")
                    }
                })
        } else {
            axios.get(`${SERVER_HOST}/search/${search}`)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("Products read")
                            this.setState({products: res.data.data})

                        }
                    } else {
                        console.log("Products not found")
                    }
                })
        }


    }

    filterProducts = (category) => {

        console.log(category)

        if (category === "Select Category") {
            axios.get(`${SERVER_HOST}/products`)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("Products read")
                            this.setState({products: res.data.data})

                        }
                    } else {
                        console.log("Products not found")
                    }
                })

        } else {
            axios.get(`${SERVER_HOST}/filter/${category}`)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("Products read")
                            this.setState({products: res.data.data})

                        }
                    } else {
                        console.log("Products not found")
                    }
                })
        }
    }

    loggedIn = () => {
        this.setState({isLoggedIn: true})
    }

    setSort = (sortedProducts) =>{

        this.setState({products: sortedProducts})
    }

    reset = ()=>{

            axios.get(`${SERVER_HOST}/products`)
                .then(res => {
                    if (res.data) {
                        if (res.data.errorMessage) {
                            console.log(res.data.errorMessage)
                        } else {
                            console.log("Products read")
                            this.setState({products: res.data.data})

                        }
                    } else {
                        console.log("Products not found")
                    }
                })
    }


    provider;

    render() {

        const {products, categories, cart, total} = this.state
        const {
            addCart,
            removeProduct,
            decrease,
            increase,
            getTotal,
            clearCart,
            searchProducts,
            filterProducts,
            loggedIn,
            setSort,
            reset
        } = this;
        this.provider = <DataContext.Provider value={{
            products, categories, addCart, cart, total, removeProduct,
            decrease, increase, getTotal, clearCart, searchProducts, filterProducts, loggedIn,setSort,reset
        }}>
            {this.props.children}
        </DataContext.Provider>
        ;
        return this.provider

    }
}