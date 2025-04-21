import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "services/user";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const history = useHistory();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (e) {
    } finally {
      history.replace({
        pathname: "/notes",
      });
    }
  };

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await registerUser({ email, password, firstName, lastName });
    } catch (e) {}
  };

  return (
    <Box sx={{ padding: 4, marginTop: "80px" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h5" align="center" gutterBottom>
            {isLogin ? "Login" : "Register"}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          mb={2}
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}
        >
          <Button
            variant={isLogin ? "contained" : "outlined"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant={!isLogin ? "contained" : "outlined"}
            onClick={() => setIsLogin(false)}
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleLoginSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={8} md={8}>
                  <InputLabel id="email">Email</InputLabel>
                  <TextField
                    name="email"
                    placeholder="person@domain.com"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={8} md={8}>
                  <InputLabel id="password">Password</InputLabel>
                  <TextField
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={8} md={8}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}

          {/* Registration Form */}
          {!isLogin && (
            <form onSubmit={handleRegisterSubmit}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={8} md={8}>
                  <InputLabel id="firstName">First Name</InputLabel>
                  <TextField
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleFirstNameChange}
                  />
                </Grid>
                <Grid item xs={8} md={8}>
                  <InputLabel id="lastName">Last Name</InputLabel>
                  <TextField
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleLastNameChange}
                  />
                </Grid>
                <Grid item xs={8} md={8}>
                  <InputLabel id="email">Email</InputLabel>
                  <TextField
                    name="email"
                    placeholder="person@domain.com"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={8} md={8}>
                  <InputLabel id="password">Password</InputLabel>
                  <TextField
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={8}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
