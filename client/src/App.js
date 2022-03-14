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
import {ACCESS_LEVEL_GUEST} from "./config/global_constants"
import LoggedInRoute from "./components/LoggedInRoute";
import Logout from "./components/Logout";
import {DataProvider} from "./components/Context";
import {Cart} from "./components/Cart";



export default class App extends Component{

    render() {




        if (typeof localStorage.accessLevel === "undefined")
        {
            localStorage.name = "GUEST"
            localStorage.accessLevel = ACCESS_LEVEL_GUEST
            localStorage.token = null
        }




        return (
        <DataProvider>
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
                        <Route exact path={"/cart"} component={Cart}/>
                        <LoggedInRoute exact path={"/admin"} component={AdminMenu}/>
                        <LoggedInRoute exact path={"/logout"} component={Logout}/>
                    </Switch>

                </BrowserRouter>
                </div>
            </div>
        </DataProvider>

        );
    }


}

