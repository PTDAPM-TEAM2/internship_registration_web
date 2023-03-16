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
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import '../../../../../src/button.css'
import Variables from '../../../../utils/variables';
// import studentApi from '../../../../api/AdminRole/studentApi';
// import { getStudents } from '../../../../axios';
import userApi from "../../../../api/studentApi";


const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 170,
        align: 'center',
    },

    {
        id: 'Hoten',
        label: 'Tên sinh viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Lop',
        label: 'Lớp',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'TenDoAn',
        label: 'Tên đồ án',
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
        navigate('/ThemSV-da');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick(item) {
        navigate('/ChiTietSV-da', { state: { item } });
    }
    // const context = useContext(ThemeContext);

    // console.log(context.token);
    // rows = await studentApi.getAll(context.token);
    // console.log((await studentApi.getAll(context.token))[0]);
    const [students, setStudent] = React.useState([]);
    
    const context = useContext(ThemeContext);
    console.log(context.token);
    React.useEffect(() => {
        const getAllItem = async () => {
            try {
                const response = await userApi.getAllSvDa(null, context.token);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getAllItem()
    }, []);

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
                        <Button className='button' onClick={handleMoveAdd}>Thêm</Button>
                    </div>
                </div>
                <div className={styles.direct}>
                    <p>Danh sách sinh viên</p>
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
                                    {students.map((row, index) => {
                                        return (
                                            <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.hoTen}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.Lop}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.DoAn}</TableCell>
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
export default DSSV;