import React from "react";
import InputMask from "react-input-mask";
import styles from "./InputMaskComponent.module.css"; // Se necessário, crie um CSS para estilização

interface InputMaskComponentProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mask: string;
  placeholder?: string;
  className?: string;
}

const InputMaskComponent: React.FC<InputMaskComponentProps> = ({
  label,
  value,
  onChange,
  mask,
  placeholder = "",
}) => {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <InputMask
        mask={mask}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default InputMaskComponent;
