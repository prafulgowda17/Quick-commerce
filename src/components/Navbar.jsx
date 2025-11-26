import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useThemeMode, useTheme } from "../context/ThemeModeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Navbar() {
  const { cart } = useCart();
  const location = useLocation();
  const { toggleMode } = useThemeMode();
  const theme = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: 700 }}
        >
          Quick Commerce
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color={isActive("/") ? "secondary" : "inherit"}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color={isActive("/products") ? "secondary" : "inherit"}
            component={Link}
            to="/products"
          >
            Products
          </Button>
          <Button
            color={isActive("/admin") ? "secondary" : "inherit"}
            component={Link}
            to="/admin"
          >
            Admin
          </Button>
          <Button
            color={isActive("/cart") ? "secondary" : "inherit"}
            component={Link}
            to="/cart"
          >
            Cart ({cart.length})
          </Button>

          <IconButton color="inherit" onClick={toggleMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
