import React from 'react'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const drawerWidth = 240

function ToggleSideBar (props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const routeItems = [
    {
      path: 'inicio'
    },
    {
      path: 'incomes',
      showName: 'Ingresos'
    },
    {
      path: 'expenditures',
      showName: 'gastos'
    },
    {
      path: 'budget',
      showName: 'presupuesto'
    }
  ]

  const drawer = (
    <div>
      <List>
        {routeItems.map((routeItem, index) => {
          const { path, showName } = routeItem
          return (
            <Link to={path} key={index}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={showName ?? path} className='capitalize' />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default ToggleSideBar
