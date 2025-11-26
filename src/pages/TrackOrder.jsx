import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

const steps = [
  "Order Placed",
  "Store Confirmed",
  "Packed & Ready",
  "Out for Delivery",
  "Near Your Location",
  "Delivered",
];

export default function TrackOrder() {
  const TOTAL_TIME = 30 * 60; // 30 mins in seconds
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Countdown timer — updates every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Progress bar movement
  useEffect(() => {
    const percent = 100 - (timeLeft / TOTAL_TIME) * 100;
    setProgress(percent);

    // step movement
    const stepIndex = Math.min(
      steps.length - 1,
      Math.floor((percent / 100) * steps.length)
    );
    setActiveStep(stepIndex);
  }, [timeLeft]);

  // Rider movement along route
  const riderX = `${progress}%`;

  // Format timer
  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Live Order Tracking
      </Typography>

      <Paper sx={{ p: 4 }}>
        {/* Step Progress */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Linear progress */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1">Delivery Progress</Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              mt: 1,
            }}
          />
        </Box>

        {/* ETA */}
        <Typography
          variant="h5"
          fontWeight={600}
          textAlign="center"
          mt={3}
          color="primary"
        >
          Arriving in {mins}:{secs} minutes
        </Typography>

        {/* MAP AREA */}
        <Box
          sx={{
            mt: 5,
            height: 140,
            borderRadius: 4,
            p: 2,
            border: "2px solid #ddd",
            position: "relative",
            background: "linear-gradient(180deg, #fafafa, #f3f3f3)",
          }}
        >
          {/* Store Label */}
          <Box
            sx={{
              position: "absolute",
              left: "5%",
              top: "10%",
              textAlign: "center",
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              🏬 Store
            </Typography>
          </Box>

          {/* User Label */}
          <Box
            sx={{
              position: "absolute",
              right: "5%",
              top: "10%",
              textAlign: "center",
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              🏠 You
            </Typography>
          </Box>

          {/* Route Line */}
          <Box
            sx={{
              position: "absolute",
              top: "55%",
              left: "8%",
              width: "84%",
              height: 6,
              borderRadius: 5,
              background: "#bbb",
            }}
          />

          {/* Rider Icon Moving */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: riderX,
              transform: "translate(-50%, -50%)",
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#ff5722",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 20,
              boxShadow: "0px 0px 10px rgba(255,87,34,0.7)",
              transition: "left 1s linear",
            }}
          >
            🚴‍♂️
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
