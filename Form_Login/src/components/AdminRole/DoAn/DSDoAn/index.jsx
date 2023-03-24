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
import styles from './DSDoAn.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import prjApi from "../../../../api/projectApi";

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
        id: 'DoAn',
        label: 'Tên đồ án',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'SinhVien',
        label: 'Tên sinh viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'GiaoVien',
        label: 'Tên giáo viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Ky',
        label: 'Kỳ',
        minWidth: 170,
        align: 'center',
    },
];
const body = {
    'status': 1,
}
function DSDA() {
    const context = useContext(ThemeContext);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    function handleExcel() {
        navigate('/quan-ly-do-an/danh-sach-do-an/nhap-diem-sv');
    }
    const [values, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [projects, setProject] = React.useState([]);
    const token = localStorage.getItem('token');
    React.useEffect(() => {
        const getAllDoAn = async () => {
            try {
                const response = await prjApi.getAllDa(body, token);
                setProject(response);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllDoAn();
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.contain}>
                <div className={styles.btnND}>
                    <Button variant="contained" onClick={() => setOpen(true)} style={{ marginRight: 10 }}>Xuất biểu mẫu</Button>
                    <Button variant="contained" onClick={handleExcel}>Nhập điểm</Button>
                </div>
                <div className={styles.direct}>
                    <p>Danh sách đồ án</p>
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
                                    {projects.map((project, index) => {
                                        return (
                                            <TableRow key={index} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{project.nameGraduationThesis}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateStudent(project.student)}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{context.cellValidateLecturer(project.lecturer)}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{project.semester.code}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
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
                        Chọn kì xuất biểu mẫu sinh viên hoàn thành đồ án
                    </Typography>
                    <Select
                        sx={{ width: 300 }}
                        value={values}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={handleChange}
                    >
                        <MenuItem value="10">
                            01/2022-2023
                        </MenuItem>
                    </Select>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                        <Button className={styles.button} onClick={() => setOpen(false)}>Xuất</Button>
                    </div>
                </Box>
            </Modal>
        </div >

    )
}
export default DSDA;