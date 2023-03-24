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
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import Home from '@mui/icons-material/Home';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Variables from '../../utils/variables';
import { bool } from 'yup';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { ThemeContext } from '../Theme/Theme.jsx';
import userApi from '../../api/authApi';
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
    const check = Variables.userRole
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [Width, setWidth] = React.useState(drawerWidth);
    const location = useLocation();
    const context = React.useContext(ThemeContext);
    const token = localStorage.getItem('token');

    // const [activeButton, setActiveButton] = React.useState('button1');

    // const [pathname, setPathname] = React.useState("/quan-ly-do-an");

    // React.useEffect(() => {
    //     if (location.pathname) {
    //         return setPathname(location.pathname);
    //     }
    // }, [location.pathname])
    const handleItemClick = (value) => {
        context.updateButton(value);
    }



    // const handleItemClick = () => {
    //     console.log(active);
    // }

    const handleDrawerOpen = () => {
        setOpen(true);
        setWidth(300);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setWidth(0);
    };

    const navigate = useNavigate();
    function toComponent (path) {
        navigate(path);
    }
    
    const handleLogout = () => {
        navigate('/dang-nhap');
        context.updateAuth(false);
    }

    const {id} = useParams()

    const [data, setData] = React.useState([]);
        // Use useEffect hook to fetch data when the component mounts
    React.useEffect(() => {

        const currentUser = async () => {
            try{
                const response = await userApi.getInfo(token);
                setData(response);
            }catch(err){
                console.error(err);
            }
        }
        currentUser();
    }, []); // Pass an empty dependency array to run only once

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
                                        <div style={{ width: "35px", height: "35px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            {/* <PersonIcon ></PersonIcon>
                                            <ExpandMoreIcon /> */}
                                            <PowerSettingsNewIcon onClick={handleLogout} />

                                        </div>
                                    </IconButton>
                                    {/* <Popover
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
                                                <ListItemButton onClick={() => window.location.href = "/dang-nhap"} ref={nav}>
                                                    <ListItemIcon>
                                                        <LogoutIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Đăng xuất' />
                                                </ListItemButton>
                                            </ListItem>
                                        </Typography>
                                    </Popover> */}
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
                        src={data.urlImg}
                        sx={{
                            width: 150,
                            height: 150,
                            marginTop: 10,
                        }}
                    />
                    <h1 style={{ fontSize: '40px', paddingTop: '20px' }}>{
                        data.fullName
                    }</h1>

                </Stack>


                {
                    // admin
                    (check === 'admin' ?
                        (location.pathname === '/quan-ly-do-an-sinh-vien' ||
                            location.pathname === '/quan-ly-do-an' ||
                            location.pathname === '/quan-ly-giao-vien-da' ||
                            location.pathname === '/quan-ly-sinh-vien-da' ||
                            location.pathname === '/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da' ||
                            location.pathname === '/quan-ly-giao-vien-da/danh-sach-giao-vien-da' ||
                            location.pathname === '/quan-ly-do-an/xet-duyet-do-an' ||
                            location.pathname === '/chi-tiet-do-an' ||
                            location.pathname === '/them-sinh-vien-da' ||
                            location.pathname === '/them-giang-vien-da' ||
                            location.pathname === `/chi-tiet-sinh-vien-da/${id}` ||
                            location.pathname === `/chi-tiet-giang-vien/${id}` ||
                            location.pathname === '/quan-ly-do-an/danh-sach-do-an' ||
                            location.pathname === '/quan-ly-sinh-vien-da/du-lieu-sinh-vien-da' ||
                            location.pathname === '/quan-ly-giao-vien-da/du-lieu-giao-vien-da' ||
                            location.pathname === '/quan-ly-do-an/danh-sach-do-an/nhap-diem-sv')
                        // teachers role
                        : check === "teachers" ? (
                            location.pathname === '/trang-chu-giang-vien' ||
                            location.pathname === '/thong-tin-ca-nhan'
                        ) :
                            // students role
                            (location.pathname === '/sinh-vien-do-an' ||
                                location.pathname === '/sinh-vien-do-an/thong-tin-sinh-vien' || 
                                location.pathname === '/sinh-vien-do-an/thong-tin-sinh-vien/thay-doi-mat-khau' ||
                                location.pathname === '/sinh-vien-do-an/dang-ky-do-an' ||
                                location.pathname === '/sinh-vien-do-an/nop-de-cuong' ||
                                location.pathname === '/sinh-vien-do-an/thong-tin-do-an'
                            ))
                    &&
                    <List>
                            <ListItem disablePadding>
                                <Link
                                    to={check === 'admin' ? "/quan-ly-do-an-sinh-vien" : check === "teachers" ? "/trang-chu-giang-vien" : "/sinh-vien-do-an"}
                                    style={{ width: '100%', textDecoration: 'none' }}
                                    onClick={() => {
                                        handleItemClick('trang-chu')
                                    }}
                                    className={context.activeButton === 'trang-chu' ? styles.active : {}}
                                >    <ListItemButton style={{ color: 'white', borderTop: '1px solid white' }} >
                                        <ListItemIcon>
                                            <Home className={styles.icon} />
                                        </ListItemIcon>
                                        <ListItemText primary='Trang chủ' />
                                    </ListItemButton>
                                </Link >
                            </ListItem>
                                <ListItem disablePadding>
                                    <Link
                                        to={check === 'admin' ? "/quan-ly-do-an" : check === "teachers" ? "/thong-tin-ca-nhan" : "/sinh-vien-do-an/thong-tin-sinh-vien"}
                                        style={{ width: '100%', textDecoration: 'none' }}
                                        onClick={() => {
                                            handleItemClick('QLDA')
                                        }}
                                        className={context.activeButton === 'QLDA' ? styles.active : {}}
                                    >   <ListItemButton style={{ color: 'white', borderTop: '1px solid white' }}  >
                                            <ListItemIcon>
                                                <MenuBookIcon className={styles.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary={check === 'admin' ? 'Quản lý đồ án' : 'Thông tin cá nhân'} />
                                        </ListItemButton>
                                    </Link >
                                </ListItem>
                        {
                            check !== 'teachers' ?
                                <ListItem disablePadding>
                                    <Link
                                        to={check === 'admin' ? "/quan-ly-sinh-vien-da" : '/sinh-vien-do-an/dang-ky-do-an'}
                                        style={{ width: '100%', textDecoration: 'none' }}
                                        onClick={() => {
                                            handleItemClick('QLSV')
                                        }}
                                        className={context.activeButton === 'QLSV' ? styles.active : {}}
                                    >   <ListItemButton style={{ color: 'white', borderTop: '1px solid white' }} >
                                            <ListItemIcon>
                                                <GroupRoundedIcon className={styles.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary={check === 'admin' ? 'Quản lý sinh viên' : check === 'teachers' ?'Xác nhận yêu cầu sinh viên':'Đăng ký đồ án'} />
                                        </ListItemButton>
                                    </Link>
                                </ListItem> : (null)
                        }
                        {
                            check !== 'teachers' ?
                                <ListItem disablePadding>
                                    <Link
                                        to={check === 'admin' ? "/quan-ly-giao-vien-da" : '/sinh-vien-do-an/nop-de-cuong'}
                                        style={{ width: '100%', textDecoration: 'none' }}
                                        onClick={() => {
                                            handleItemClick('QLGV')
                                        }}
                                        className={context.activeButton === 'QLGV' ? styles.active : {}}
                                    >   <ListItemButton style={{ color: 'white', borderTop: '1px solid white', }}  >
                                            <ListItemIcon>
                                                <GroupRoundedIcon className={styles.icon} />
                                            </ListItemIcon>
                                            <ListItemText primary={check==='admin' ? 'Quản lý giáo viên' : 'Nộp đề cương'} />
                                        </ListItemButton>
                                    </Link >
                                </ListItem> : (null)
                        }
                        {
                            check === 'students' ?
                            <ListItem disablePadding>
                            <Link
                                to={'/sinh-vien-do-an/thong-tin-do-an'}
                                style={{ width: '100%', textDecoration: 'none' }}
                                onClick={() => {
                                    handleItemClick('TTDA')
                                }}
                                className={context.activeButton === 'TTDA' ? styles.active : {}}
                            >   <ListItemButton style={{ color: 'white', borderTop: '1px solid white', borderBottom: '1px solid white' }}  >
                                    <ListItemIcon>
                                        <GroupRoundedIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary={'Thông tin đồ án'} />
                                </ListItemButton>
                            </Link >
                        </ListItem> : (null)
                        }
                    </List>
                }


                {(check === 'admin' ?
                    // admin role
                    (
                        location.pathname === '/quan-ly-sinh-vien-thuc-tap' ||
                        location.pathname === '/quan-ly-cong-ty' ||
                        location.pathname === '/quan-ly-sinh-vien-tt' ||
                        location.pathname === '/danh-sach-cong-ty' ||
                        location.pathname === '/danh-sach-sinh-vien-tt' ||
                        location.pathname === '/quan-ly-cong-ty/du-lieu-cong-ty' ||
                        location.pathname === '/quan-ly-cong-ty/danh-sach-cong-ty' ||
                        location.pathname === `/chi-tiet-cong-ty/${id}` ||
                        location.pathname === '/them-sinh-vien-tt' ||
                        location.pathname === '/quan-ly-sinh-vien-tt/du-lieu-sinh-vien-tt' ||
                        location.pathname === '/quan-ly-sinh-vien-tt/danh-sach-sinh-vien-tt'||
                        location.pathname === `/chi-tiet-sinh-vien-tt/${id}`
                        
                    ) :
                    // teachers role
                    check === "teachers" ?
                        (location.pathname === '/trang-chu-giang-vien' ||
                            location.pathname === '/thong-tin-ca-nhan' ||
                            location.pathname === '/danh-sach-sinh-vien-yeu-cau' ||
                            location.pathname === '/danh-sach-sinh-vien' ||
                            location.pathname === '/danh-sach-do-an-sinh-vien' ||
                            location.pathname === '/danh-sach-sinh-vien-yeu-cau/chi-tiet-yeu-cau' ||
                            location.pathname === '/danh-sach-sinh-vien/chi-tiet-sinh-vien' ||
                            location.pathname === '/danh-sach-sinh-vien/chi-tiet-sinh-vien' ||
                            location.pathname === '/danh-sach-do-an-sinh-vien/danh-sach-do-an-chi-tiet' ||
                            location.pathname === '/danh-sach-do-an-sinh-vien/danh-sach-do-an-chi-tiet/danh-gia-tien-trinh' ||
                            location.pathname === '/thong-tin-ca-nhan/doi-mat-khau'
                        ) :
                        // students role
                        (location.pathname === '/sinh-vien-thuc-tap' ||
                            location.pathname === '/sinh-vien-thuc-tap/thong-tin-sinh-vien' ||
                            location.pathname === '/sinh-vien-thuc-tap/thong-tin-sinh-vien/thay-doi-mat-khau' ||
                            location.pathname === '/sinh-vien-thuc-tap/dang-ky-thuc-tap' ||
                            location.pathname === '/sinh-vien-thuc-tap/thong-tin-thuc-tap'
                        ))
                    &&
                    <List>
                        <ListItem disablePadding>
                            <div
                                style={{ width: '100%', textDecoration: 'none' }}
                                onClick={() => {
                                    handleItemClick('trang-chu')
                                    if(check === 'admin'){
                                        toComponent("/quan-ly-sinh-vien-thuc-tap")
                                    }else if(check === 'teachers'){
                                        toComponent("/trang-chu-giang-vien")
                                    }else{
                                        toComponent("/sinh-vien-thuc-tap")
                                    }
                                }}
                                className={context.activeButton === 'trang-chu' ? styles.active : {}}
                            >
                                <ListItemButton style={{ color: 'white', borderTop: '1px solid white' }} >
                                    <ListItemIcon>
                                        <Home className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Trang chủ' />
                                </ListItemButton>
                            </div >
                        </ListItem>
                        <ListItem disablePadding>
                            <div
                                style={{ width: '100%', textDecoration: 'none' }}
                                onClick={() => {
                                    handleItemClick('QLCT')
                                    if(check === 'admin'){
                                        toComponent("/quan-ly-cong-ty")
                                    }else if(check === 'teachers'){
                                        toComponent("/thong-tin-ca-nhan")
                                    }else{
                                        toComponent("/sinh-vien-thuc-tap/thong-tin-sinh-vien")
                                    }
                                }}
                                className={context.activeButton === 'QLCT' ? styles.active : {}}
                            >
                                <ListItemButton style={{ color: 'white', borderTop: '1px solid white' }} >
                                    <ListItemIcon>
                                        <MenuBookIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary={check === 'admin' ? 'Quản lý công ty' : 'Thông tin cá nhân'} />
                                </ListItemButton>
                            </div >
                        </ListItem>
                        <ListItem disablePadding>
                            <div
                                style={{ width: '100%', textDecoration: 'none', borderBottom: '1px solid white'  }}
                                onClick={() => {
                                    handleItemClick('QLSV')
                                    if(check === 'admin'){
                                        toComponent("/quan-ly-sinh-vien-tt")
                                    }else if(check === 'teachers'){
                                        toComponent("/danh-sach-sinh-vien-yeu-cau")
                                    }else{
                                        toComponent("/sinh-vien-thuc-tap/dang-ky-thuc-tap")
                                    }
                                }}
                                className={context.activeButton === 'QLSV' ? styles.active : {}}
                            >
                                <ListItemButton style={{ color: 'white', borderTop: '1px solid white' }} >
                                    <ListItemIcon>
                                        <GroupRoundedIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary={check === 'admin' ? 'Quản lý sinh viên' : check === 'teachers' ? 'Xác Nhận Yêu Cầu Sinh Viên' : 'Đăng ký thực tập'} />
                                </ListItemButton>
                            </div>
                        </ListItem>
                            <ListItem disablePadding>
                                <div
                                    style={{ width: '100%', textDecoration: 'none' }}
                                    onClick={() => {
                                        handleItemClick('QLGV')
                                        if(check === 'teachers'){
                                            toComponent("/danh-sach-sinh-vien")
                                        } else if(check === 'studeents'){
                                            toComponent("/sinh-vien-thuc-tap/thong-tin-thuc-tap")
                                        }
                                        
                                    }}
                                    className={context.activeButton === 'QLGV' ? styles.active : {}}
                                >
                                    <ListItemButton style={{ color: 'white', borderBottom: '1px solid white' }} >
                                        <ListItemIcon>
                                            <GroupRoundedIcon className={styles.icon} />
                                        </ListItemIcon>
                                        <ListItemText primary={check === 'admin' ? 'Quản lý giáo viên' : check === 'teachers' ? 'Danh Sách Sinh Viên' : 'Thông tin thực tập'} />
                                    </ListItemButton>
                                </div >
                            </ListItem>
                        {check === 'teachers' ? <ListItem disablePadding>
                            <div
                                style={{ width: '100%', textDecoration: 'none' }}
                                onClick={() => {
                                    handleItemClick('QLDA')
                                    toComponent("/danh-sach-do-an-sinh-vien")
                                }}
                                className={context.activeButton === 'QLDA' ? styles.active : {}}
                            >
                                <ListItemButton style={{ color: 'white', borderBottom: '1px solid white' }} >
                                    <ListItemIcon>
                                        <GroupRoundedIcon className={styles.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Danh Sách Đồ Án' />
                                </ListItemButton>
                            </div >
                        </ListItem>
                            : ''
                        }
                    </List>
                }
            </Drawer>
        </Box>
    )
}
export default Sidebar