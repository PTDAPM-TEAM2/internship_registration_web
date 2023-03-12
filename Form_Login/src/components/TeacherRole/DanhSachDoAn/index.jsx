import * as React from 'react';
import styles from '../DanhSachDoAn/ProjectList.module.css';
import {Link, useNavigate} from 'react-router-dom';

const data = [
    {
      topicName: "Quản lý sinh viên",
      name: "Hà Mai Anh",
      id: "2051063222",
      dateSubmit: "20-03-2023",
    },
    {
      topicName: "Quản lý sinh viên",
      name: "Hà Mai Anh",
      id: "2051063222",
      dateSubmit: "20-03-2023",
    },
    {
      topicName: "Quản lý sinh viên",
      name: "Hà Mai Anh",
      id: "2051063222",
      dateSubmit: "20-03-2023",
    },
    {
      topicName: "Quản lý sinh viên",
      name: "Hà Mai Anh",
      id: "2051063222",
      dateSubmit: "20-03-2023",
    },
    {
      topicName: "Quản lý sinh viên",
      name: "Hà Mai Anh",
      id: "2051063222",
      dateSubmit: "20-03-2023",
    },
    {
      topicName: "Quản lý sinh viên",
      name: "Hà Mai Anh",
      id: "2051063222",
      dateSubmit: "20-03-2023",
    },
];
const ProjectListStudents = () => {
    const navigate = useNavigate();
    function toComponent(item) {
      navigate('danh-sach-do-an-chi-tiet', {state: {item}})
    }
    return ( 
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách đồ án</b></p>
                <div className={styles.container}> 
                    {data.map((item) => ( 
                    <div className={styles.card}> 
                        <a className={styles.cardItem} onClick={() => {toComponent(item)}}>
                            <div className={styles.body}> 
                                <a><b>Đề tài: {item.topicName}</b></a><br></br>
                                <a><b>Tên sinh viên: </b>{item.name}</a> 
                                <p><b>Mã sinh viên: </b>{item.id}</p> 
                                <p><b>Ngày nộp: </b>{item.dateSubmit}</p> 
                            </div> 
                        </a>
                    </div> 
                    ))} 
                </div> 
            </div>
        </div>
    ); 
};

export default ProjectListStudents;
