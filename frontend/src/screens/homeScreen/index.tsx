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
  // Destructure the state and functions from the usePresentations hook
  const {
    presentations,
    loading,
    errors,
    resetErrors,
    addPresentation,
    deletePresentation,
  } = usePresentations();

  // State to manage modal visibility and its title
  const [modalTitle, setModalTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle modal cancelation
  const modalOnCancel = () => {
    setModalVisible(false);
    setModalTitle("");
  };

  // Function to handle modal application
  const modalOnApply = async () => {
    const newPresentation = await addPresentation(modalTitle);

    setModalVisible(false);
    setModalTitle("");

    // Navigate to the slides view for the newly added presentation
    if (newPresentation) {
      navigate(`/presentation/${modalTitle}/slides`, {
        state: newPresentation,
      });
    }
  };

  // Function to handle presentation deletion
  const onDeletePresentationClick = async (title: string) => {
    deletePresentation(title);
  };

  // Function to show error toast notifications
  const showErrorToast = (errorMessage: string) => {
    console.log("showErrorToast");
    toast.error(errorMessage);
  };

  // Display a loading message while data is being fetched
  if (loading) return <span>loading...</span>;

  // Show error toasts based on the error states and then reset errors
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
          {/* Button to trigger the modal for adding a new presentation */}
          <AddPresentationButton
            onClick={() => {
              setModalVisible(true);
            }}
          />
          {/* Render list of presentations */}
          {presentations.map((presentation) => (
            <Presentation
              title={presentation.title}
              key={presentation.title}
              onClick={() => {
                // Navigate to the slides view for the selected presentation
                navigate(`/presentation/${presentation.title}/slides`, {
                  state: presentation,
                });
              }}
              onDelete={() => {
                // Handle presentation deletion
                onDeletePresentationClick(presentation.title);
              }}
            />
          ))}
        </div>
      </div>
      {/* Modal for adding a new presentation */}
      <NewPresentationModal
        title={modalTitle}
        onTitleChange={setModalTitle}
        onApply={modalOnApply}
        onCancel={modalOnCancel}
        visible={modalVisible}
      />
      {/* Toast notifications */}
      <Toaster position="bottom-center" />
    </div>
  );
};
