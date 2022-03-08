import './App.css';

import NavBar from './components/NavBar';
import {Component} from "react";
import {BrowserRouter, Route,Switch} from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import addProduct from "./components/addProduct";
import Products from "./components/Products";
import addCategory from "./components/addCategory";
import {productList} from "./components/productList";
import DeleteProduct from "./components/DeleteProduct";




export default class App extends Component{

    render() {


        return (

            <div>
                <NavBar/>
                <div >
                <BrowserRouter>
                    <Switch>
                        {/*<Route exact path={"/register"} component={Register}/>*/}
                        <Route exact path={"/login"} component={LoginRegister}/>
                        <Route exact path={"/add"} component={addProduct}/>
                        <Route exact path={"/products"} component={Products}/>
                        <Route exact path={"/addc"} component={addCategory}/>
                        <Route exact path={"/plist"} component={productList}/>
                        <Route exact path={"/DeleteProduct/:id"} component={DeleteProduct}/>
                    </Switch>

                </BrowserRouter>
                </div>
            </div>





        )
    }


}

