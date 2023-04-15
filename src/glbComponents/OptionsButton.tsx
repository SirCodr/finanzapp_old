import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { log } from 'console'

const OptionsButton = ({ agGridParams, onClick }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  
  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={(e)=>{ setAnchorEl(e.currentTarget) }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClick={()=>{ setAnchorEl(null) }}
      >
        <MenuItem onClick={onClick}>Eliminar</MenuItem>
      </Menu>
    </div>
  )
}
export default OptionsButton
