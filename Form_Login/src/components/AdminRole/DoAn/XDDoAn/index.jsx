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
import projectApi from '../../../../api/AdminRole/projectApi.js';
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

function createData(STT, DoAn, SinhVien, GiaoVien, Ky, MaSV, Lop, File) {
    return { STT, DoAn, SinhVien, GiaoVien, Ky,  MaSV, Lop, File };
}

var rows = [
    createData(1, 'Quản lý nhân sự công ty ABC', 'Trung Thị Linh', 'Cù Việt Dũng', '01/2022-2023', '2051063000', '62PM02', 'TrungThiLinh.pdf'),
    createData(2, 'Quản lý cửa hàng thú cưng', 'Nguyễn Thị Bích Ngọc', 'Cù Việt Dũng', '01/2022-2023', '2051063111', '62PM02', 'NguyenThiBichNgoc.pdf'),
];
function DSDA() {
    // rows = projectApi.getAll();
    const context = useContext(ThemeContext);
    const navigate = useNavigate();
    function handleGoClick(item) {
        navigate('/ChiTietXD', { state: { item } });
        console.log(item);
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
                                            <TableRow key={row.STT} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.STT}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.DoAn}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.SinhVien}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.GiaoVien}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.Ky}</TableCell>
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