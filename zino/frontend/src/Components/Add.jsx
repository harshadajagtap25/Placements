import React from "react";
import styles from "../style.module.css";

const Add = ({ name, handleAdd }) => {
  const handler = () => {
    handleAdd(  );
  };
  return (
    <div>
      <div className={styles.addcontainer}>
        <div>{name}</div>
        <div>
          <button onClick={handler}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default Add;
