import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  styled,
  Toolbar,
  Typography,
  alpha,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartSharp';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsCount } from '../utils';
import { fetchAllCategories } from '../feature/categories-slice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('section')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiTextField-root': {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.common.white,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.common.white,
  },
}));

const SearchIconWrapper = styled('section')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function SearchBar() {
  const theme = useTheme();
  const products = useSelector((state) => state.products.value);
  const categories = useSelector((state) => state.categories?.value);
  const [seletedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const searchTerm = searchParams.get('searchTerm');
  const category = searchParams.get('category');

  useEffect(() => {
    setSelectedCategory(category ? category : 'all');
  }, [category]);

  if (!categories.length) {
    dispatch(fetchAllCategories());
  }

  function handleCategoryChange(event) {
    const { value } = event.target;
    navigate(
      value === 'all'
        ? '/'
        : `/?category=${value}${searchTerm ? '&searchterm=' + searchTerm : ''}`
    );
  }

  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        seletedCategory === 'all'
          ? `/?searchterm=${searchText}`
          : `/?category=${seletedCategory}&searchterm=${searchText}`
      );
    } else {
      navigate(
        seletedCategory === 'all' ? '/' : `/?category=${seletedCategory}`
      );
    }
  }

  return (
    <Search>
      <Select
        value={seletedCategory}
        onChange={handleCategoryChange}
        size="small"
        sx={{
          textTransform: 'capitalize',
          m: 1,
          '&': {
            '::before': {
              border: 'none',
            },
          },
          '::before, &::after': {
            border: 'none',
          },
          '.MuiSelect-standard': {
            color: 'common.white',
          },
          '.MuiSelect-icon': {
            fill: theme.palette.common.white,
          },
        }}
        variant="standard"
        labelId="selected-category"
        label="selected-category-id"
      >
        <MenuItem
          sx={{
            textTransform: 'capitalize',
          }}
          value="all"
        >
          all
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            sx={{
              textTransform: 'capitalize',
            }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyleAutocomplete
        freeSolo
        id="selected-product"
        value={selectedProduct}
        onChange={(e, value) => {
          handleSearchChange(value?.label);
        }}
        disablePortal
        options={Array.from(
          seletedCategory === 'all'
            ? products
            : products.filter((prod) => prod.category === seletedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}

export default function Header() {
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemsCount(cartItems);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Ecom
        </Typography>
        <SearchBar />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            aria-label="shows cart items count"
            color="inherit"
          >
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
