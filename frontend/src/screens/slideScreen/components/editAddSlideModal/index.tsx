import { FC, useState } from "react";
import styles from "./styles.module.css";
import { BaseModal } from "../../../../common/components/baseModal";
import { TextInput } from "../../../../common/components/textInput";

interface editAddSlideModalProps {
  header: string;
  title: string;
  content: string;
  onTitleChange: (newTitle: string) => void;
  onContentChange: (newContent: string) => void;
  onApply: () => Promise<void>;
  onCancel: () => void;
  visible: boolean;
}

export const EditAddSlideModal: FC<editAddSlideModalProps> = ({
  header,
  title,
  content,
  onTitleChange,
  onContentChange,
  onApply,
  onCancel,
  visible,
}) => {
  return (
    <BaseModal
      title={header}
      onPositive={onApply}
      onNegative={onCancel}
      visible={visible}
    >
      <label>Title</label>
      <TextInput
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <label>Content</label>
      <TextInput
        multiLine={true}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
    </BaseModal>
  );
};
