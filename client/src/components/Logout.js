import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            isLoggedIn:true
        }
    }


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
        return (
            <div>

                {!this.state.isLoggedIn ? <Redirect to="/"/> : null}

            </div>
        )
    }
}