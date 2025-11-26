import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import productsData from "../data/products";
import AdminProductRow from "../components/AdminProductRow";

export default function AdminDashboard() {
  const [products, setProducts] = useState(productsData);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
  });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) return;
    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    setProducts((prev) => [
      ...prev,
      { ...newProduct, id: newId, price: Number(newProduct.price) },
    ]);
    setNewProduct({ name: "", category: "", price: "" });
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>
        Admin Dashboard (Frontend Only)
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" mb={1}>
          Add Product
        </Typography>
        <TextField
          label="Name"
          sx={{ mr: 1, mb: 1 }}
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <TextField
          label="Category"
          sx={{ mr: 1, mb: 1 }}
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <TextField
          label="Price"
          type="number"
          sx={{ mr: 1, mb: 1 }}
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <AdminProductRow key={p.id} product={p} onDelete={handleDelete} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
