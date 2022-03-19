import {Component} from "react";
import Login from "./Login";
import Register from "./Register";
import './LoginRegister.css';

export default class LoginRegister extends Component{

    render() {
        return(
            <div className="Login-Register">
                <Login/>
                <Register/>
            </div>
        )
    }
}