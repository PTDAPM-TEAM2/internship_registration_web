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
import lecturerApi from '../../../../api/lecturerApi';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';

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

function DSGV() {
    const navigate = useNavigate();
    const context = useContext(ThemeContext);

    function handleGo() {
        navigate('/them-giang-vien-da');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick(item) {
        navigate(`/chi-tiet-giang-vien/${item.id}`, { state: { item } });
    }

    const [lecturers, setLecturer] = React.useState([]);
    React.useEffect(() => {
        context.updateLoading(true);
        const getAllItem = async () => {
            try {
                const response = await lecturerApi.getAllGV();
                setLecturer(response);
                context.updateLoading(false);
            } catch (error) {
                context.updateLoading(false);
                console.error('Error fetching data:', error);
            }
        }
        getAllItem()
    }, []);
    
    // const [numOfSinL, setNumOfSinL] = React.useState(0);
    // const body = {
    //     numberOfStudentsInLecturer: numOfSinL,
    // }
    // const handleFilterGV = async (newValue) => {
    //     setNumOfSinL(newValue);
    //     context.updateLoading(true);
    //     try {
    //         const response = await lecturerApi.filter(body);
    //         setLecturer(response);
    //         context.updateLoading(false);
    //         console.log(body);
    //     }
    //     catch (err) {
    //         context.updateLoading(false);
    //         console.log(err);
    //     }
    // }

    // const handleGetAll = async () => {
    //     context.updateLoading(true);
    //     try {
    //         const response = await lecturerApi.getAllGV();
    //         setLecturer(response);
    //         context.updateLoading(false);
    //     } catch (error) {
    //         context.updateLoading(false);
    //         console.error('Error fetching data:', error);
    //     }
    // }



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
                                    <MenuItem value={10} >Giảng viên quản lý dưới 30 sinh viên làm đồ án</MenuItem>
                                    <MenuItem value={20} >Giảng viên quản lý đủ 30 sinh viên làm đồ án</MenuItem>
                                    <MenuItem value={30} >Tất cả</MenuItem>
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
                                    {lecturers.map((row, index) => {
                                        return (
                                            <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.fullName}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.numGrTh}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.phoneNumber}</TableCell>
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