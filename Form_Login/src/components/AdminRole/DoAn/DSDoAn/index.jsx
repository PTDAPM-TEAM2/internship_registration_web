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

function createData(STT, DoAn, SinhVien, GiaoVien, Ngay) {
    return { STT, DoAn, SinhVien, GiaoVien, Ngay };
}

const rows = [
    createData(1, 'Quản lý du học sinh Việt Nam', 'Nguyễn Đức Tâm', 'Cù Việt Dũng', '2023/03/08'),
];
function DSDA() {
    const context = useContext(ThemeContext);
    const navigate = useNavigate();
    function handleGoClick() {
        navigate('/quan-ly-do-an/danh-sach-do-an/nhap-diem-sv');
    }

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
                                    {rows.map((row) => {
                                        return (
                                            <TableRow key={row.STT} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }}>
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} sx={{ textAlign: 'center' }}>{row[column.id]}</TableCell>
                                                ))}
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