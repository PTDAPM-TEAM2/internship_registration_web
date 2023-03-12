import React from 'react';
import styles from './QLSV.module.css';
import { Link } from 'react-router-dom';
function QLSV() {
    return (
        <div className={styles.btn}>
            <Link to='/quan-ly-sinh-vien-da/du-lieu-sinh-vien-da'>
                <button className={`${styles.button} ${styles.btnEx}`}>Nhập dữ liệu sinh viên từ Excel</button>
            </Link>
            <Link to='/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da'>
                <button className={`${styles.button} ${styles.btnDS}`} onClick={() => console.log(true)}>Danh sách sinh viên</button>
            </Link>

        </div>
    )
}

export default QLSV