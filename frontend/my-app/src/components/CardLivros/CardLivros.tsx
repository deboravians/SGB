import React from "react";
import styles from "./CardLivros.module.css";


interface CardLivrosProps {
  value: string;  
  label: string;  
}

const CardLivros: React.FC<CardLivrosProps> = ({ value, label }) => {
  return (
    <div className={`${styles.card} ${styles.cardVerde}`}>
      <strong className={styles.strong}>{value}</strong>
      <span>{label}</span>
    </div>
  );
};

export default CardLivros;

