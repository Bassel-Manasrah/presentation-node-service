import React, { useEffect, useState } from "react";
import axios from "axios";
import { Presentation } from "../../../types";

type Errors = {
  fetchError?: string;
  addError?: string;
  deleteError?: string;
};

// define the return type for the hook
type UsePresentationsReturn = {
  presentations: Presentation[];
  loading: boolean;
  errors: Errors;
  resetErrors: () => void;
  addPresentation: (title: string) => Promise<Presentation>;
  deletePresentation: (title: string) => Promise<void>;
};

export const usePresentations = (): UsePresentationsReturn => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  const fetchPresentations = async () => {
    const url = `${process.env.REACT_APP_API_URL}/presentations`;

    try {
      const { data } = await axios.get(url);
      setPresentations(data);
      setErrors({});
    } catch (e) {
      setErrors({ fetchError: "Failed to fetch presentations." });
    }

    setLoading(false);
  };

  const addPresentation = async (title: string) => {
    const url = `${process.env.REACT_APP_API_URL}/presentations`;

    try {
      const { data } = await axios.post(url, {
        title,
        authors: [process.env.REACT_APP_USERNAME],
      });
      setPresentations([...presentations, { title, authors: [] }]);
      setErrors({});
      return data.presentation;
    } catch (e) {
      console.log("error catched");
      setErrors({
        addError: "Title is already in use or failed to add presentation.",
      });
    }

    setLoading(false);
  };

  const deletePresentation = async (title: string) => {
    const url = `${process.env.REACT_APP_API_URL}/presentations/${title}`;

    try {
      const response = await axios.delete(url);
      setPresentations((prevPresentations) =>
        prevPresentations.filter((presentation) => presentation.title !== title)
      );
      setErrors({});
    } catch (e) {
      setErrors({ deleteError: "Failed to delete presentation." });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPresentations();
  }, []);

  const resetErrors = () => {
    setErrors({});
  };

  return {
    presentations,
    loading,
    errors,
    addPresentation,
    deletePresentation,
    resetErrors,
  };
};
