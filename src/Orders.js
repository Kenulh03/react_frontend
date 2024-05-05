import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

function Orders() {

    const { isAuthenticated,jwtToken } = useAuth();
    const [orders,setOrders] = useState(null);
    const navigate = useNavigate(); //to navigate users programatically

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
        axios.get("http://localhost:8080/orders",config)
        .then(function (response) {
            setOrders(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    },[isAuthenticated])

    function createOrder(event) {
        event.preventDefault();

        axios
        .post(`http://localhost:8080/orders`,config)
        .then(function (response) {
            navigate(`/orders/${response.data.id}/editOrder`)
        }).catch(function (error) {
            console.log(error);
        });
    }

  return (
    <div className="container">
      <h1>Orders</h1>

      <div>
        <button type="button" onClick={createOrder} className="btn btn-primary">Create Order</button>
      </div>
      <table className="table table-striped">
        <thead>
            <tr>
                <th>#ID</th>
                <th>Date and Time</th>
                <th>Total Items</th>
                <th>Total Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {orders && orders.map((order) => (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.orderedProducts.length}</td>
                    <td>{order.totalPrice}</td>
                    <td><button className="btn btn-primary btn-sm" onClick = {() =>{
                        navigate(`/orders/${order.id}/editOrder`)
                    }}>Edit</button></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders;
