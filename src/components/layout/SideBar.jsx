import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import { Link } from 'react-router-dom'

const drawerWidth = 240

function ResponsiveDrawer (props) {
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

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default ResponsiveDrawer
