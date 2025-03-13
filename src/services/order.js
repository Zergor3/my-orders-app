import axios from "axios";
import { API_URL } from "../config";

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};

export const fetchOrderById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};

export const saveOrder = async (order) => {
    try {
        if (order.id) {
            await axios.put(`${API_URL}/orders/${order.id}`, order);
        } else {
            await axios.post(`${API_URL}/orders`, order);
        }
    } catch (error) {
        console.error("Error saving order:", error);
        throw error;
    }
};

export const deleteOrder = async (id) => {
    try {
        await axios.delete(`${API_URL}/orders/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting order:", error);
        return false;
    }
};
