import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import styles from './DSSinhVien.module.css';
import { Link } from 'react-router-dom';
import Sidebar from "../../Sidebar/index.jsx";
import { useContext } from 'react';
import { ThemeContext } from '../../Theme/Theme.jsx';

const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'Hoten',
        label: 'Họ tên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Ma',
        label: 'Mã sinh viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Khoa',
        label: 'Khoa',
        minWidth: 170,
        align: 'center',
    }
];

function createData(STT, Hoten, Ma, Khoa) {
    return { STT, Hoten, Ma, Khoa };
}

const rows = [
    createData(1, 'Nguyễn Đức Tâm', '2051060693', 'Công nghệ thông tin'),
    createData(2, 'Nguyễn Đức Tâm', '2051060693', 'Công nghệ thông tin'),
    createData(3, 'Nguyễn Đức Tâm', '2051060693', 'Công nghệ thông tin'),
];
function DSDA() {
    const context = useContext(ThemeContext);
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.contain}>
                <div className={styles.header}>
                    <div className={styles.direct}>
                        <Link to='/quan-ly-sinh-vien-da'  className={styles.link}>
                            Quản lý sinh viên
                        </Link>
                        <p>{'>'} Danh sách sinh viên</p>
                    </div>
                    {/* <div className={styles.search}>
                            <input type="text" placeholder="Search" />
                            <SearchIcon />
                        </div> */}
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
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.STT} >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align} >
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
                <Link to='/quan-ly-sinh-vien-da' >
                    <button className={styles.btn}>Quay lại</button>
                </Link>
            </div>
        </div>

    )
}
export default DSDA;