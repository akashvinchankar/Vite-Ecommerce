import React from 'react';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartSharp';

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Ecom
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            aria-label="shows cart items count"
            color="inherit"
          >
            <Badge badgeContent={1} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
