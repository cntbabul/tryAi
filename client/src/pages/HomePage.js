import React from 'react'
import { Box, Typography, Card, Stack} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import FormatAlignLeftOutlined from '@mui/icons-material/FormatAlignLeftOutlined';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <> 
<Box sx={{display:"flex", flexWrap:"wrap", alignItems :"center", justifyContent:"center"}}>
<Box p={2}>
    <Typography variant="h3" mb={2} fontWeight={"bold"} >
      Text Generation
    </Typography>
    <Card onClick={() => navigate("/summary")}
     sx={{boxShadow:2, borderRadius:5, height:190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.main"}}} 
      >
        <DescriptionRounded sx={{fontSize:50, color:"primary.main"}}/>
        <Stack p={3} pt={0}>
          <Typography variant="h5" fontWeight={"bold"} >
            Text Summary
          </Typography>
          <Typography variant="h6">
          Symmarize long text into shorter text.
          </Typography>

        </Stack>
        

    

    </Card>
  </Box>
  <Box p={2}>
      <Typography variant="h3" mb={2} fontWeight={"bold"} >
        Paragraph Generation
      </Typography>
      <Card onClick={() => navigate("/paragraph")}
       sx={{boxShadow:2, borderRadius:5, height:190, width:200, '&:hover':{border:2, boxShadow:0, borderColor:"primary.main"}}} 
        >
          <FormatAlignLeftOutlined sx={{fontSize:50, color:"primary.main"}}/>
          <Stack p={3} pt={0}>
            <Typography variant="h5" fontWeight={"bold"} >
             Paragraph Generation
            </Typography>
            <Typography variant="h6">
            Generate paragraph with words.
            </Typography>

          </Stack>
          

      

      </Card>
    </Box>
</Box>

  
  
  </>
  )
}

export default HomePage