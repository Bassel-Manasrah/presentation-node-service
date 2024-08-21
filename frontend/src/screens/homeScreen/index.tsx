import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { usePresentations } from "./hooks/usePresentations";
import { NewPresentationModal } from "./components/newPresentationModal";
import { AddPresentationButton } from "./components/addPresentationButton";
import { Presentation } from "./components/presentation";

export const HomeScreen: FC = () => {
  const navigate = useNavigate();
  const {
    presentations,
    loading,
    errors,
    resetErrors,
    addPresentation,
    deletePresentation,
  } = usePresentations();

  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const modalOnCancel = () => {
    setModalVisible(false);
    setModalTitle("");
  };

  const modalOnApply = async () => {
    const newPresentation = await addPresentation(modalTitle);

    setModalVisible(false);
    setModalTitle("");

    if (newPresentation) {
      navigate(`/presentation/${modalTitle}/slides`, {
        state: newPresentation,
      });
    }
  };

  const onDeletePresentationClick = async (title: string) => {
    deletePresentation(title);
  };

  const showErrorToast = (errorMessage: string) => {
    console.log("showErrorToast");
    toast.error(errorMessage);
  };

  if (loading) return <span>loading...</span>;

  if (errors.addError) {
    showErrorToast("Unable to add presentation");
    resetErrors();
  }
  if (errors.fetchError) {
    showErrorToast("Unable to load presentations");
    resetErrors();
  }
  if (errors.deleteError) {
    showErrorToast("Unable to delete presentations");
    resetErrors();
  }

  return (
    <div className={styles.screenContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>My Presentations</div>
        <div className={styles.presentationsContainer}>
          <AddPresentationButton
            onClick={() => {
              setModalVisible(true);
            }}
          />
          {presentations.map((presentation) => (
            <Presentation
              title={presentation.title}
              key={presentation.title}
              onClick={() => {
                navigate(`/presentation/${presentation.title}/slides`, {
                  state: presentation,
                });
              }}
              onDelete={() => {
                onDeletePresentationClick(presentation.title);
              }}
            />
          ))}
        </div>
      </div>
      <NewPresentationModal
        title={modalTitle}
        onTitleChange={setModalTitle}
        onApply={modalOnApply}
        onCancel={modalOnCancel}
        visible={modalVisible}
      />
      <Toaster position="bottom-center" />
    </div>
  );
};
