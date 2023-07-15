import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBox, faGauge, faLayerGroup, faPercent, faSliders, faTrademark, faUsersGear } from '@fortawesome/free-solid-svg-icons';
import ItemSlider from './component/ItemSlider';
import ProFile from './component/profile';
import { AuthContext } from '../../../helpers/AuthContext';
import Swal from 'sweetalert2';
import API from '../../../API';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const { authState } = React.useContext(AuthContext);
    const [permission, setPermission] = React.useState([]);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useNavigate()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleAdmin = () => {
        Swal.fire({
            icon: 'error',
            text: `Bạn không phải QTV`,
            confirmButtonText: 'Đóng'
        })
        history('/')
    }

    React.useEffect(() => {
        API({
            method: 'get',
            url: `admin-permission/permission/${authState.VaiTroId}`,
        }).then((res) => {
            setPermission(res.data.RolePermissions);
            console.log(res.data.RolePermissions);
        })
    }, [authState.VaiTroId])


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ 'span, svg': { fontSize: '16px' }, background: "#4ea0c9" }} >
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon style={{ fontSize: "30px" }} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className='fs-2 text'>
                        ShopSocXanh
                    </Typography>
                    <ProFile />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ fontSize: "30px" }} /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {authState.phanQuyen === 1 && <List >
                    <ItemSlider
                        text={'Thống kê'}
                        icon={
                            <FontAwesomeIcon
                                icon={faGauge} className="account__link--icon"
                            />}
                        link={'/admin/dashboard'}
                    />
                    <ItemSlider
                        text={'Quản lý sản phẩm'}
                        icon={
                            <FontAwesomeIcon
                                icon={faBagShopping} className="account__link--icon"
                            />}
                        link={'/admin/view-product'}
                    />
                    <ItemSlider
                        text={'Quản lý loại sản phẩm'}
                        icon={
                            <FontAwesomeIcon
                                icon={faSliders} className="account__link--icon"
                            />}
                        link={'/admin/view-category'}
                    />
                    <ItemSlider
                        text={'Quản lý khuyến mãi'}
                        icon={
                            <FontAwesomeIcon
                                icon={faPercent} className="account__link--icon"
                            />}
                        link={'/admin/view-promotion'}
                    />
                    <ItemSlider
                        text={'Quản lý thương hiệu'}
                        icon={
                            <FontAwesomeIcon
                                icon={faTrademark} className="account__link--icon"
                            />}
                        link={'/admin/view-trademark'}
                    />
                    <ItemSlider
                        text={'Quản lý đơn hàng'}
                        icon={
                            <FontAwesomeIcon
                                icon={faBox} className="account__link--icon"
                            />}
                        link={'/admin/view-order'}
                    />
                    <ItemSlider
                        text={'Quản lý khách hàng'}
                        icon={
                            <FontAwesomeIcon
                                icon={faUsersGear} className="account__link--icon"
                            />}
                        link={'/admin/view-account'}
                    />
                    <ItemSlider
                        text={'Quản lý nhân viên'}
                        icon={
                            <FontAwesomeIcon
                                icon={faUsersGear} className="account__link--icon"
                            />}
                        link={'/admin/view-staff'}
                    />
                    <ItemSlider
                        text={'Quản lý phân quyền'}
                        icon={
                            <FontAwesomeIcon
                                icon={faLayerGroup} className="account__link--icon"
                            />}
                        link={'/admin/view-role'}
                    />
                </List>}
                {authState.phanQuyen === 0 && handleAdmin()}
                {
                    authState.phanQuyen === 2 ?
                        permission.map((item, index) => {
                            if (item.PhanQuyenId === 1) {
                                return <ItemSlider
                                    text={'Quản lý sản phẩm'}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faBagShopping} className="account__link--icon"
                                        />}
                                    link={'/admin/view-product'}
                                />
                            }
                            else if (item.PhanQuyenId === 2) {
                                return <ItemSlider
                                text={'Quản lý loại sản phẩm'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faSliders} className="account__link--icon"
                                    />}
                                link={'/admin/view-category'}
                            />
                            }
                            else if (item.PhanQuyenId === 3) {
                                return  <ItemSlider
                                text={'Quản lý khuyến mãi'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faPercent} className="account__link--icon"
                                    />}
                                link={'/admin/view-promotion'}
                            />
                            }
                            else if (item.PhanQuyenId === 4) {
                                return  <ItemSlider
                                text={'Quản lý thương hiệu'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faTrademark} className="account__link--icon"
                                    />}
                                link={'/admin/view-trademark'}
                            />
                            }
                            else if (item.PhanQuyenId === 5) {
                                return<ItemSlider
                                text={'Quản lý đơn hàng'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faBox} className="account__link--icon"
                                    />}
                                link={'/admin/view-order'}
                            />
                            }
                            else if (item.PhanQuyenId === 6) {
                                return<ItemSlider
                                text={'Quản lý khách hàng'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faUsersGear} className="account__link--icon"
                                    />}
                                link={'/admin/view-account'}
                            />
                            }
                            else if (item.PhanQuyenId === 7) {
                                return <ItemSlider
                                text={'Quản lý nhân viên'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faUsersGear} className="account__link--icon"
                                    />}
                                link={'/admin/view-staff'}
                            />
                            }
                            else if (item.PhanQuyenId === 8) {
                                return  <ItemSlider
                                text={'Quản lý phân quyền'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faLayerGroup} className="account__link--icon"
                                    />}
                                link={'/admin/view-role'}
                            />
                            }
                        }) : ""

                }
                <Divider />
            </Drawer>
            <Main open={open} sx={{ height: "150%", marginTop: "20px" }} >
                <DrawerHeader />
                <Typography paragraph >
                    <Outlet />
                </Typography>
            </Main>

        </Box>
    );
}