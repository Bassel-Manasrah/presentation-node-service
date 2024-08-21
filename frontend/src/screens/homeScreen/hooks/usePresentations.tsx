import React, { useEffect, useState } from "react";
import axios from "axios";
import { Presentation } from "../../../types";

// Define the shape of possible error messages
type Errors = {
  fetchError?: string;
  addError?: string;
  deleteError?: string;
};

// Define the return type for the hook
type UsePresentationsReturn = {
  presentations: Presentation[];
  loading: boolean;
  errors: Errors;
  resetErrors: () => void;
  addPresentation: (title: string) => Promise<Presentation>;
  deletePresentation: (title: string) => Promise<void>;
};

export const usePresentations = (): UsePresentationsReturn => {
  // State to store presentations data, loading status, and error information
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  // Fetch presentations data from the API
  const fetchPresentations = async () => {
    const url = `${process.env.REACT_APP_API_URL}/presentations`;

    try {
      const { data } = await axios.get(url);
      // Set presentations data and clear errors on successful fetch
      setPresentations(data);
      setErrors({});
    } catch (e) {
      // Handle error if the request fails
      setErrors({ fetchError: "Failed to fetch presentations." });
    }

    setLoading(false);
  };

  // Function to add a new presentation
  const addPresentation = async (title: string) => {
    const url = `${process.env.REACT_APP_API_URL}/presentations`;

    try {
      const { data } = await axios.post(url, {
        title,
        authors: [process.env.REACT_APP_USERNAME], // Add author information
      });
      // Update state with the new presentation and clear errors
      setPresentations([...presentations, { title, authors: [] }]);
      setErrors({});
      return data.presentation; // Return the added presentation data
    } catch (e) {
      // Handle error if the request fails
      setErrors({
        addError: "Title is already in use or failed to add presentation.",
      });
    }

    setLoading(false);
  };

  // Function to delete a presentation by its title
  const deletePresentation = async (title: string) => {
    const url = `${process.env.REACT_APP_API_URL}/presentations/${title}`;

    try {
      // Remove the presentation from local state
      setPresentations((prevPresentations) =>
        prevPresentations.filter((presentation) => presentation.title !== title)
      );
      await axios.delete(url);
      setErrors({});
    } catch (e) {
      // Handle error if the request fails
      setErrors({ deleteError: "Failed to delete presentation." });
    }

    setLoading(false);
  };

  // Fetch presentations data when the component mounts
  useEffect(() => {
    fetchPresentations();
  }, []);

  // Function to reset error messages
  const resetErrors = () => {
    setErrors({});
  };

  // Return the current state, functions to manage presentations, and error handling
  return {
    presentations,
    loading,
    errors,
    addPresentation,
    deletePresentation,
    resetErrors,
  };
};
