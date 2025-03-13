import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/product";

export const ProductModal = ({ open, onClose, onAddOrderLine, productToEdit }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
  
    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    useEffect(() => {
        if (productToEdit) {
            setSelectedProduct(productToEdit.productId);
            setQuantity(productToEdit.quantity);
        } else {
            setSelectedProduct("");
            setQuantity(1);
        }
    }, [productToEdit]);

    const handleSave = () => {
        if (!selectedProduct) return;
        const product = products.find(p => p.id === selectedProduct);
        onAddOrderLine({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
        });
        onClose();
    };
  
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{productToEdit ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    label="Product"
                    fullWidth
                    margin="normal"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(Number(e.target.value))}
                >
                    {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.name} - ${product.price}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Quantity"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
  };
  