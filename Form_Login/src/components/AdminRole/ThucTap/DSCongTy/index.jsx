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
import styles from './DSCT.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import companyApi from '../../../../api/companyApi.js';
const columns = [
    {
        id: 'STT',
        label: 'Số thứ tự',
        minWidth: 20,
        align: 'center',
    },
    {
        id: 'Ma',
        label: 'Mã công ty',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Ten',
        label: 'Tên công ty',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'SDT',
        label: 'Số điện thoại',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'Email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
    },
];
function DSCT() {
    // rows = companyApi.getAll;
    const context = useContext(ThemeContext);
    const navigate = useNavigate();

    const [companies, setCompanies] = React.useState([]);

    React.useEffect(() => {
        const getCompany = async () => {
            try {
                const response = await companyApi.getCompanies(context.token);
                setCompanies(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getCompany()
    }, [context.token]);


    const handleGoClick = (item) => {
        navigate('/ChiTietCT-tt', {state: {item}})
    }
    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.contain}>
                <div className={styles.direct}>
                    <p>Danh sách công ty</p>
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
                                    {companies.map((row, index) => {
                                        return (
                                            <TableRow key={row.id} hover role="checkbox" tabIndex={-1} sx={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { handleGoClick(row) }}>
                                                <TableCell sx={{ textAlign: 'center' }}>{index+1}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.id}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.nameCompany}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.phoneNumber}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.email}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div >

    )
}
export default DSCT;