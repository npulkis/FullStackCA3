import {Component} from "react";
import {DataContext} from "./Context";
import {Button, Card, Col} from "react-bootstrap";
import placeholder from "../placeholder/placeholder.jpg";

export class Cart extends Component{
    static contextType= DataContext;

    componentDidMount() {
        this.context.getTotal();
    }

    render() {
        const {cart,increase,decrease, removeProduct,total} = this.context;
        if (cart.length === 0){
            return <h1>No Products in cart</h1>
        }else {
            return (
                <>
                {
                cart.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Card className="border-0" >
                                <Card.Body>
                                    <Card.Img src={placeholder}/>
                                    <Card.Title> {product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text>Category:{product.category}</Card.Text>
                                    <Card.Text>Stock:{product.stock}</Card.Text>
                                    <Button onClick={() => decrease(product._id)} >-</Button>
                                    <Card.Text>Quantity: {product.count}</Card.Text>
                                    <Button onClick={() => increase(product._id)} >+</Button>
                                    <Card.Text>Price: €{product.price}</Card.Text>
                                    <Button onClick={() => removeProduct(product._id)}>Remove</Button>
                                </Card.Body>
                            </Card>

                        </Col>
                    ))}
            <h3>Total: €{total}</h3>
    </>


            )
        }
    }
}