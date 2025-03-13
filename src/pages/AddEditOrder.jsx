import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductModal } from "../components/ProductModal";
import { Alert, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { fetchOrderById, saveOrder } from "../services/order";
import { formatDate } from "../utils/dateUtils";

export const AddEditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id !== "new";
    const [order, setOrder] = useState({
        orderNumber: "",
        date: formatDate(new Date()),
        orderLines: []
    });
    const [openModal, setOpenModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchOrderById(id).then(data => setOrder(data));
        }
    }, [id, isEditing]);

    const handleAddOrderLine = (product) => {
        if (editProduct) {
            setOrder(prevOrder => ({
                ...prevOrder,
                orderLines: prevOrder.orderLines.map(p =>
                    p.id === editProduct.id ? { ...product, productId: editProduct.productId } : p
                )
            }));
        } else {
            setOrder(prevOrder => ({
                ...prevOrder,
                orderLines: [...prevOrder.orderLines, { ...product, productId: product.productId, quantity: product.quantity }]
            }));
        }
        setEditProduct(null);
        setOpenModal(false);
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setOpenModal(true);
    };

    const handleRemoveProduct = (productId) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            orderLines: prevOrder.orderLines.filter(p => p.id !== productId)
        }));
    };

    const handleSaveOrder = async () => {
        if (order.orderNumber.trim() === '') {
            setError(true);  
        } else {
            setError(false);  
            await saveOrder(order);
            navigate("/my-orders");
        }

    };

    return (
        <Container>
            <h2>{isEditing ? "Edit Order" : "Add Order"}</h2>
            <TextField label="Order #" value={order.orderNumber}
                onChange={(e) => setOrder({ ...order, orderNumber: e.target.value })}
                fullWidth margin="normal" />
            {error && <Alert severity="error">El campo no puede estar vacío</Alert>}
            <TextField label="Date" value={formatDate(order.date)} fullWidth margin="normal" disabled />
            <TextField label="# Products" value={order.orderLines.length} fullWidth margin="normal" disabled />
            <TextField label="Final Price" value={(order.orderLines.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2))} fullWidth margin="normal" disabled />
            <Button variant="contained" onClick={() => setOpenModal(true)}>Add Product</Button>

            <ProductModal open={openModal} onClose={() => setOpenModal(false)} onAddOrderLine={handleAddOrderLine} productToEdit={editProduct} />

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderLines.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product.productId}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>${(product.price * product.quantity).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleEditProduct(product)}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleRemoveProduct(product.id)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" color="success" onClick={handleSaveOrder} sx={{ marginTop: 2 }}>Save Order</Button>
        </Container>
    );
};