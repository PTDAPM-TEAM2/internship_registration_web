import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './DSGiaoVien.module.css';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'TenGiangVien',
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
        id: 'SĐT',
        label: 'Số điện thoại',
        minWidth: 170,
        align: 'center',
    },
];

function createData(STT, TenGiangVien, Khoa, SLSV, SĐT, SoCC, NgaySinh, NoiSinh, email, gt, MaGV, Mk) {
    return { STT, TenGiangVien, Khoa, SLSV, SĐT, SoCC, NgaySinh, NoiSinh, email, gt, MaGV, Mk };
}

const rows = [
    createData(1, 'Cù Việt Dũng', 'Công nghệ thông tin', '20', '0927548193', '034324423233', '01/04/1988', 'Hà Nội', 'dung@gmail.com', 'Nam', '100045298', '*******'),
    createData(2, 'Đoàn Thị Quế', 'Công nghệ thông tin', '30', '0325598619', '052345433454', '01/02/1988', 'Hà Nội', 'que@gmail.com', 'Nữ', '1000532452', '*******'),
    createData(3, 'Nguyễn Ngọc Châu', 'Công nghệ thông tin', '25', '0977211480', '04234294234', '01/07/1989', 'Hà Nội', 'chau@gmail.com', 'Nữ', '100056354', '*******'),
];
function DSGV() {
    const navigate = useNavigate();

    function handleGo() {
        navigate('/ThemGV-da');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick(item) {
        navigate('/ChiTietGV-da', {state: {item}});
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
                                <InputLabel id="demo-simple-select-label" >Lọc</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    onChange={handleChange}
                                    label="Lọc"
                                >
                                    <MenuItem value={10}>Giảng viên quản lý dưới 30 sinh viên làm đồ án</MenuItem>
                                    <MenuItem value={20}>Giảng viên quản lý đủ 30 sinh viên làm đồ án</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Button className={styles.button} style={{ color: 'white' }} onClick={handleGo}>Thêm</Button>
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
                                    {rows.map((row) => {
                                        return (
                                            <TableRow key={row.STT} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.STT}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.TenGiangVien}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.Khoa}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.SLSV}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.SĐT}</TableCell>
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
export default DSGV;