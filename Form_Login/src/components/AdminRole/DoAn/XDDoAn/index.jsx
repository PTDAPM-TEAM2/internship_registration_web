import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Sidebar from "../../../Sidebar/index.jsx";
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import styles from './XDDoAn.module.css';
import { Link } from 'react-router-dom';
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
        id: 'Ky',
        label: 'Ngày',
        minWidth: 170,
        align: 'center',
    },
];

function createData(STT, DoAn, SinhVien, GiaoVien, Ky) {
    return { STT, DoAn, SinhVien, GiaoVien, Ky };
}

const rows = [
    createData(1, 'Quản lý du học sinh Việt Nam', 'Nguyễn Đức Tâm', 'Cù Việt Dũng', '01/2022-2023'),
    createData(2, 'Quản lý du học sinh Đức', 'Hoàng Nam', 'Cù Việt Dũng', '01/2022-2023'),
    createData(3, 'Quản lý du học sinh Tây Ban Nha', 'Lương Nam', 'Cù Việt Dũng', '01/2022-2023'),
];
function DSDA() {
    const context = useContext(ThemeContext);
    const navigate = useNavigate();
    function handleGoClick() {
        navigate('/ChiTietXD');
    }
    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.contain}>
                <div className={styles.direct}>
                    <p>Xét duyệt đồ án</p>
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
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.STT} sx={{ cursor: 'pointer' }} onClick={handleGoClick}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
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
            </div>
        </div>

    )
}
export default DSDA;