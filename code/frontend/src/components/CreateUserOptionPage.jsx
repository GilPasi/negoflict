import React from 'react'
import NavBar from './chat_components/NavBar'
import {Input ,Box} from '@mui/material';
import "./CreateUserOptionPage.css";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const CreateUserOptionPage = () => {
  return ( <>
      <NavBar/>
      <Box sx = {{height: 100, padding: 20}}>
        <div className='add'>Add participants</div>
        <div className='send'>Send invitation</div>
        <div className='iconsend'><FileUploadOutlinedIcon></FileUploadOutlinedIcon></div>
      </Box>
      <div className='icons'>
       <SaveAltIcon sx = {{marginRight: 5}} data-hover="Hello, this is the tooltip"></SaveAltIcon>
       <ToggleOnOutlinedIcon sx = {{marginRight: 5}}></ToggleOnOutlinedIcon>
       <PowerSettingsNewIcon sx = {{marginRight: 5}}></PowerSettingsNewIcon>
      </div>
      <div className='texticon'>
       <span className='span1'>Send</span>
       <span className='span2'>Shuttle</span>
       <span className='span3'>End</span>
      </div>
      </>
  )
}

export default CreateUserOptionPage