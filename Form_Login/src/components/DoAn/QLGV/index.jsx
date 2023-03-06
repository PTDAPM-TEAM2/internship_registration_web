import React from 'react';
import styles from './QLGV.module.css';
import { Link } from 'react-router-dom';
function QLGV() {
    return (
        <div className={styles.btn}>
            <Link to='/quan-ly-giao-vien-da/du-lieu-giao-vien-da'>
                <button className={`${styles.button} ${styles.btnEx}`}>Nhập dữ liệu giảng viên từ Excel</button>
            </Link>
            <Link to='/quan-ly-giao-vien-da/danh-sach-giao-vien-da'>
                <button className={`${styles.button} ${styles.btnDS}`}>Danh sách giảng viên</button>
            </Link>

        </div>
    )
}

export default QLGV