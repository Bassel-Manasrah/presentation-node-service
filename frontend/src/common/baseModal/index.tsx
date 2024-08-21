import { FC, useState } from "react";
import { Button } from "../button";
import styles from "./styles.module.css";
import { TextInput } from "../textInput";

interface modalProps {
  title: string;
  onPositive: () => void;
  onNegative: () => void;
  positiveButtonText?: string;
  negativeButtonText?: string;
  visible?: boolean;
  children?: React.ReactNode;
}

export const BaseModal: FC<modalProps> = ({
  title,
  onPositive,
  onNegative,
  positiveButtonText = "Done",
  negativeButtonText = "Cancel",
  visible = false,
  children,
}) => {
  if (!visible) return null;

  return (
    <div className={styles.modelOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.contentContainer}>
          <span className={styles.modalTitle}>{title}</span>

          {children}

          <div className={styles.buttonsContainer}>
            <Button onClick={onNegative}>{negativeButtonText}</Button>
            <Button onClick={onPositive}>{positiveButtonText}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
