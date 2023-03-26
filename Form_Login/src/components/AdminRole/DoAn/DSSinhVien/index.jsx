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
import IconButton from '@mui/material/IconButton';
import studentApi from "../../../../api/studentApi";
import AlertMessage from '../ThemSV/Alert';
// import Variables from '../../../../utils/variables';
// import studentApi from '../../../../api/AdminRole/studentApi';
// import { getStudents } from '../../../../axios';


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
    const token = localStorage.getItem('token');
    const context = useContext(ThemeContext);
    const [showAlert, setShowAlert] = React.useState(null);



    function handleMoveAdd() {
        navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da/them-sinh-vien-da');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick(item) {
        navigate(`/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da/chi-tiet-sinh-vien-da/${item.id}`, { state: { item } });
    }

    const [students, setStudent] = React.useState([]);


    React.useEffect(() => {
        context.updateLoading(true);
        const getAllItem = async () => {
            try {
                const response = await studentApi.getAllSvDa(null, token);
                setStudent(response);
                context.updateLoading(false);
            } catch (error) {
                if (error.response.data.status === 403) {
                    context.updateLoading(false);
                    setShowAlert({ type: 'error', text: "Lỗi kết nối!" });
                    setTimeout(() => {
                        setShowAlert(null);
                    }, 2000)
                }
                console.error('Error fetching data:', error);
                context.updateLoading(false);

            }
        }
        getAllItem()
    }, []);


    const handleFilterGV = async (type) => {
        context.updateLoading(true);
        try {
            const response = await studentApi.filter(type);
            setStudent(response);
            context.updateLoading(false);
        }
        catch (err) {
            console.log(err);
            context.updateLoading(false);

        }
    }

    const [search, setSearch] = React.useState("");
    const [filteredData, setFilteredData] = React.useState([]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
        const filter = students.filter((student) => {
            return (
                student.fullName.toLowerCase().includes(value.toLowerCase()) ||
                student.grade.name.toLowerCase().includes(value.toLowerCase()) ||
                context.cellValidateName(student.graduationThesis).toLowerCase().includes(value.toLowerCase())
            );
        });
        setFilteredData(filter);
    };


    return (
        <div style={{ display: 'flex' }}>
            {showAlert && <AlertMessage />}
            <div className={styles.contain}>
                <div className={styles.header}>
                    <form>
                        <div className={styles.search} >
                            <input type="text" placeholder="Nhập tìm kiếm: "
                                value={search}
                                onChange={handleSearch}
                            />
                            <IconButton variant="contained" disabled>
                                <SearchIcon sx={{ cursor: 'pointer' }} />
                            </IconButton>
                        </div>
                    </form>
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
                                    <MenuItem value={10} onClick={() => handleFilterGV(1)}>Sinh viên chưa có giảng viên hướng dẫn</MenuItem>
                                    <MenuItem value={20} onClick={() => handleFilterGV(2)}>Sinh viên đã có giảng viên hướng dẫn</MenuItem>
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
                                    {
                                        search === '' ?
                                            (
                                                students.map((student, index) => {
                                                    return (
                                                        <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(student) }}>
                                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{student.fullName}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{student.grade.name}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateName(student.graduationThesis)}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateSemester(student.graduationThesis)}</TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            ) :
                                            (
                                                filteredData.map((filter, index) => {
                                                    return (
                                                        <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(filter) }}>
                                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{filter.fullName}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{filter.grade.name}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateName(filter.graduationThesis)}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{filter.internship}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            )
                                    }
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