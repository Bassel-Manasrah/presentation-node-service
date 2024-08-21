import styles from "./styles.module.css";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  IoMdArrowRoundBack as BackArrow,
  IoMdArrowRoundForward as ForwardArrow,
} from "react-icons/io";
import { CgMathPlus as AddIcon } from "react-icons/cg";
import { useSlides } from "./hooks/useSlides";
import { Button } from "../../common/components/button";
import { OpeningSlide } from "./components/openingSlide";
import { Slide } from "./components/slide";
import { EditAddSlideModal } from "./components/editAddSlideModal";

// Type for URL parameters
type slideScreenParams = {
  title: string;
};

// Enum for slide position (before or after)
enum Position {
  BEFORE = "before",
  AFTER = "after",
}

// Enum for modal mode (view, add, edit)
enum Mode {
  VIEW = "view",
  ADD = "add",
  EDIT = "edit",
}

export const SlideScreen: FC = () => {
  // Retrieve presentation title from URL parameters
  const { title: presentationTitle = "" } = useParams<slideScreenParams>();
  const location = useLocation();
  const { authors, publishDate } = location.state;

  // Hooks to manage slide data and UI state
  const { slides, loading, error, updateSlide, addSlide, deleteSlide } =
    useSlides(presentationTitle);
  const [slideIndex, setSlideIndex] = useState(0);
  const [addSlideIndex, setAddSlideIndex] = useState(0);

  // Modal state
  const [modalHeader, setModalHeader] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Mode to determine the action to be performed in the modal (add or edit)
  const [mode, setMode] = useState<Mode>(Mode.VIEW);
  const navigate = useNavigate();

  /* 
    Handle modal apply click action based on the mode
    If in EDIT mode, update the slide
    If in ADD mode, add the slide
  */
  const modalOnApply = async () => {
    if (mode === Mode.ADD) {
      await addSlide(addSlideIndex, modalTitle, modalContent);
      setSlideIndex(slideIndex + 1);
    } else if (mode === Mode.EDIT) {
      await updateSlide(slideIndex, modalTitle, modalContent);
    }
    setModalVisible(false);
    setMode(Mode.VIEW);
  };

  // Handle modal cancel action
  const modalOnCancel = () => {
    setModalVisible(false);
    setMode(Mode.VIEW);
  };

  // Prepare and show modal based on the current mode
  const showModal = () => {
    setModalHeader(mode === Mode.EDIT ? "Edit Slide" : "Add New Slide");
    setModalTitle(mode === Mode.EDIT ? slides[slideIndex].title : "");
    setModalContent(mode === Mode.EDIT ? slides[slideIndex].content : "");
    setModalVisible(true);
  };

  // Set the mode to EDIT when edit button is clicked
  const onEditSlideClick = () => {
    setMode(Mode.EDIT);
  };

  // Handle slide deletion
  const onDeleteSlideClick = () => {
    deleteSlide(presentationTitle, slideIndex);
    setSlideIndex(slideIndex - 1);
  };

  // Set the mode to ADD and determine the position of the new slide
  const onAddSlideClick = (position: Position) => {
    setAddSlideIndex(
      position === Position.AFTER ? slideIndex + 1 : slideIndex - 1
    );
    setMode(Mode.ADD);
  };

  // Navigate to the next slide
  const nextSlide = () => {
    setSlideIndex(slideIndex + 1);
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setSlideIndex(slideIndex - 1);
  };

  // Show the modal when mode is ADD or EDIT
  useEffect(() => {
    if (mode === Mode.ADD || mode === Mode.EDIT) showModal();
  }, [mode]);

  // Display loading or error messages
  if (loading) return <span>loading...</span>;
  if (error) return <span>error fetching slides!</span>;

  return (
    <div className={styles.container}>
      <div className={styles.addContainer}>
        {/* Button to navigate back to the home screen */}
        <Button
          className={styles.backButton}
          onClick={() => {
            navigate("/");
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <BackArrow />
            <span>Home</span>
          </div>
        </Button>
        {/* Button to add a new slide before the current slide */}
        <Button
          onClick={() => {
            onAddSlideClick(Position.BEFORE);
          }}
          disabled={slideIndex === 0}
        >
          <AddIcon />
        </Button>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.slideContainer}>
          {/* Display opening slide or current slide based on slideIndex */}
          {slideIndex === 0 ? (
            <OpeningSlide
              title={presentationTitle}
              authors={authors}
              publishDate={publishDate}
            />
          ) : (
            <Slide
              title={slides[slideIndex].title}
              content={slides[slideIndex].content}
              onEditClick={onEditSlideClick}
              onDeleteClick={onDeleteSlideClick}
              editDisabled={slideIndex === 0}
              deleteDisabled={slideIndex === 0}
            />
          )}
        </div>
        <div className={styles.navigationContainer}>
          {/* Button to navigate to the previous slide */}
          <Button onClick={prevSlide} disabled={slideIndex === 0}>
            <BackArrow />
          </Button>
          <span>
            {slideIndex + 1} / {slides.length}
          </span>
          {/* Button to navigate to the next slide */}
          <Button
            onClick={nextSlide}
            disabled={slideIndex === slides.length - 1}
          >
            <ForwardArrow />
          </Button>
        </div>
      </div>
      <div className={styles.addContainer}>
        {/* Button to add a new slide after the current slide */}
        <Button
          onClick={() => {
            onAddSlideClick(Position.AFTER);
          }}
        >
          <AddIcon />
        </Button>
      </div>

      {/* Modal for adding or editing slides */}
      <EditAddSlideModal
        header={modalHeader}
        title={modalTitle}
        content={modalContent}
        onTitleChange={setModalTitle}
        onContentChange={setModalContent}
        onApply={modalOnApply}
        onCancel={modalOnCancel}
        visible={modalVisible}
      />
    </div>
  );
};
