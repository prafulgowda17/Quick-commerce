import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <Card
      sx={{
        width: 240,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 2,
        transition: "0.3s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography>₹{product.price}</Typography>
          <Chip label={product.category} size="small" />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAdd}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
