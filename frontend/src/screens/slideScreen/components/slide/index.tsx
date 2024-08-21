import React, { FC, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "../../../../common/components/button";

interface SlideProps {
  title: string;
  content: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
  editDisabled: boolean;
  deleteDisabled: boolean;
}

export const Slide: FC<SlideProps> = ({
  title,
  content,
  onEditClick,
  onDeleteClick,
  editDisabled,
  deleteDisabled,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>{content}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <Button onClick={onEditClick} disabled={editDisabled}>
          Edit
        </Button>
        <Button onClick={onDeleteClick} disabled={deleteDisabled}>
          Delete
        </Button>
      </div>
    </div>
  );
};
