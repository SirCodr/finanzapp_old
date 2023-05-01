import { useState, useCallback } from 'react'
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
import { Accordion, Menu } from 'semantic-ui-react'

const drawerWidth = 240

function ResponsiveDrawer(props) {
  const routeItems = [
    {
      path: 'inicio'
    },
    {
      path: 'incomes',
      title: 'ingresos',
      children: [
        {
          path: 'all',
          title: 'Todos'
        },
        {
          path: 'categories',
          title: 'Categorias'
        }
      ]
    },
    {
      path: 'expenditures',
      title: 'gastos'
    },
    {
      path: 'budget',
      title: 'presupuesto'
    },
    {
      path: 'calendar',
      title: 'Calendario'
    }
  ]

  const Item = ({ title, path, children }) => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const toggleAccordion = useCallback(() => {
      setOpen(!isOpen)
    }, [isOpen])

    if (!children || !children.length) {
      return (
        <Link to={path} className='w-full'>
          <ListItemText
            primary={title ?? path}
            className='capitalize'
          ></ListItemText>
        </Link>
      )
    }

    return (
      <Accordion className='w-full'>
        <Accordion.Title active={isOpen} index={0} onClick={toggleAccordion}>
          {title}
        </Accordion.Title>
        <Accordion.Content active={isOpen}>
          {children.map((child) => (
            <Link to={`${path}/${child.path}`} className='w-full'>
              <ListItemText
                primary={child.title ?? child.path}
                className='capitalize'
              ></ListItemText>
            </Link>
          ))}
        </Accordion.Content>
      </Accordion>
    )
  }

  const drawer = routeItems.map((routeItem, index) => {
    const { path, title, children } = routeItem
    return (
      <ListItem>
        <ListItemButton>
          <Item title={title} path={path} children={children} />
        </ListItemButton>
      </ListItem>
    )
  })

  const d = (
    <div>
      <List>
        {routeItems.map((routeItem, index) => {
          const { path, title, children } = routeItem
          return (
            <Link to={path} key={index}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <Item title={title} path={path} children={children} />
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
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          <List>{drawer}</List>
        </Drawer>
      </Box>
    </Box>
  )
}

export default ResponsiveDrawer
