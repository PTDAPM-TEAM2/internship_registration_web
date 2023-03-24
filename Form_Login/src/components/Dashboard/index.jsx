import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Variables from '../../utils/variables';
import styles from './Dashboard.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ThemeContext } from '@emotion/react';
const drawerWidth = 300;

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



export default function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [time, setTime] = React.useState(new Date());
    const location = useLocation();
    React.useEffect(() => {
        const timer = setInterval(() =>
            setTime(new Date())
            , 1000);
        return () => clearInterval(timer);
    }, [])

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12) && hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = 1+date.getMonth();
        const year = date.getFullYear();
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    const context = React.useContext(ThemeContext);


    const handleItemClick = (value) => {
        context.updateButton(value);
    }



    // const [children, setChildren] = React.useState([]);
    // const handleMove = () => {
    //     const newChildren = [<QLDA key={children.length} updateDirect={updateDirect} />];
    //     setChildren(newChildren);
    //     setDirect(true);
    // };
    // const handleMove1 = () => {
    //     const newChildren = [<QLSV key={children.length} />];
    //     setChildren(newChildren);
    //     setDirect(true);
    // };
    // const handleMove2 = () => {
    //     const newChildren = [<QLGV key={children.length} />];
    //     setChildren(newChildren);
    //     setDirect(true);
    // };

    // const updateDirect = (newValue) => {
    //     setDirect(newValue);
    //     const newChildren = [<DSDA key={children.length} />];
    //     setChildrenOfChild(newChildren);
    // }

    const navigate = useNavigate();
    function toComponent (path) {
        navigate(path);
    }


    return (
        <div className={styles.contain}>
            <Main open={open}>
                {(
                    // admin role
                    Variables.userRole === 'admin' ?
                        (location.pathname === '/quan-ly-do-an-sinh-vien' ||
                            location.pathname === '/quan-ly-do-an' ||
                            location.pathname === '/quan-ly-giao-vien-da' ||
                            location.pathname === '/quan-ly-sinh-vien-da') :
                        // students role
                        (location.pathname === '/sinh-vien-do-an')
                ) &&
                    <div style={{ width: '100%' }}>
                        <div className={styles.db}>
                            <div className={styles.dashBoard} style={{ backgroundColor: '#00b0f3' }} onClick = {
                                    () => {
                                        if(Variables.userRole === "admin"){

                                        }else{

                                        }
                                    }
                                }>
                                <div className={styles.infoTag}>
                                    <p>{Variables.userRole === 'admin' ? "Đồ án" : Variables.userRole === 'teachers' ? "Thông Tin Cá Nhân" : "Thông Tin Cá Nhân"}</p>
                                </div>
                                <div className={styles.bgDB}>
                                    <MenuBookIcon style={{ fontSize: 130 }} />
                                </div>
                            </div>
                            <div className={styles.dashBoard} style={{ backgroundColor: '#009259' }}>
                                <div className={styles.infoTag}>
                                    <p>{Variables.userRole === 'admin' ? "Sinh viên" : Variables.userRole === 'teachers' ? "Xác Nhận Yêu Cầu Sinh Viên" : "Đăng ký đồ án "}</p>
                                </div>
                                <div className={styles.bgDB1}>
                                    <PeopleIcon style={{ fontSize: 130 }} />
                                </div>
                            </div>
                            <div className={styles.dashBoard} style={{ backgroundColor: '#fe9c0a' }} >
                                <div className={styles.infoTag}>
                                    <p>{Variables.userRole === 'admin' ? "Giáo viên" : Variables.userRole === 'teachers' ? "Danh Sách Sinh Viên" : "Nộp đề cương"}</p>
                                </div>
                                <div className={styles.bgDB2}>
                                    <PeopleIcon style={{ fontSize: 130 }} />
                                </div>
                            </div>
                            <div>
                                {
                                    Variables.userRole === 'admin' ? <div className={styles.dashBoard} style={{ backgroundColor: '#e95835' }} >
                                        <div className={styles.infoTime}>
                                            <div className={styles.time}>{formatTime(time)}</div>
                                            <div className={styles.date}>{formatDate(time)}</div>
                                        </div>
                                        <div className={styles.bgDB3}>
                                            <AccessTimeIcon style={{ fontSize: 120 }} />
                                        </div>
                                    </div> :Variables.userRole === 'teachers'?
                                        <div className={styles.dashBoard} style={{ backgroundColor: '#fe9c0a' }} >
                                            <div className={styles.infoTag}>
                                                <p>Danh Sách Đồ Án</p>
                                            </div>
                                            <div className={styles.bgDB2}>
                                                <PeopleIcon style={{ fontSize: 130 }} />
                                            </div>
                                        </div>:
                                        <div className={styles.dashBoard} style={{ backgroundColor: '#e95835' }} >
                                            <div className={styles.infoTag}>
                                                <p>Thông tin đồ án</p>
                                            </div>
                                            <div className={styles.bgDB3}>
                                                <PeopleIcon style={{ fontSize: 130 }} />
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                        <div style={{ paddingTop: 40 }}>
                            {/* {children.map((child) => child)} */}
                            {/* <Outlet /> */}

                        </div>
                    </div>
                }
                {(
                    // admin role
                    Variables.userRole === 'admin' ?
                        (location.pathname === '/quan-ly-sinh-vien-thuc-tap' ||
                            location.pathname === '/quan-ly-cong-ty' ||
                            location.pathname === '/quan-ly-giao-vien-tt' ||
                            location.pathname === '/quan-ly-sinh-vien-tt')
                        // teachers role
                        : Variables.userRole === 'teachers' ?
                            (location.pathname === '/trang-chu-giang-vien') :
                            // students role
                            (location.pathname === '/sinh-vien-thuc-tap')
                ) &&
                    <div style={{ width: '100%' }}>
                        <div className={styles.db}>
                            <div className={styles.dashBoard} style={{ backgroundColor: '#00b0f3' }}  onClick={() => {
                                    if(Variables.userRole === 'admin'){
                                        toComponent("/quan-ly-sinh-vien-thuc-tap")
                                    }else if(Variables.userRole === 'teachers'){
                                        toComponent("/trang-chu-giang-vien")
                                    }else{
                                        toComponent("/sinh-vien-thuc-tap")
                                    }
                                }}>
                                <div className={styles.infoTag}>
                                    <p>{Variables.userRole === "admin" ? "Thực tập" : Variables.userRole === "teachers" ? "Thông Tin Cá Nhân" : "Thông Tin Cá Nhân"}</p>
                                </div>
                                <div className={styles.bgDB}>
                                    <MenuBookIcon style={{ fontSize: 130 }} />
                                </div>
                            </div>
                            <div className={styles.dashBoard} style={{ backgroundColor: '#009259' }} onClick = {
                                    () => {
                                        if(Variables.userRole === "admin"){

                                        }else if(Variables.userRole === "teachers"){
                                            navigate('/danh-sach-sinh-vien-yeu-cau')
                                        }else{

                                        }
                                    }
                                }>
                                <div className={styles.infoTag}>
                                    <p>{Variables.userRole === "admin" ? "Sinh viên" : Variables.userRole === "teachers" ? "Xác Nhận Yêu Cầu Sinh Viên" : "Đăng ký thực tập"}</p>
                                </div>
                                <div className={styles.bgDB1}>
                                    <PeopleIcon style={{ fontSize: 130 }} />
                                </div>
                            </div>
                            <div className={styles.dashBoard} style={{ backgroundColor: '#fe9c0a' }} onClick = {
                                    () => {
                                        if(Variables.userRole === "admin"){

                                        }else if(Variables.userRole === "teachers"){
                                            navigate('/danh-sach-sinh-vien')
                                        }else{

                                        }
                                    }
                                }>
                                <div className={styles.infoTag}>
                                    <p>{Variables.userRole === "admin" ? "Giáo viên" : Variables.userRole === "teachers" ? "Danh sách sinh viên" : "Thông tin thực tập"}</p>
                                </div>
                                <div className={styles.bgDB2}>
                                    <PeopleIcon style={{ fontSize: 130 }} />
                                </div>
                            </div>
                            {
                                // admin role
                                Variables.userRole === "admin" ?
                                    <div className={styles.dashBoard} style={{ backgroundColor: '#e95835' }} >
                                        <div className={styles.infoTime}>
                                            <div className={styles.time}>{formatTime(time)}</div>
                                            <div className={styles.date}>{formatDate(time)}</div>
                                        </div>
                                        <div className={styles.bgDB3}>
                                            <AccessTimeIcon style={{ fontSize: 130 }} />
                                        </div>
                                    </div> :
                                    // teacher role
                                    Variables.userRole === "teachers" ?
                                        <div className={styles.dashBoard} style={{ backgroundColor: '#E85835' }}  onClick = {
                                            () => {
                                                navigate('/danh-sach-do-an-sinh-vien')
                                            }
                                        }>
                                            <div className={styles.infoTag}>
                                                <p>Danh sách đồ án</p>
                                            </div>
                                            <div className={styles.bgDB2}>
                                                <PeopleIcon style={{ fontSize: 130 }} />
                                            </div>
                                        </div> :
                                        // students role
                                        <div></div>
                            }
                        </div>
                        <div style={{ paddingTop: 40 }}>
                            {/* {children.map((child) => child)} */}
                            {/* <Outlet /> */}
                        </div>
                    </div>
                }
            </Main>
        </div >
    );
}