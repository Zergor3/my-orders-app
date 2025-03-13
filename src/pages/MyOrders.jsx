import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOrder, fetchOrders } from "../services/order";
import { formatDate } from "../utils/dateUtils";

export function MyOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders().then(data => setOrders(data));
    }, []);


    const handleDeleteOrder = async (id) => {
        const success = await deleteOrder(id);
        if (success) {
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        }
    };

    return (
        <Container>
            <h2>My Orders</h2>
            <Button variant="contained" color="primary" onClick={() => navigate("/add-order/new")}>
                Add New Order
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Order #</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell># Products</TableCell>
                            <TableCell>Final Price</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.orderNumber}</TableCell>
                                <TableCell>{formatDate(order.date)}</TableCell>
                                <TableCell>{order.orderLines?.length}</TableCell>
                                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => navigate(`/add-order/${order.id}`)}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}