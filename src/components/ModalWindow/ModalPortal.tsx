// ИСПОЛЬЗУЮТСЯ РЕНДЕР ПРОПСЫ!!!!
import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export interface IModal {
  isOpen: boolean;
  closeModal: () => void;
}

interface IProps {
  children: React.ReactNode;
}

const ModalPortal: FC<IProps> = React.memo(({ children }) => {
  const [root, setRoot] = useState(null) as any;

  useEffect(() => {
    setRoot(document.createElement("div"));
    return () => {
      if (root) {
        document.body.removeChild(root);
      }
    };
  }, []);

  useEffect(() => {
    if (root) {
      document.body.appendChild(root);
    }
  }, [root]);

  if (root === null) return null;

  return ReactDOM.createPortal(children, root);
});

export default ModalPortal;

//Настройки для отображения модального окна
export const settingsModal = {
  open: {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
    scale: 1,
  },
  closed: { opacity: 0, visibility: "hidden", scale: 1.2 },
};
