import React from 'react';
import styles from './QLGVTT.module.css';
import { Link } from 'react-router-dom';
function QLGVTT() {
    return (
        <div className={styles.btn}>
            <Link to='/quan-ly-giang-vien-tt/du-lieu-giang-vien-tt'>
                <button className={`${styles.button} ${styles.btnEx}`}>Nhập dữ liệu giảng viên từ Excel</button>
            </Link>
            <Link to='/quan-ly-giang-vien-tt/danh-sach-giang-vien-tt'>
                <button className={`${styles.button} ${styles.btnDS}`}>Danh sách giảng viên</button>
            </Link>

        </div>
    )
}

export default QLGVTT