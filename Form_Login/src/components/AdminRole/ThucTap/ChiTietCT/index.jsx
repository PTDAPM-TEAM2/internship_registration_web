import * as React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './ChiTietCT.module.css';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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
        id: 'Ma',
        label: 'Mã sinh viên',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Ten',
        label: 'Tên sinh viên',
        minWidth: 170,
        align: 'center',
    },
];

function createData(STT, Ma, Ten) {
    return { STT, Ma, Ten };
}

const rows = [
    createData(1, '205106', 'Nguyễn Đức Tâm'),
    createData(2, '205106', 'Nguyễn Đức Tâm'),
    createData(3, '205106', 'Nguyễn Đức Tâm'),
];

const ChiTietCT = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAdd = () => {
        setOpen(false)
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    };


    // function handleGo() {
    //     setOpen(false);
    //     setTimeout(() => {
    //         navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da');
    //     }, 500)
    // }

    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thông tin chi tiết công ty</p>
                    <form>
                        <div className={styles.formAccount}>
                            <div className={styles.inputValue}>
                                <div className={styles.txt}>
                                    <p>Mã công ty: </p>
                                    <TextField defaultValue='001' className={styles.txtField} />
                                </div>

                                <div className={styles.txt}>
                                    <p>Số điện thoại: </p>
                                    <TextField defaultValue='0123456789' className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Địa chỉ: </p>
                                    <TextField defaultValue='Hà Nội' className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Tên công ty: </p>
                                    <TextField defaultValue='APANZO' className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Email: </p>
                                    <TextField defaultValue='apanzo123@gmail.com' className={styles.txtField} />
                                </div>

                                <div className={styles.txt}>
                                    <p>Tax_Code: </p>
                                    <TextField defaultValue='11111' className={styles.txtField} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mô tả về công ty: </p>
                                <TextField defaultValue='' className={styles.txtFieldBot} multiline rows={8} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <Button className={styles.button} style={{ color: 'white' }} sx={{ margin: '0 10px', width: 300 }} onClick={handleOpen}>Thêm sinh viên thự tập</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sinh viên chưa có công ty thực tập
                    </Typography>
                    <div className={styles.contain}>
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
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.STT} >
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );

                                                        })}
                                                        <Checkbox />
                                                    </TableRow>
                                                );
                                            })}
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
                        <AlertTitle>Thêm sinh viên thực tập thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ChiTietCT;
