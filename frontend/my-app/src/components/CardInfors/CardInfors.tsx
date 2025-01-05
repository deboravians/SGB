import React from "react";
import styles from "./cardInfors.module.css";

interface CardResumoProps {
  quantidade: number;
  descricao: string;
}

const CardInfors: React.FC<CardResumoProps> = ({ quantidade, descricao }) => {
  return (
    <div className={styles.card}>

      <strong><p>{quantidade}</p></strong>
      <span>{descricao}</span>

    </div>
  );
};

export default CardInfors;
