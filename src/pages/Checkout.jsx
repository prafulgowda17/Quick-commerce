import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total } = useCart();   // FIXED HERE

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  if (!cart || !cart.length) {    // FIXED HERE
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Your cart is empty.</Typography>
      </Box>
    );
  }

  const handleContinue = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all delivery details");
      return;
    }

    const tempOrder = {
      id: Date.now(),
      items: cart,        // FIXED HERE
      total,
      customer: form,
      status: "Pending Payment",
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem("tempOrder", JSON.stringify(tempOrder));

    navigate("/payment");
  };

  return (
    <Box sx={{ p: 4, display: "flex", gap: 4, flexWrap: "wrap" }}>
      <Paper sx={{ p: 3, flex: 1, minWidth: 300 }}>
        <Typography variant="h5" mb={2} fontWeight={600}>
          Delivery Details
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <TextField
          fullWidth
          label="Full Address"
          margin="normal"
          multiline
          minRows={3}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleContinue}>
          Continue to Payment
        </Button>
      </Paper>

      <Paper sx={{ p: 3, flex: 1, minWidth: 240 }}>
        <Typography variant="h6" mb={1} fontWeight={600}>
          Order Summary
        </Typography>

        {cart.map((item) => (
          <Typography key={item.id} sx={{ mb: 1 }}>
            {item.name} × {item.quantity} = ₹{item.price * item.quantity}
          </Typography>
        ))}

        <Typography variant="h5" mt={2} fontWeight={700}>
          Total: ₹{total}
        </Typography>
      </Paper>
    </Box>
  );
}
