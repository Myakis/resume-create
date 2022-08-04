import React, { FC } from "react";
import { motion, Variants } from "framer-motion";
import ModalChangeDateForm from "./ModalChangeDateForm";
//Настройки для отображения модального окна
export const settingsModal: Variants = {
  open: {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
    scale: 1,
  },
  closed: { opacity: 0, visibility: "hidden", scale: 1.2 },
};

export interface IModal {
  isOpen: { index: number | null; isOpen: boolean };
  closeModal: () => void;
  setValues: (field: string, value: any) => void;
  values: string;
  index: number;
}

const ModalChangeDate: FC<IModal> = React.memo(
  ({ closeModal, isOpen, setValues, values, index }) => {
    return (
      <motion.div
        className="modal modal--preload modal--change-date"
        initial={false}
        animate={isOpen.isOpen && isOpen.index === index ? "open" : "closed"}
        variants={settingsModal}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal} />
          <div className="modal__content">
            <div className="modal-change-date">
              <div className="modal-change-date__wrapper">
                <div className="modal-change-date__content">
                  <span className="modal-change-date__title">
                    Период работы
                  </span>
                  <div className="modal-change-date__form-wrapper">
                    <ModalChangeDateForm
                      closeModal={closeModal}
                      setValues={setValues}
                      values={values}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="modal__close-btn"
              type="button">
              <svg width="18" height="18" aria-hidden="true">
                <path d="M17 1L1 17" stroke="white" />
                <path d="M1 1L17 17" stroke="white" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    );
  },
);

export default ModalChangeDate;
