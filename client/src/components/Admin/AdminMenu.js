import {Component} from "react";
import {AddCategory} from "./AddCategory";
import {AddProduct} from "./AddProduct";
import {ProductList} from "./ProductList";
import {UserList} from "./UserList";

export class AdminMenu extends Component{

    render() {
        return(
            <div>
            <AddCategory/>
            <AddProduct/>
            <ProductList/>
            <UserList/>
            </div>
        )
    }
}