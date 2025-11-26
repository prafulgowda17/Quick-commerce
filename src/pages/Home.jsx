import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      sx={{
        p: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #ff5722, #ff9800)",
        borderRadius: 4,
        mt: 3,
        color: "white",
      }}
    >
      <Typography variant="h3" fontWeight={700}>
        Superfast Delivery of Daily Essentials
      </Typography>
      <Typography sx={{ mt: 2, maxWidth: 500 }}>
        A quick-commerce prototype where users can browse products, add to cart,
        and simulate checkout – all on a clean React + Material UI frontend.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 4 }}
        component={Link}
        to="/products"
      >
        Start Shopping
      </Button>
    </Box>
  );
}
