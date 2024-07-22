import React, { useState } from 'react'
import {Link} from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse } from "@mui/material";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();
  const theme = useTheme();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post("/api/v1/auth/login", {
        email,
        password
      });
      if (data.token.accessToken){
        toast.success("User Logged in successfully")
        localStorage.setItem("authToken",true)
        navigate("/")
      }
     
      
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  return (
    <Box 
    width={isNotMobile ? "40%" : "80%"} p={"2rem"}
    m={"2rem auto"}
    borderRadius={5}
    sx={{ boxShadow: 5 }}
    backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{mb: 2}}>
          {error}
        </Alert>
        </Collapse>

      <form onSubmit={handleSubmit}>
        <Typography variant="h3" textAlign={"center"}>Login</Typography>
        
        
        <TextField
        label="Email"
        required
        margin='normal'
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

<TextField
        label="Password"
        required
        margin='normal'
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
         Sign In
        </Button>
    <Typography mt={2} textAlign={"center"}> Don't have an account? <Link to="/register">Sign UP</Link></Typography>


      </form>
    </Box>
  )
}

export default Login