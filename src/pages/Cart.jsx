import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Your cart is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        Your Cart
      </Typography>
      {cart.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>{item.name}</Typography>
            <Typography>₹{item.price}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Typography>₹{item.price * item.quantity}</Typography>
            <IconButton color="error" onClick={() => removeFromCart(item.id)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
      <Typography variant="h5" mt={2}>
        Total: ₹{total}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
}
