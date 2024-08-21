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

type slideScreenParams = {
  title: string;
};
enum Position {
  BEFORE = "before",
  AFTER = "after",
}

enum Mode {
  VIEW = "view",
  ADD = "add",
  EDIT = "edit",
}

export const SlideScreen: FC = () => {
  const { title: presentationTitle = "" } = useParams<slideScreenParams>();
  const location = useLocation();
  const { authors, publishDate } = location.state;

  const { slides, loading, error, updateSlide, addSlide, deleteSlide } =
    useSlides(presentationTitle);
  const [slideIndex, setSlideIndex] = useState(0);
  const [addSlideIndex, setAddSlideIndex] = useState(0);

  const [modalHeader, setModalHeader] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [mode, setMode] = useState<Mode>(Mode.VIEW);

  const navigate = useNavigate();

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

  const modalOnCancel = () => {
    setModalVisible(false);
    setMode(Mode.VIEW);
  };

  const showModal = () => {
    setModalHeader(mode === Mode.EDIT ? "Edit Slide" : "Add New Slide");
    setModalTitle(mode === Mode.EDIT ? slides[slideIndex].title : "");
    setModalContent(mode === Mode.EDIT ? slides[slideIndex].content : "");
    setModalVisible(true);
  };

  const onEditSlideClick = () => {
    setMode(Mode.EDIT);
  };

  const onDeleteSlideClick = () => {
    deleteSlide(presentationTitle, slideIndex);
    setSlideIndex(slideIndex - 1);
  };

  const onAddSlideClick = (position: Position) => {
    setAddSlideIndex(
      position === Position.AFTER ? slideIndex + 1 : slideIndex - 1
    );
    setMode(Mode.ADD);
  };

  const nextSlide = () => {
    setSlideIndex(slideIndex + 1);
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex - 1);
  };

  useEffect(() => {
    if (mode === Mode.ADD || mode === Mode.EDIT) showModal();
  }, [mode]);

  if (loading) return <span>loading...</span>;
  if (error) return <span>error fetching slides!</span>;

  return (
    <div className={styles.container}>
      <div className={styles.addContainer}>
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
          <Button onClick={prevSlide} disabled={slideIndex === 0}>
            <BackArrow />
          </Button>
          <span>
            {slideIndex + 1} / {slides.length}
          </span>
          <Button
            onClick={nextSlide}
            disabled={slideIndex === slides.length - 1}
          >
            <ForwardArrow />
          </Button>
        </div>
      </div>
      <div className={styles.addContainer}>
        <Button
          onClick={() => {
            onAddSlideClick(Position.AFTER);
          }}
        >
          <AddIcon />
        </Button>
      </div>

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
