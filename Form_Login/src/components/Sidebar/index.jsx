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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';

const drawerWidth = 300;
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



function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [Width, setWidth] = React.useState(drawerWidth);
    const location = useLocation();
    const handleDrawerOpen = () => {
        setOpen(true);
        setWidth(300);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setWidth(0);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}
                sx={{
                    backgroundColor: 'white'
                }}>
                <Toolbar>
                    <IconButton
                        color="#222943"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap component="div"
                        color="#222943"
                        sx={{
                            position: 'absolute',
                            right: 30,
                        }}
                    >
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                                <div>
                                    <IconButton variant="contained" {...bindTrigger(popupState)}>
                                        <div style={{ width: "35px", height: "35px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <PersonIcon ></PersonIcon>
                                            <ExpandMoreIcon />
                                        </div>
                                    </IconButton>
                                    <Popover
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <Typography sx={{ p: 1 }}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <AccountCircleIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Thông tin tài khoản' />
                                                </ListItemButton>
                                            </ListItem>
                                        </Typography>
                                        <Typography sx={{ p: 1 }}>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => window.location.href = "/dang-nhap"}>
                                                    <ListItemIcon>
                                                        <LogoutIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Đăng xuất' />
                                                </ListItemButton>
                                            </ListItem>
                                        </Typography>
                                    </Popover>
                                </div>
                            )}
                        </PopupState>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: Width,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#222943',
                        color: 'white'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider style={{ backgroundColor: 'white' }} />
                <Stack
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        sx={{
                            width: 150,
                            height: 150,
                            marginTop: 10,
                        }}
                    />
                    <h1>ADMIN</h1>
                    <List>
                        <IconButton>
                            <AccountCircleIcon className={styles.icon} />
                        </IconButton>
                        <IconButton onClick={() => window.location.href = "/dang-nhap"}>
                            <LogoutIcon className={styles.icon} />
                        </IconButton>
                    </List>
                </Stack>

                {(location.pathname === '/quan-ly-do-an-sinh-vien' ||
                    location.pathname === '/quan-ly-do-an' ||
                    location.pathname === '/quan-ly-giao-vien-da' ||
                    location.pathname === '/quan-ly-sinh-vien-da' ||
                    location.pathname === '/danh-sach-do-an' ||
                    location.pathname === '/danh-sach-sinh-vien-da' ||
                    location.pathname === '/danh-sach-giao-vien-da'
                ) &&
                    <List>
                        <ListItem disablePadding>
                            <Link to="/quan-ly-do-an" style={{ width: '100%', textDecoration: 'none' }}>
                                <ListItemButton style={{ color: 'white' }}>
                                    <ListItemIcon>
                                        <HomeIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Quản lý đồ án' />
                                </ListItemButton>
                            </Link >
                        </ListItem>
                        <ListItem disablePadding>
                            <Link to="/quan-ly-sinh-vien-da" style={{ width: '100%', textDecoration: 'none' }}>
                                <ListItemButton style={{ color: 'white' }}>
                                    <ListItemIcon>
                                        <HomeIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Quản lý sinh viên' />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link to="/quan-ly-giao-vien-da" style={{ width: '100%', textDecoration: 'none' }}>
                                <ListItemButton style={{ color: 'white' }}>
                                    <ListItemIcon>
                                        <HomeIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Quản lý giáo viên' />
                                </ListItemButton>
                            </Link >
                        </ListItem>

                    </List>
                }


                {(location.pathname === '/quan-ly-sinh-vien-thuc-tap' ||
                    location.pathname === '/quan-ly-cong-ty' ||
                    location.pathname === '/quan-ly-giao-vien-tt' ||
                    location.pathname === '/quan-ly-sinh-vien-tt' ||
                    location.pathname === '/danh-sach-cong-ty' ||
                    location.pathname === '/danh-sach-sinh-vien-tt' ||
                    location.pathname === '/danh-sach-giao-vien-tt')
                    &&
                    <List>
                        <ListItem disablePadding>
                            <Link to="/quan-ly-cong-ty" style={{ width: '100%', textDecoration: 'none' }}>
                                <ListItemButton style={{ color: 'white' }}>
                                    <ListItemIcon>
                                        <HomeIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Quản lý công ty' />
                                </ListItemButton>
                            </Link >
                        </ListItem>
                        <ListItem disablePadding>
                            <Link to="/quan-ly-sinh-vien-tt" style={{ width: '100%', textDecoration: 'none' }}>
                                <ListItemButton style={{ color: 'white' }}>
                                    <ListItemIcon>
                                        <HomeIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Quản lý sinh viên' />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link to="/quan-ly-giao-vien-tt" style={{ width: '100%', textDecoration: 'none' }}>
                                <ListItemButton style={{ color: 'white' }}>
                                    <ListItemIcon>
                                        <HomeIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Quản lý giáo viên' />
                                </ListItemButton>
                            </Link >
                        </ListItem>
                    </List>
                }
            </Drawer>
        </Box>
    )
}

export default Sidebar