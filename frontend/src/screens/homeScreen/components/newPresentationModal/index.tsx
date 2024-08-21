import { FC, useState } from "react";
import styles from "./styles.module.css";
import { BaseModal } from "../../../../common/components/baseModal";
import { TextInput } from "../../../../common/components/textInput";

interface modalProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onApply: () => void;
  onCancel: () => void;
  visible: boolean;
}

export const NewPresentationModal: FC<modalProps> = ({
  title,
  onTitleChange,
  onApply,
  onCancel,
  visible,
}) => {
  if (!visible) return null;

  return (
    <BaseModal
      title="New Presentation"
      onPositive={onApply}
      onNegative={onCancel}
      visible={visible}
    >
      <label>Title</label>
      <TextInput
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
    </BaseModal>
  );
};
