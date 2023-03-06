import React from 'react';
import styles from './QLCT.module.css';
import { Link } from 'react-router-dom';
function QLCT() {
    return (
        <div className={styles.btn}>
            <Link to='/quan-ly-cong-ty/du-lieu-cong-ty'>
                <button className={`${styles.button} ${styles.btnEx}`}>Nhập dữ liệu công ty từ Excel</button>
            </Link>
            <Link to='/quan-ly-cong-ty/danh-sach-cong-ty'>
                <button className={`${styles.button} ${styles.btnDS}`}>Danh sách công ty</button>
            </Link>

        </div>
    )
}

export default QLCT