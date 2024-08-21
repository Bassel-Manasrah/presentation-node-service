import React, { FC, useState } from "react";
import styles from "./styles.module.css";

interface OpeningSlideProps {
  title: string;
  authors: string[];
  publishDate: Date;
}

export const OpeningSlide: FC<OpeningSlideProps> = ({
  title,
  authors,
  publishDate,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <p className={styles.title}>{title}</p>
        <p className={styles.authors}>Authors: {authors.join(", ")}</p>
        <p className={styles.publishDate}>
          Publish Date: {new Date(publishDate).toLocaleDateString("en-GB")}
        </p>
      </div>
    </div>
  );
};
