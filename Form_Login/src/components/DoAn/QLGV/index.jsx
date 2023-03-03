import React from 'react';
import styles from './QLGV.module.css';
import { Link } from 'react-router-dom';
function QLGV() {
    return (
        <div className={styles.btn}>
            <button className={`${styles.button} ${styles.btnEx}`}>Nhập dữ liệu giảng viên từ Excel</button>
            <Link to='/danh-sach-giao-vien-da'>
                <button className={`${styles.button} ${styles.btnDS}`}>Danh sách giáo viên</button>
            </Link>

        </div>
    )
}

export default QLGV