import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import styles from './DSGiaoVien.module.css';

import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import '../../../../../src/button.css'


const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'Hoten',
        label: 'Tên giảng viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Khoa',
        label: 'Khoa',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'SLSV',
        label: 'Số lượng sinh viên quản lý',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Ky',
        label: 'Kỳ',
        minWidth: 170,
        align: 'center',
    }
];

function DSSV() {
    const navigate = useNavigate();

    function handleMoveAdd() {
        navigate('/ThemGV-tt');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick() {
        navigate('/ChiTietGV-tt');
    }
   


    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.contain}>
                <div className={styles.header}>
                    <div className={styles.search}>
                        <input type="text" placeholder="Nhập tìm kiếm: " />
                        <SearchIcon />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginBottom: '22px' }}>
                            <FormControl sx={{ m: 1, width: 350, mt: 3, height: 50 }}>
                                <InputLabel id="demo-simple-select-label">Lọc</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    onChange={handleChange}
                                    label="Lọc"
                                >
                                    <MenuItem value={10}>Sinh viên chưa có giảng viên hướng dẫn</MenuItem>
                                    <MenuItem value={20}>Sinh viên đã có giảng viên hướng dẫn</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {/* <Button className='button' onClick={handleMoveAdd}>Thêm</Button> */}
                    </div>
                </div>
                <div className={styles.direct}>
                    <p>Danh sách giảng viên</p>
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div>

    )
}
export default DSSV;