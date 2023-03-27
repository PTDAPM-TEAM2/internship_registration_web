import * as React from "react";
import styles from './NDSV.module.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import internship from "../../../../api/intership";
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
function NDSV() {
    const [showAlert, setShowAlert] = React.useState(false);
    const [excelFile, setExcelFile] = React.useState(null);
    const [hideImport, setHideImport] = React.useState(true);
    const handleExcelFileChange = (event) => {
        const file = event.target.files[0];
        setExcelFile(file);
    };

    const formData = new FormData();
    formData.append('file', excelFile);
    const context = useContext(ThemeContext);
    const handleSubmit = async () => {
        {
            context.updateLoading(true);
            setHideImport(false);
        }
        try {
            const response = await internship.importExcelMark(formData);
            context.updateLoading(false);
            excelFile && setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        } catch (error) {
            context.updateLoading(false);
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Nhập điểm thành công !</AlertTitle>
                    </Alert>
                </div>}
            <div className={styles.form}>
                <div style={{ display: 'flex' }}>
                    <p style={{ padding: '30px 0', fontSize: 20 }}>Quản lý thực tập</p>
                </div>
                <p className={styles.title}>Nhập điểm</p>
                <div className={styles.body}>
                    <div className={styles.cover}>
                        {excelFile &&
                            <div className={styles.fileEx}>
                                <div className={styles.img}>
                                    <img src="data:image/jpeg;base64,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" alt="" />
                                </div>
                                <p style={{ fontSize: 25 }}>{excelFile.name}</p>
                            </div>

                        }
                        {hideImport &&
                            <div>
                                <label htmlFor="file" className={styles.label}>+ Nhập điểm</label>
                                <input className={styles.customFileInput} id="file" type="file" accept=".xlsx, .xls" onChange={handleExcelFileChange} />
                            </div>
                        }
                        <button className={styles.btn} onClick={handleSubmit}>Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NDSV