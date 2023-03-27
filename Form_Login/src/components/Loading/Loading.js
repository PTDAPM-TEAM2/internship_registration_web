import React from "react";
import { FadeLoader} from "react-spinners";
import styles from "./loading.module.css"

const Loading = ({ loading }) => {
  return (
    <div className={styles.spinner}>
      <FadeLoader color={"#6f6af8"} margin={10} loading={loading} size={25} />
    </div>
  );
};

export default Loading;