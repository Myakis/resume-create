import moment from "moment";
import React, { FC, useState } from "react";
import "moment-precise-range-plugin";
import Calendar from "react-calendar";

import { getDateFormat } from "../../../utils/declinationOfNumeral";

interface IProps {
  closeModal: () => void;
  setValues: (field: string, value: any) => void;
  values: string;
}

const ModalChangeDateForm: FC<IProps> = ({ closeModal, setValues, values }) => {
  const [startWorked, setStartWorked] = useState(
    moment().subtract(1, "month").toDate(),
  );
  const [endWorked, setEndWorked] = useState(new Date()) as any;

  const a = moment(new Date(startWorked).toISOString());
  const b = moment(new Date(endWorked).toISOString());

  const nowTime =
    moment(endWorked).format("YYYY.MM.DD") === moment().format("YYYY.MM.DD")
      ? "по настоящие время"
      : moment(endWorked).format("YYYY.MM.DD");

  const periodDate = moment(startWorked).format("YYYY.MM.DD") + " - " + nowTime;

  const data = getDateFormat(moment.preciseDiff(b, a, true));

  const closeModalHandler = () => {
    if (new Date(endWorked).getTime() - new Date(startWorked).getTime() > 0) {
      closeModal();
      setValues(values, periodDate);
    } else {
      alert("Выберете корректные даты");
    }
  };

  return (
    <form className="modal-change-date__form">
      <Calendar
        locale="ru"
        value={startWorked}
        onChange={setStartWorked}
        defaultActiveStartDate={startWorked}
        maxDate={endWorked}
      />
      <Calendar
        locale="ru"
        minDate={startWorked}
        value={endWorked}
        onChange={setEndWorked}
        maxDate={new Date()}
      />
      <div className="modal-change-date__button-wrapper">
        <span className="button button--black" onClick={closeModalHandler}>
          <span>Подтвердить</span>
        </span>
        <span
          onClick={closeModal}
          className="modal-change-date__button"
          aria-label="Отмена">
          <span>Отмена</span>
        </span>
      </div>
      {data}
    </form>
  );
};

export default ModalChangeDateForm;
