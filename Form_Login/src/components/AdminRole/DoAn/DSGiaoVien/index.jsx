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
import { useContext, useState } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import studentApi from "../../../../api/studentApi";
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',

};

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
        label: '',
        minWidth: 30,
        align: 'center',
    },
];


const columnsn = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'TenSV',
        label: 'Tên sinh viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'SLSV',
        label: 'Mã sinh viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'DoAn',
        label: 'Tên đồ án',
        minWidth: 170,
        align: 'center',
    },
];




function DSGV() {
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const [addsv, setAddsv] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [students, setStudent] = React.useState();
    const [id, setId] = React.useState(0);
    const [showAlert, setShowAlert] = React.useState(false);


    const getId = (newValue) => {
        setId(newValue);
    }

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
    const [searchData, setSearchData] = React.useState([]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
        const filter = lecturers.filter((lecturer) => {
            return (
                lecturer.fullName.toLowerCase().includes(value.toLowerCase())
                // context.cellValidatePhone(lecturer).toLowerCase().includes(value.toLowerCase())
            );
        });
        setSearchData(filter);
    };


    const handleOpenList = async (type) => {

        context.updateLoading(true);
        try {
            const response = await studentApi.filter(type);
            setStudent(response);
            setOpen(true);
            context.updateLoading(false);
        }
        catch (err) {
            console.log(err);
            context.updateLoading(false);
        }
    }

    const [checkboxes, setCheckboxes] = React.useState([]);
    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            setCheckboxes(checkboxes.concat(id));
        } else {
            setCheckboxes(checkboxes.filter(item => item !== id));
        }
    }



    console.log(checkboxes)

    const bodyS ={
        idLecturer: id,
        idStudents: checkboxes
    }


    const handleAdd = async () => {
        context.updateLoading(true);
        try {
            const response = await lecturerApi.addSV(bodyS);
            console.log(response);
            setOpen(false);
            // setShowAlert(true);
            // setTimeout(() => {
            //     setShowAlert(false);
            // }, 2000)
            context.updateLoading(false);
        }
        catch (err) {
            console.log(err);
            context.updateLoading(false);
        }
        
    };




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
                                        setAddsv(true)
                                    }} >Giảng viên quản lý dưới 30 sinh viên làm đồ án</MenuItem>
                                    <MenuItem value={20} onClick={() => {
                                        setNumOfSinL(0)
                                        handleFilterGV()
                                        setAddsv(false)
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
                                                        <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} >
                                                            <TableCell sx={{ textAlign: 'center' }} onClick={() => { handleGoClick(lecturer) }}>{index + 1}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }} onClick={() => { handleGoClick(lecturer) }}>{lecturer.fullName}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }} onClick={() => { handleGoClick(lecturer) }}>{lecturer.numGrTh}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }} onClick={() => { handleGoClick(lecturer) }}>{lecturer.phoneNumber}</TableCell>
                                                            {addsv &&
                                                                <TableCell sx={{ textAlign: 'center' }}>
                                                                    <IconButton sx={{ zIndex: '10' }} onClick={() => {
                                                                        getId(lecturer.id)
                                                                        handleOpenList(2)
                                                                    }}>
                                                                        <ExpandMoreIcon />

                                                                    </IconButton>
                                                                </TableCell>
                                                            }
                                                        </TableRow>
                                                    );
                                                })
                                            ) :
                                            (
                                                searchData.map((row, index) => {
                                                    return (
                                                        <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{row.fullName}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{row.numGrTh}</TableCell>
                                                            <TableCell sx={{ textAlign: 'center' }}>{row.phoneNumber}</TableCell>

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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Sinh viên chưa có giảng viên hướng dẫn
                        </Typography>
                        <div className={styles.contain}>
                            <div className={styles.table}>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 480 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columnsn.map((column) => (
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
                                                {students === undefined ? "" :
                                                    (students.map((student, index) => {

                                                        return (
                                                            <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ textAlign: 'center' }}>
                                                                <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                                <TableCell sx={{ textAlign: 'center' }}>{student.studentCode}</TableCell>
                                                                <TableCell sx={{ textAlign: 'center' }}>{student.fullName}</TableCell>
                                                                <TableCell>
                                                                    <Checkbox
                                                                        checked={checkboxes.includes(student.id)}
                                                                        onClick={(e) => handleCheckboxChange(student.id, e.target.checked)}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    }))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                            <Button className={styles.button} sx={{ color: 'white' }} onClick={handleAdd}>Thêm</Button>
                        </div>
                    </Box>
                </Modal>
                {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Thêm sinh viên thành công !</AlertTitle>
                    </Alert>
                </div>}
            </div>
        </div>

    )
}
export default DSGV;