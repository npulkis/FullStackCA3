import {Component} from "react";
import {Button, Card} from "react-bootstrap";
import placeholder from '../placeholder/placeholder.jpg';

export default class Product extends Component{



    render() {
        const { product } = this.props;
        return(



            <Card className="border-0" >
                <Card.Body>
                    <Card.Img src={placeholder}/>
                    <Card.Title> {product.name}</Card.Title>
                    {/*<Card.Text>{product.description}</Card.Text>*/}
                    {/*<Card.Text>Category:{product.category}</Card.Text>*/}
                    {/*<Card.Text>Stock:{product.stock}</Card.Text>*/}
                    <Card.Text>Price: €{product.price}</Card.Text>
                    <Button>Add to cart</Button>
                </Card.Body>
            </Card>

        )
    }
}