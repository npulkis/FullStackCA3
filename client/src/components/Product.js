import {Component} from "react";
import {Card} from "react-bootstrap";
import placeholder from '../placeholder/placeholder.jpg'

export default class Product extends Component{



    render() {
        const { product } = this.props;
        return(
            <Card>
                <Card.Body>
                    <Card.Img src={placeholder}/>
                    <Card.Title> {product.name}</Card.Title>
                    {/*<Card.Text>{product.description}</Card.Text>*/}
                    {/*<Card.Text>Category:{product.category}</Card.Text>*/}
                    {/*<Card.Text>Stock:{product.stock}</Card.Text>*/}
                    <Card.Text>Price: €{product.price}</Card.Text>
                </Card.Body>
            </Card>

        )
    }
}