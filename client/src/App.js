import './App.css';

import NavBar from './components/NavBar';
import {Component} from "react";
import {BrowserRouter, Route,Switch} from "react-router-dom";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Products from "./components/Products";
import DeleteProduct from "./components/Admin/DeleteProduct";
import {AdminMenu} from "./components/Admin/AdminMenu";
import DeleteCategory from "./components/Admin/DeleteCategory";
import DeleteUser from "./components/Admin/DeleteUser";
import {EditProduct} from "./components/Admin/EditProduct";
import {ACCESS_LEVEL_GUEST} from "./config/global_constants"
import LoggedInRoute from "./components/LoggedInRoute";
import Logout from "./components/Logout";
import {DataProvider} from "./components/Context";
import {Cart} from "./components/Cart/Cart";
import PayPalMessage from "./components/PayPal/PayPalMessage";
import UserOrderHistory from "./components/UserOrderHistory";
import Product from "./components/DetailedProduct/Product";
import ReturnOrder from "./components/ReturnOrder";



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
                        <Route exact path={"/login"} component={LoginRegister}/>
                        <Route exact path={"/"} component={Products}/>
                        <Route exact path={"/cart"} component={Cart}/>
                        <Route exact path={"/PayPalMessage/:messageType/:payPalPaymentID"} component={PayPalMessage}/>
                        <Route exact path={"/product/:id"} component={Product}/>
                        <LoggedInRoute exact path={"/return/:id"} component={ReturnOrder}/>
                        <LoggedInRoute exact path={"/DeleteProduct/:id"} component={DeleteProduct}/>
                        <LoggedInRoute exact path={"/DeleteCategory/:id"} component={DeleteCategory}/>
                        <LoggedInRoute exact path={"/DeleteUser/:id"} component={DeleteUser}/>
                        <LoggedInRoute exact path={"/EditProduct/:id"} component={EditProduct}/>
                        <LoggedInRoute exact path={"/admin"} component={AdminMenu}/>
                        <LoggedInRoute exact path={"/logout"} component={Logout}/>
                        <LoggedInRoute exact path={"/orders/:email"} component={UserOrderHistory}/>
                    </Switch>

                </BrowserRouter>
                </div>
            </div>
        </DataProvider>

        );
    }


}

