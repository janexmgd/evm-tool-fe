import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // const menuItems = ['Home', 'About', 'Contact'];

  const menuItems = [];

  return (
    <div>
      <AppBar position='static' className='mb-3'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div className='w-50'>
              <Link to='/' className='text-decoration-none'>
                <Typography
                  className='text-white'
                  variant='h6'
                  component='div'
                  sx={{ flexGrow: 1, mr: { md: 2 } }}
                >
                  evm-tool
                </Typography>
              </Link>
            </div>
            <div className='w-50 d-flex justify-content-end '>
              {menuItems.map((text) => (
                <Button
                  key={text}
                  color='inherit'
                  sx={{ display: { xs: 'none', md: 'block' } }}
                >
                  {text}
                </Button>
              ))}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: '50%' },
        }}
      >
        <List>
          {menuItems.map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
