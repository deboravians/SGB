declare module "react-input-mask" {
    import { Component, InputHTMLAttributes } from "react";
  
    interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
      mask: string;
      maskChar?: string | null;
      alwaysShowMask?: boolean;
    }
  
    export default class InputMask extends Component<InputMaskProps> {}
  }
  