import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';

const Option = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'title',
})(({ title }) => ({
  fontSize: 12,
  ...(title && {
    fontWeight: 'bold',
    fontSize: 18,
    cursor:'default',
    '&.MuiMenuItem-root': {
      '&:hover': {
        backgroundColor:'white'
      }
    }
  }),
}));

const ITEM_HEIGHT = 48;
const MenuPoint = ({options}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '24ch',
          },
        }}
      >
        {options.map((option) => (
          <Option 
            key={option.value} 
            onClick={() => {
              option.action(option.name);
              handleClose();
            }}
            title={option.title}
          >
            {option.value}
          </Option>
        ))}
      </Menu>
    </div>
  );
}
export default MenuPoint;