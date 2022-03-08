import './App.css';

import NavBar from './components/NavBar';
import {Component} from "react";
import {BrowserRouter, Route,Switch} from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import addProduct from "./components/Admin/AddProduct";
import Products from "./components/Products";
import addCategory from "./components/Admin/AddCategory";
import {productList} from "./components/Admin/ProductList";
import DeleteProduct from "./components/Admin/DeleteProduct";
import {AdminMenu} from "./components/Admin/AdminMenu";
import DeleteCategory from "./components/Admin/DeleteCategory";
import DeleteUser from "./components/Admin/DeleteUser";
import {EditProduct} from "./components/Admin/EditProduct";




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
                        <Route exact path={"/products"} component={Products}/>
                        <Route exact path={"/DeleteProduct/:id"} component={DeleteProduct}/>
                        <Route exact path={"/DeleteCategory/:id"} component={DeleteCategory}/>
                        <Route exact path={"/DeleteUser/:id"} component={DeleteUser}/>
                        <Route exact path={"/EditProduct/:id"} component={EditProduct}/>

                        <Route exact path={"/admin"} component={AdminMenu}/>
                    </Switch>

                </BrowserRouter>
                </div>
            </div>





        )
    }


}

