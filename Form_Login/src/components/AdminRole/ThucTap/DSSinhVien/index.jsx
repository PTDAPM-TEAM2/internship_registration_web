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
import studentApi from "../../../../api/studentApi";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TTApi from '../../../../api/intership.js';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
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

function DSSV() {
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const [students, setStudent] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [studentIntern, setStudentIntern] = React.useState();
    const [showAlert, setShowAlert] = React.useState(false);

    function handleExcel() {
        navigate('/quan-ly-sinh-vien-tt/danh-sach-sinh-vien-tt/nhap-diem-sv')
    }
    function handleMoveAdd() {
        navigate('/quan-ly-sinh-vien-tt/danh-sach-sinh-vien-tt/them-sinh-vien-tt');
    }
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function handleGoClick(item) {
        navigate(`/quan-ly-sinh-vien-tt/danh-sach-sinh-vien-tt/chi-tiet-sinh-vien-tt/${item.id}`, { state: { item } });
    }

    const token = localStorage.getItem('token');
    React.useEffect(() => {
        const getAllItem = async () => {
            context.updateLoading(true);
            try {
                const response = await studentApi.getAllSvTt(null, token);
                setStudent(response);
                context.updateLoading(false);
            } catch (error) {
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
                student.studentCode.toLowerCase().includes(value.toLowerCase()) ||
                student.fullName.toLowerCase().includes(value.toLowerCase()) ||
                student.grade.name.toLowerCase().includes(value.toLowerCase()) ||
                context.cellValidateCompany(student.internship).toLowerCase().includes(value.toLowerCase())
            );
        });
        setFilteredData(filter);
    };


    const handleExport = async () => {
        context.updateLoading(true);
        try {
            const response = await TTApi.exportTT(studentIntern.id);

            const url = URL.createObjectURL(new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));

            const link = document.createElement("a");
            link.href = url;
            link.download = `${studentIntern.fullName}.docx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            context.updateLoading(false);
            setOpen(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000)
        }
        catch (err) {
            context.updateLoading(false);
            console.log(err);
        }
    };



    return (
        <div style={{ display: 'flex', height: '90vh', position: 'relative' }}>
            <div className={styles.contain}>
                <div className={styles.header}>
                    <div className={styles.search}>
                        <input type="text" placeholder="Nhập tìm kiếm: " value={search} onChange={handleSearch} />
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
                                    <MenuItem value={10} onClick={() => handleFilterGV(3)}>Sinh viên chưa có công ty thực tập</MenuItem>
                                    <MenuItem value={20} onClick={() => handleFilterGV(4)}>Sinh viên đã có công ty thực tập</MenuItem>
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
                        <TableContainer sx={{ maxHeight: 400 }}>
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
                                    {search === '' ?
                                        (
                                            students.map((student, index) => {
                                                return (
                                                    <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(student) }}>
                                                        <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{student.studentCode}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{student.fullName}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{student.grade.name}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateCompany(student.internship)}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateSemesterIntern(student.internship)}</TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        ) :
                                        (
                                            filteredData.map((student, index) => {
                                                return (
                                                    <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(student) }}>
                                                        <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{student.studentCode}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{student.fullName}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{student.grade.name}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateCompany(student.internship)}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateSemesterIntern(student.internship)}</TableCell>
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
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>

                    <Button className='button' sx={{ marginRight: 2 }} onClick={handleExcel} >Nhập điểm</Button>
                    <Button className='button' onClick={() => {setOpen(true); handleFilterGV(4)}}>Xuất dữ liệu</Button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Chọn sinh viên hoàn thành thực tập
                    </Typography>
                    <Select
                        sx={{ width: 300 }}
                        value={value}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={handleChange}
                    >
                        {students.map(student =>
                            <MenuItem key={student.id} value={student.id} onClick={() => { setStudentIntern(student) }}>
                                {student.fullName}
                            </MenuItem>
                        )}
                    </Select>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                        <Button className={styles.button} onClick={handleExport}>Xuất</Button>
                    </div>
                </Box>
            </Modal>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'fixed',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Xuất thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>

    )
}
export default DSSV;