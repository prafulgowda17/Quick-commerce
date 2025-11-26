import { TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminProductRow({ product, onDelete }) {
  return (
    <TableRow>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>₹{product.price}</TableCell>
      <TableCell>
        <IconButton color="error" onClick={() => onDelete(product.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
