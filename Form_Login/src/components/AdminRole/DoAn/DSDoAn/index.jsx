import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import styles from './DSDoAn.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import prjApi from "../../../../api/projectApi";
const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'DoAn',
        label: 'Tên đồ án',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'SinhVien',
        label: 'Tên sinh viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'GiaoVien',
        label: 'Tên giáo viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Ngay',
        label: 'Ngày',
        minWidth: 170,
        align: 'center',
    },
];
const body = {
    'isAccept': 2,
    'lecturerId': null
}
function DSDA() {
    const context = useContext(ThemeContext);
    const navigate = useNavigate();
    function handleGoClick() {
        navigate('/quan-ly-do-an/danh-sach-do-an/nhap-diem-sv');
    }

    const [projects, setProject] = React.useState([]);
    const token = localStorage.getItem('token');
    React.useEffect(() => {
        const getAllDoAn = async () => {
            try {
                const response = await prjApi.getAllDa(body, token);
                console.log(response);
                setProject(response);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllDoAn();
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.contain}>
                <div className={styles.btnND}>
                    <Button variant="contained" onClick={handleGoClick}>Nhập điểm</Button>
                </div>
                <div className={styles.direct}>
                    <p>Danh sách đồ án</p>
                </div>
                <div className={styles.table}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 480 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects.map((project, index) => {
                                        const dateObj = new Date(project.submitDay);
                                        const options = {  month: 'numeric',day: 'numeric', year: 'numeric'  };
                                        const dateString = dateObj.toLocaleDateString('en-US', options);
                                        return (
                                            <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{project.nameGraduationThesis}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{project.student.fullName}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{project.lecturer.fullName}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{dateString}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div >

    )
}
export default DSDA;