import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"
import {DataContext} from "./Context";


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            isLoggedIn:true
        }
    }
    static contextType = DataContext;


  componentDidMount()
    {
        axios.post(`${SERVER_HOST}/users/logout`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log("User logged out")
                        localStorage.clear()

                        localStorage.name = "GUEST"
                        localStorage.accessLevel = ACCESS_LEVEL_GUEST
                        // localStorage.dataCart = []
                        // localStorage.dataTotal = 0

                        this.setState({isLoggedIn:false})

                    }
                }
                else
                {
                    console.log("Logout failed")
                }
            })
    }


    render()
    {
        const {clearCart} = this.context;

        return (
            <div>
                {clearCart()}
                {!this.state.isLoggedIn ? <Redirect to="/"/> : null}

            </div>
        )
    }
}