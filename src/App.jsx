import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MyOrders } from "./pages/MyOrders";
import { AddEditOrder } from "./pages/AddEditOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/my-orders" replace />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/add-order/:id" element={<AddEditOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
