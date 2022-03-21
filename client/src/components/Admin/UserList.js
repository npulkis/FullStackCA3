import {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Button, Container, Table} from "react-bootstrap"
import {Link} from "react-router-dom";

export class UserList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }


    componentDidMount(){
        axios.get(`${SERVER_HOST}/users`,{headers:{"authorization":localStorage.token}})
            .then(res =>
            {
                if (res.data){
                    if (res.data.errorMessage){
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("users read")
                        this.setState({users: res.data})



                    }
                }else {
                    console.log("users not found")
                }
            })
    }
    render() {
        return(

            <Container>
                <h1>User List</h1>

                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user)=>(
                        <tr key={user._id}>
                            <th>{user._id}</th>
                            <th>{user.name}</th>
                            <th>{user.email}</th>
                            {user.accessLevel === 1 ? <th>Normal</th> : <th>Admin</th>}
                            <th>
                                <Link to= {"/DeleteUser/" + user._id}>
                                    <Button variant="danger">Delete</Button>
                                </Link>
                                <Link to= {"/orders/" + user.email}>
                                    <Button>Order History</Button>
                                </Link>
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}