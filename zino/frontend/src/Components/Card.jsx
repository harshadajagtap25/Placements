import React from "react";
import styles from "../style.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Card = ({ name, handleDelete }) => {
  const handler = () => {
    handleDelete();
  };
  return (
    <div className={styles.cardContainer}>
      <div>{name}</div>
      <div onClick={handler}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Card;
