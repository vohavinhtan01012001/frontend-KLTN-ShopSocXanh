import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BackgroundLetterAvatars from '../../../frontend/component/Avatar';
import { AuthContext } from '../../../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProFile() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { authState } = React.useContext(AuthContext);
    const history = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = (event) => {
        localStorage.removeItem('accessToken');
        history("/");
        window.location.reload();
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {
                    authState.hoTen ? <BackgroundLetterAvatars name={authState.hoTen} /> : ""
                }
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem className='fs-4 text' onClick={handleClose}>{authState.hoTen ? authState.hoTen : ""}</MenuItem>
                <MenuItem className='fs-4 text' onClick={() => history('/admin/profile')}>Thông tin của bạn</MenuItem>
                <MenuItem className='fs-4 text' onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
        </div>
    );
}