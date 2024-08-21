import { useEffect, useState } from "react";
import axios from "axios";
import { Slide } from "../../../types";

// define the return type for the hook
type UseSlidesReturn = {
  slides: Slide[];
  loading: boolean;
  error: Error | null;
  updateSlide: (
    slideIndex: number,
    newTitle: string,
    newContent: string
  ) => void;
  addSlide: (
    slideIndex: number,
    slideTitle: string,
    slideContent: string
  ) => void;
  deleteSlide: (presentationTitle: string, slideIndex: number) => void;
};

export const useSlides = (presentationTitle: string): UseSlidesReturn => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSlides = async () => {
    setLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/presentations/${presentationTitle}`;

    try {
      const { data } = await axios.get(url);
      setSlides([
        {
          title: "opening slide",
          content: "opening slide",
        },
        ...data.slides,
      ]);
    } catch (e) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const updateSlide = async (
    slideIndex: number,
    newTitle: string,
    newContent: string
  ) => {
    const url = `${
      process.env.REACT_APP_API_URL
    }/presentations/${presentationTitle}/slides/${slideIndex - 1}`;

    try {
      // Update the local state
      setSlides((prevSlides) =>
        prevSlides.map((slide, index) =>
          index === slideIndex
            ? { title: newTitle, content: newContent }
            : slide
        )
      );

      const response = axios.put(url, {
        title: newTitle,
        content: newContent,
      });
    } catch (error) {
      setError(new Error("error updating slide"));
    }
  };

  const addSlide = async (
    slideIndex: number,
    slideTitle: string,
    slideContent: string
  ) => {
    const url = `${process.env.REACT_APP_API_URL}/presentations/${presentationTitle}/slides`;

    try {
      const newSlide: Slide = {
        title: slideTitle,
        content: slideContent,
      };

      // Insert the new slide at the specified index in the local state
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides.splice(slideIndex, 0, newSlide);
        return updatedSlides;
      });

      const response = await axios.post(url, {
        title: slideTitle,
        content: slideContent,
        index: slideIndex - 1,
      });
    } catch (error) {
      setError(new Error("error adding slide"));
    }
  };

  const deleteSlide = async (presentationTitle: string, slideIndex: number) => {
    const url = `${
      process.env.REACT_APP_API_URL
    }/presentations/${presentationTitle}/slides/${slideIndex - 1}`;

    try {
      setSlides((prevSlides) =>
        prevSlides.filter((_, index) => index !== slideIndex)
      );

      await axios.delete(url);
    } catch (error) {
      setError(new Error("error adding slide"));
    }
  };

  return { slides, loading, error, updateSlide, addSlide, deleteSlide };
};
