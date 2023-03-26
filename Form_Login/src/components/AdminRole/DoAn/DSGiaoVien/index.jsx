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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    {
        id: 'function',
        label: 'Thêm sinh viên',
        minWidth: 50,
        align: 'center',
    },
];

function DSGV() {
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const [chevron, setChevron] = React.useState(true);

    function handleGo() {
        navigate('/quan-ly-giang-vien/danh-sach-giang-vien/them-giang-vien');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick(item) {
        navigate(`/quan-ly-giang-vien/danh-sach-giang-vien/chi-tiet-giang-vien/${item.id}`, { state: { item } });
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

    const [numOfSinL, setNumOfSinL] = React.useState(0);
    const body = {
        numberOfStudentsInLecturer: numOfSinL,
    }
    const handleFilterGV = async () => {
        context.updateLoading(true);
        try {
            const response = await lecturerApi.filter(body);
            setLecturer(response);
            context.updateLoading(false);
        }
        catch (err) {
            context.updateLoading(false);
            console.log(err);
        }
    }


    const [search, setSearch] = React.useState("");
    const [filteredData, setFilteredData] = React.useState([]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
        const filter = lecturers.filter((lecturer) => {
            return (
                lecturer.fullName.toLowerCase().includes(value.toLowerCase())
                // context.cellValidatePhone(lecturer).toLowerCase().includes(value.toLowerCase())
            );
        });
        setFilteredData(filter);
    };

    const handleChevon = (value) => {
        setChevron(value);
        console.log(chevron);
    }

    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.contain}>
                <div className={styles.header}>
                    <div className={styles.search}>
                        <input type="text" placeholder="Nhập tìm kiếm: " value={search} onChange={handleSearch} />
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
                                    <MenuItem value={10} onClick={() => {
                                        setNumOfSinL(1)
                                        handleFilterGV()
                                    }} >Giảng viên quản lý dưới 30 sinh viên làm đồ án</MenuItem>
                                    <MenuItem value={20} onClick={() => {
                                        setNumOfSinL(0)
                                        handleFilterGV()
                                    }} >Giảng viên quản lý đủ 30 sinh viên làm đồ án</MenuItem>
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
                                    {
                                        search === '' ?
                                            (
                                                lecturers.map((lecturer, index) => {
                                                    return (
                                                        <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(lecturer) }}>
                                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{lecturer.fullName}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{lecturer.numGrTh}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{lecturer.phoneNumber}</TableCell>
                                                            <TableCell>
                                                                <ExpandMoreIcon
                                                                    // checked={checkboxes.includes(student.studentCode)}
                                                                    // onClick={(e) => handleCheckboxChange(student.studentCode, e.target.checked)}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            ) :
                                            (
                                                filteredData.map((row, index) => {
                                                    return (
                                                        <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{row.fullName}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{row.numGrTh}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{row.phoneNumber}</TableCell>
                                                            {/* <TableCell>
                                                                <ExpandMoreIcon
                                                                    // checked={checkboxes.includes(student.studentCode)}
                                                                    // onClick={(e) => handleCheckboxChange(student.studentCode, e.target.checked)}
                                                                />
                                                            </TableCell> */}
                                                        </TableRow>
                                                    );
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
export default DSGV;