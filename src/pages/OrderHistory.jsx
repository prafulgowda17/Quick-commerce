import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const navigate = useNavigate();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={600}>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Typography sx={{ mt: 2 }}>No past orders.</Typography>
      ) : (
        orders.map((order) => (
          <Paper sx={{ p: 2, my: 2 }} key={order.id}>
            <Typography fontWeight={600}>Order #{order.id}</Typography>
            <Typography>Total: ₹{order.total}</Typography>

            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => navigate("/track-order")}
            >
              Track Order
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
}
