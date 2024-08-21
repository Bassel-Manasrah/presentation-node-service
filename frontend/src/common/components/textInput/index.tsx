import { FC } from "react";
import styles from "./style.module.css";

interface textInputProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  multiLine?: boolean;
  placeholder?: string;
  rows?: number;
}

export const TextInput: FC<textInputProps> = ({
  value,
  onChange,
  multiLine = false,
  placeholder = "",
  rows = 4,
}) => {
  const sharedProps = {
    value,
    onChange,
    placeholder,
    className: styles.input,
  };

  if (multiLine) {
    return <textarea style={{ resize: "none" }} {...sharedProps} rows={rows} />;
  }

  return <input type="text" {...sharedProps} />;
};
