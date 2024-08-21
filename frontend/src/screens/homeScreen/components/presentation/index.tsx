import React, { FC } from "react";
import styles from "./styles.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
type props = {
  title: string;
  onClick: () => void;
  onDelete: () => void;
};

export const Presentation: FC<props> = ({ title, onClick, onDelete }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.title_container}>
        <span onClick={onClick}>{title}</span>
        <RiDeleteBin6Line
          className={styles.deleteIcon}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};
