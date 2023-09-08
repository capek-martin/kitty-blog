import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import "./LoginPage.style.scss";
import { Box, TextField, Button, Grid, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const { state } = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login && login(email, password);
  };

  return (
    <>
      <Box
        className="container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 5,
        }}
      >
        {state && state?.restricted && (
          <Alert
            severity="error"
            style={{
              textAlign: "center",
              position: "absolute",
              top: "4rem",
              width: "45%",
            }}
          >
            You´re trying to reach restricted area. Please sign in first!
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 4 }}>
          <h4>Log in</h4>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="me@example.com"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="**********"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, float: "right" }}
          >
            Log in
          </Button>
          <Grid container></Grid>
        </Box>
      </Box>
    </>
  );
};
