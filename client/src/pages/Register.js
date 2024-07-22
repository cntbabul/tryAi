import React, { useState } from 'react'
import {Link} from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse } from "@mui/material";
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/v1/auth/register", {
        username,
        email,
        password
      });
      toast.success("User created successfully")
      
     navigate("/login")
      
    } catch (err) {
      console.log(error)
      if (err.response.data.error){
        setError(err.response.data.error)
      }else if(err.message){
        setError(err.message)
      }
      setTimeout(() => {
        setError("")
      },5000)
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
        <Typography variant="h3" textAlign={"center"}>Register</Typography>
        <TextField
        label="Username"
        required
        margin='normal'
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        
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
         Sign Up
        </Button>
    <Typography mt={2} textAlign={"center"}>Already have an account? <Link to="/login">Login</Link></Typography>


      </form>
    </Box>
  )
}

export default Register