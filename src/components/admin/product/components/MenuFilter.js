import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
export default function MenuFilter({ setProductLength, title, menu, setFilter, value }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilter = (e) => {
        setFilter([value, e.target.value]);
        setProductLength(null);
    }


    return (
        <>
            <span>
                <span style={{ fontWeight: "bold", paddingLeft: "20px" }}>{title}</span>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <div>
                        <FilterAltIcon
                            className='filterIcon'
                            style={{ fontSize: "30px" }}
                        />
                    </div>
                </Button>
            </span>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    menu.map((item, index) => {
                        return (
                            <MenuItem onClick={handleFilter} value={item.id} style={{ fontSize: "16px" }} key={index}>{item.ten}</MenuItem>
                        )
                    })
                }
            </Menu>
        </>
    );
}