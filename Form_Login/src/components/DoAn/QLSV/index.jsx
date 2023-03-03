import React from 'react';
import styles from './QLSV.module.css';
import { Link } from 'react-router-dom';
function QLSV() {
    return (
        <div className={styles.btn}>
            <button className={`${styles.button} ${styles.btnEx}`}>Nhập dữ liệu sinh viên từ Excel</button>
            <Link to='/danh-sach-sinh-vien-da'>
                <button className={`${styles.button} ${styles.btnDS}`}>Danh sách sinh viên</button>
            </Link>

        </div>
    )
}

export default QLSV