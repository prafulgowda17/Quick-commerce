import { Box, Typography } from "@mui/material";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}
