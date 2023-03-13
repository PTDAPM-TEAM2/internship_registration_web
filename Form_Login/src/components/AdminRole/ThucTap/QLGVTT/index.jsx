import React from 'react';
import styles from './QLGVTT.module.css';
import { Link } from 'react-router-dom';
function QLGVTT() {
    return (
        <div className={styles.btn}>
            <Link to='/quan-ly-giao-vien-tt/du-lieu-giao-vien-tt'>
                <button className={`${styles.button} ${styles.btnEx}`}>Nhập dữ liệu giảng viên từ Excel</button>
            </Link>
            <Link to='/quan-ly-giao-vien-tt/danh-sach-giao-vien-tt'>
                <button className={`${styles.button} ${styles.btnDS}`}>Danh sách giảng viên</button>
            </Link>

        </div>
    )
}

export default QLGVTT