import React from 'react'
import {Route, Redirect } from "react-router-dom"

import {ACCESS_LEVEL_GUEST} from "../config/global_constants"


const OrderHistoryRoute = ({component: Component, exact, path, ...rest }) =>
    (

        <Route
            exact = {exact}
            path = {path}
            render = {props => localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER && localStorage.email == props ? <Component {...props} {...rest} /> : <Redirect to="/"/> }
        />
    )

export default OrderHistoryRoute