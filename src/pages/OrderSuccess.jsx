import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>
        Order Placed Successfully!
      </Typography>

      <Typography mt={2}>Your Order ID: #12345</Typography>

      <Box mt={4} sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/track-order")}
        >
          Track My Order
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}
