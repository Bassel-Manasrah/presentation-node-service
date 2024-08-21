import { FC } from "react";
import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};
