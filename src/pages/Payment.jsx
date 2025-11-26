import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const { subtotal, discountAmount, total, applyCoupon, promoCode } = useCart();
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleApplyCoupon = () => {
    const res = applyCoupon(couponInput);
    if (res.ok) toast.success(res.msg);
    else toast.error(res.msg);
  };

  const handlePay = () => {
    if (method === "card") {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        toast.error("Fill all card details");
        return;
      }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // save order history
      const tempOrder = JSON.parse(localStorage.getItem("tempOrder") || "null");
      if (tempOrder) {
        const existing = JSON.parse(localStorage.getItem("orders") || "[]");
        existing.push({ ...tempOrder, total });
        localStorage.setItem("orders", JSON.stringify(existing));
        localStorage.removeItem("tempOrder");
      }
      toast.success("Payment successful");
      navigate("/order-success");
    }, 1500);
  };

  const maskedNumber =
    card.number.replace(/\s+/g, "").slice(-4) || "0000";

  return (
    <Box sx={{ p: 4, display: "flex", gap: 4, flexWrap: "wrap" }}>
      {/* Left: fancy card UI */}
      <Paper
        sx={{
          p: 3,
          flex: 1,
          minWidth: 280,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Payment
        </Typography>

        {/* Card preview */}
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background:
              "linear-gradient(135deg, #ff5722, #ff9800)",
            color: "white",
            mb: 2,
          }}
        >
          <Typography variant="subtitle2">Virtual Card</Typography>
          <Typography variant="h6" sx={{ mt: 2, letterSpacing: 2 }}>
            **** **** **** {maskedNumber}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              fontSize: 13,
            }}
          >
            <Box>
              <Typography variant="caption">CARD HOLDER</Typography>
              <Typography>{card.name || "YOUR NAME"}</Typography>
            </Box>
            <Box>
              <Typography variant="caption">EXPIRES</Typography>
              <Typography>{card.expiry || "MM/YY"}</Typography>
            </Box>
          </Box>
        </Box>

        <RadioGroup
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit / Debit Card"
          />
          <FormControlLabel value="upi" control={<Radio />} label="UPI" />
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>

        {method === "card" && (
          <>
            <TextField
              label="Card Number"
              fullWidth
              margin="dense"
              value={card.number}
              onChange={(e) =>
                setCard({ ...card, number: e.target.value })
              }
            />
            <TextField
              label="Card Holder Name"
              fullWidth
              margin="dense"
              value={card.name}
              onChange={(e) =>
                setCard({ ...card, name: e.target.value })
              }
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Expiry (MM/YY)"
                margin="dense"
                value={card.expiry}
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
              />
              <TextField
                label="CVV"
                type="password"
                margin="dense"
                value={card.cvv}
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />
            </Box>
          </>
        )}

        {method === "upi" && (
          <TextField
            label="UPI ID"
            fullWidth
            margin="dense"
            placeholder="name@upi"
          />
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : `Pay ₹${total}`}
        </Button>
      </Paper>

      {/* Right: summary + coupons */}
      <Paper sx={{ p: 3, flex: 1, minWidth: 260 }}>
        <Typography variant="h6" fontWeight={600} mb={1}>
          Price Details
        </Typography>
        <Typography>Subtotal: ₹{subtotal}</Typography>
        <Typography>
          Discount ({promoCode || "None"}): -₹{discountAmount}
        </Typography>
        <Typography variant="h5" mt={2} fontWeight={700}>
          Payable: ₹{total}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Apply Promo Code</Typography>
          <TextField
            fullWidth
            margin="dense"
            placeholder="SAVE10 or FIRST50"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={handleApplyCoupon}
          >
            Apply
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
