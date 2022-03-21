import {Component} from "react";
import {DataContext} from "../Context";
import {Container, Row} from "react-bootstrap";
import "./Cart.css";
import CheckoutPaypal from "../PayPal/CheckoutPaypal";
import CartProduct from "./CartProduct";

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount() {
        this.context.getTotal();

    }

    render() {
        const {cart, total} = this.context;


        if (cart.length === 0) {
            return <h1>No Products in cart</h1>
        } else {
            return (
                <Container>
                    {

                        cart.map((product) => (


                            <CartProduct key={product._id} product={product}/>
                        ))}

                    <Row className="payPalButton">
                        <h3>Total: €{total}</h3>

                    <CheckoutPaypal  total={total} cart={cart}/>
                    </Row>
                </Container>


            )
        }
    }
}