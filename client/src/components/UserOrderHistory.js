import React, {Component} from "react";
import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants";
import axios from "axios";
import {Table} from "react-bootstrap";
import {Redirect} from "react-router-dom";

export default class UserOrderHistory extends Component{

    constructor(props) {
        super(props);
        this.state = {
            orders:[],
            restricted: false
        }
    }


componentDidMount() {

    if (localStorage.email === this.props.match.params.email || localStorage.accessLevel == ACCESS_LEVEL_ADMIN){

        axios.get(`${SERVER_HOST}/sales/${this.props.match.params.email}`)
            .then(res =>
            {
                if (res.data){
                    if (res.data.errorMessage){
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("orders read")
                        this.setState({orders: res.data.data})





                    }
                }else {
                    console.log("orders not found")
                }
            })
    }else{
    this.setState({restricted:true})
    }
}


render() {
      if (this.state.orders.length ==0){


          return <div> {this.state.restricted ? <Redirect to="/"/> : null}<h1>No orders</h1></div>
      }else {
          return(
              <div>
                  {this.state.restricted ? <Redirect to="/"/> : null}

                  <h1>Order History</h1>

                  <Table striped bordered hover size="sm">
                      <thead>
                      <tr>
                          <th>Order ID</th>
                          <th>Products</th>
                          <th>Total</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.state.orders.map((order)=>(
                          <tr key={order._id}>
                              <th>{order.paypalPaymentID}</th>
                              <th>
                                  {order.products.map((product)=> (

                                      ` ${product.name} Q:${product.count},`
                                  ))}
                              </th>
                              <th>{order.total}</th>
                          </tr>
                      ))}
                      </tbody>

                  </Table>
              </div>
          )
      }


}

}