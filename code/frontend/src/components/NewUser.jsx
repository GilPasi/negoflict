import React from 'react'
import NavBar from './chat_components/NavBar'
import {Stack} from '@mui/material';
import { styled } from '@mui/system';

const CustomInput = styled('Input')({
    color: '#fff',
    backgroundColor: '#B2B2B2',
    padding: 8,
    borderRadius: 4,
    
    "&::placeholder": {
        color: "#fff"
      },
  });

  const CustomButton = styled('Button')({
    color: 'black',
    backgroundColor: '#B2B2B2',
    padding: 12,
    borderRadius: 8,
  });

const NewUser = () => {
  return (
    <div style={{background:"#fff"}} >
      <NavBar/>
      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "100px",
        }}
        >
      <Stack spacing={2}>
      <CustomInput placeholder="First Name" />
      <CustomInput placeholder="Last Name"  />
      <Stack direction="row" spacing={1}>
      <CustomInput placeholder="Phone"  />
      </Stack>
      <CustomInput placeholder="Email"  />
      <label >The Problem</label>
      <textarea  rows="6" style={{backgroundColor:"#B2B2B2" , color:"#fff"}}/>
      <Stack direction="row" spacing={1} sx={{justifyContent:"center"}} > 
      <CustomButton>Back</CustomButton>
      <CustomButton>Next</CustomButton>
      </Stack>
      </Stack>
      </form>
    </div>
    
  )
}

export default NewUser
