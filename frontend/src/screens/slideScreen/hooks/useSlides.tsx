import { useEffect, useState } from "react";
import axios from "axios";
import { Slide } from "../../../types";

// Define the return type for the hook
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
  // State to store slides data, loading status, and error information
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch slides data from the API
  const fetchSlides = async () => {
    setLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/presentations/${presentationTitle}`;

    try {
      const { data } = await axios.get(url);
      // Add an opening slide as the first item in the slides array
      setSlides([
        {
          title: "opening slide",
          content: "opening slide",
        },
        ...data.slides,
      ]);
    } catch (e) {
      // Handle error if the request fails
      setError(e as Error);
    }

    setLoading(false);
  };

  // Use effect to fetch slides data when the component mounts
  useEffect(() => {
    fetchSlides();
  }, [presentationTitle]);

  // Function to update a specific slide
  const updateSlide = async (
    slideIndex: number,
    newTitle: string,
    newContent: string
  ) => {
    const url = `${
      process.env.REACT_APP_API_URL
    }/presentations/${presentationTitle}/slides/${slideIndex - 1}`;

    try {
      // Update the local state optimistically
      setSlides((prevSlides) =>
        prevSlides.map((slide, index) =>
          index === slideIndex
            ? { title: newTitle, content: newContent }
            : slide
        )
      );

      // Make API request to update the slide
      await axios.put(url, {
        title: newTitle,
        content: newContent,
      });
    } catch (error) {
      // Handle error if the request fails
      setError(new Error("Error updating slide"));
    }
  };

  // Function to add a new slide
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

      // Insert the new slide into the local state at the specified index
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides.splice(slideIndex, 0, newSlide);
        return updatedSlides;
      });

      // Make API request to add the new slide
      await axios.post(url, {
        title: slideTitle,
        content: slideContent,
        index: slideIndex - 1,
      });
    } catch (error) {
      // Handle error if the request fails
      setError(new Error("Error adding slide"));
    }
  };

  // Function to delete a specific slide
  const deleteSlide = async (presentationTitle: string, slideIndex: number) => {
    const url = `${
      process.env.REACT_APP_API_URL
    }/presentations/${presentationTitle}/slides/${slideIndex - 1}`;

    try {
      // Remove the slide from the local state
      setSlides((prevSlides) =>
        prevSlides.filter((_, index) => index !== slideIndex)
      );

      // Make API request to delete the slide
      await axios.delete(url);
    } catch (error) {
      // Handle error if the request fails
      setError(new Error("Error deleting slide"));
    }
  };

  // Return the current state and functions to interact with slides
  return { slides, loading, error, updateSlide, addSlide, deleteSlide };
};
