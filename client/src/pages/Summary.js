import React, { useState } from 'react'
import {Link} from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Card } from "@mui/material";

import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Summary = () => {


  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("")
  
 

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/try-ai/summary", { text });
        setSummary(data.summary);
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
  };

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
        <Typography variant="h3" textAlign={"center"}>Summary</Typography>
        
        
        <TextField
          placeholder="add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />



        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
         Submit
        </Button>
    <Typography mt={2} textAlign={"center"}> Not this tool? <Link to="/">Go Home</Link></Typography>
      </form>
    {summary?(
      <Card sx={{mt:4, border:1, boxShadow:0, height:'500px', borderRadius:5, borderColor:'natural.medium', bgcolor:'background.default' }}>
        <Typography>
{summary}
        </Typography>
      </Card>



    ):(   <Card sx={{mt:4, border:1, boxShadow:0, height:'500px', borderRadius:5, borderColor:'natural.medium', bgcolor:'background.default' }}>
      <Typography variant='h5' color='natural.main' sx={{textAlign:'center', verticalAlign:'middle', lineHeight:'500px'}}>Summary will be shown here

      </Typography>
    </Card>)}



    </Box>
  )
}

export default Summary