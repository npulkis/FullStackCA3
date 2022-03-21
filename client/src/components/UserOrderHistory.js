import React, {Component} from "react";
import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants";
import axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";

export default class UserOrderHistory extends Component{

    constructor(props) {
        super(props);
        this.state = {
            orders:[],
            restricted: false
        }
    }


componentDidMount() {

    if (localStorage.email === this.props.match.params.email || localStorage.accessLevel === ACCESS_LEVEL_ADMIN){

        axios.get(`${SERVER_HOST}/sales/${this.props.match.params.email}`,{headers:{"authorization":localStorage.token}})
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
      if (this.state.orders.length ===0){


          return <div> {this.state.restricted ? <Redirect to="/"/> : null}<h1>No orders</h1></div>
      }else {
          return(
              <div>
                  {this.state.restricted ? <Redirect to="/"/> : null}

                  <h1>Order History</h1>


                  <Container>
                      <Row style={{backgroundColor: 'lightgray' , borderRadius: '8px',padding:'10px',marginBottom:'20px'}}>
                          <Col>Order ID</Col>
                          <Col>Products</Col>
                          <Col>Total</Col>
                          <Col>Return Order</Col>
                      </Row>
                      {this.state.orders.map((order)=>(
                          <Row style={{margin:'15px',paddingBottom:'10px',paddingTop:'10px',backgroundColor: "lightgray",borderRadius:'10px'}}>
                              <Col>{order.paypalPaymentID}</Col>
                              <Col>       {order.products.map((product)=> (

                                  <Row>{product.name} Q:{product.count}</Row>
                              ))}</Col>
                              <Col>{order.total}</Col>
                              <Col>{!order.returned? <Link to= {"/return/" + order._id}><Button>Return</Button></Link> : <Button disabled>Order Returned</Button>}</Col>

                          </Row>

                          ))}



                  </Container>
              </div>
          )
      }


}

}