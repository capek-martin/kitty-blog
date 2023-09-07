import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import "./LoginPage.style.scss";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

export const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login && login(email, password);
  };

  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 5,
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ px: 5 }}>
        <Typography variant="h4" mb={1.5}>
          Log in
        </Typography>
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
  );
};
