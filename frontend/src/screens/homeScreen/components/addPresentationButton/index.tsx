import React, { FC } from "react";
import styles from "./styles.module.css";
import { CgMathPlus } from "react-icons/cg";
type props = {
  onClick: () => void;
};

export const AddPresentationButton: FC<props> = ({ onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.iconContainer}>
        <CgMathPlus className={styles.plusIcon} />
      </div>
      <div className={styles.title_container}>
        <span>New Presentation</span>
      </div>
    </div>
  );
};
