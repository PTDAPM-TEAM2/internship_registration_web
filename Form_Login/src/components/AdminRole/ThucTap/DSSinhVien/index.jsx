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
import userApi from "../../../../api/studentApi";
const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'MaSV',
        label: 'Mã Sinh Viên',
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
        id: 'TenCongTy',
        label: 'Tên Công Ty',
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

function createData(MaSV, Hoten, Lop, TenCT, Ky) {
    return { MaSV, Hoten, Lop, TenCT, Ky };
}

const rows = [
    createData('2051063478', 'Nguyễn Đức Tâm', '62PM02', 'Quản lý du học sinh Việt Nam', '01/2022-2023'),
    createData('2051063472', 'Nguyễn Thị Bích Ngọc', '62PM02', 'Quản lý cửa hàng thú cưng', '01/2022-2023'),
    createData('2051063471', 'Nguyễn Đức Đức Phong', '62PM02', 'Quản lý nhân sự công ty ABC', '01/2022-2023'),
];
function DSSV() {
    const navigate = useNavigate();

    function handleMoveAdd() {
        navigate('/ThemSV-tt');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick() {
        navigate('/ChiTietSV-tt');
    }
    const [students, setStudent] = React.useState([]);

    const context = useContext(ThemeContext);
    React.useEffect(() => {
        const getAllItem = async () => {
            try {
                const response = await userApi.getAllSvTt(null, context.token);
                setStudent(response);
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
                                    <MenuItem value={10}>Sinh viên chưa có công ty thực tập</MenuItem>
                                    <MenuItem value={20}>Sinh viên đã có công ty thực tập</MenuItem>
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
                                                <TableCell sx={{ textAlign: 'center' }}>{row.studentCode}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.fullName}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.grade.name}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.graduationThesis}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.internship}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
                <div style={{ display: 'flex', justifyContent:'space-between' }}>
                    <Button className='button' >Nhập điểm</Button>
                    <Button className='button' >Xuất dữ liệu</Button>
                </div>
            </div>
        </div>

    )
}
export default DSSV;