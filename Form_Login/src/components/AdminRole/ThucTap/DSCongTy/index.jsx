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
import styles from './DSCT.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import companyApi from '../../../../api/AdminRole/companyApi.js';
const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'Ma',
        label: 'Mã công ty',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Ten',
        label: 'Tên công ty',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'SDT',
        label: 'Số điện thoại',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
    },
];

function createData(Ma, Ten, SĐT, Email, Diachi, tax_code, mota) {
    return { Ma, Ten, SĐT, Email, Diachi, tax_code, mota};
}

var rows = [
    createData('001', 'Du học sinh Việt Nam', '0647583693', 'Duhoc@gmail.com', 'Ba Đình, Hà Nội', '1111111', 'Môi trường năng động'),
    createData('002', 'Thú Cưng Yiyi', '0123456789', 'Thucung@gmail.com',  'Hoàn Kiếm, Hà Nội', '32322222', 'Môi trường năng động'),
];
function DSCT() {
    // rows = companyApi.getAll;
    const context = useContext(ThemeContext);
    const navigate = useNavigate();
    const handleGoClick = (item) => {
        navigate('/ChiTietCT-tt', {state: {item}})
    }
    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.contain}>
                <div className={styles.direct}>
                    <p>Danh sách công ty</p>
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
                                    {rows.map((row, index) => {
                                        return (
                                            <TableRow key={row.STT} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{index+1}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.Ma}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.Ten}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.SĐT}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.Email}</TableCell>
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
export default DSCT;