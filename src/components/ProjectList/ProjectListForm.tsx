import { FastField, Field, FieldArray } from "formik";
import React, { FC, Fragment, useState } from "react";
import cn from "classnames";

import "react-calendar/dist/Calendar.css";
import { TValuesForm } from "../../models/resume";
import ModalChangeDate from "../ModalWindow/ModalChangeDate/ModalChangeDate";
import ModalPortal from "../ModalWindow/ModalPortal";
import { SpriteSVG } from "../Sprite";
import { SvgCalendar, SvgDelete } from "../Sprite/svg";

interface IProps {
  values: TValuesForm;
  errors: TValuesForm | any;
  touched: TValuesForm | any;
  onAddChangeField: () => void;
  setFieldValue: (field: string, value: any) => void;
  onDeleteChangeField: (id: number) => void;
}

const ProjectListForm: FC<IProps> = React.memo(
  ({
    errors,
    onAddChangeField,
    onDeleteChangeField,
    setFieldValue,
    touched,
    values,
  }) => {
    const [isOpen, setOpen] = useState<{
      index: number | null;
      isOpen: boolean;
    }>({ index: null, isOpen: false });

    const onCloseHandler = () => {
      setOpen(prev => ({
        ...prev,
        isOpen: false,
      }));
    };

    return (
      <section className="projects">
        <h2 className="title">Опыт работы </h2>

        {}
        <span className="sidebar__skills-add" onClick={onAddChangeField}>
          Добавить опыт работы
        </span>
        <ul className="sidebar__list">
          <FieldArray name="project">
            {() =>
              values!.project!.map((item, i: number) => {
                const projectError =
                  (errors.project?.length && errors.project[i]) || ({} as any);

                const projectTouched =
                  (touched.project?.length && touched.project[i]) || {};

                return (
                  <li className="project__item" key={`${item.name} + ${i}`}>
                    <div className="project__header">
                      <div style={{ width: "100%" }}>
                        <FastField
                          placeholder="Введите название проекта"
                          name={`project.${i}.title`}
                          className={cn({
                            error: projectError.title && projectTouched.title,
                          })}
                        />

                        {projectError.title && projectTouched.title && (
                          <div className="error-text">{projectError.title}</div>
                        )}
                      </div>
                      <div>
                        <div className="project__date editor">
                          <Field name={`project.${i}.date`}>
                            {(prop: any) => {
                              return (
                                <ModalPortal>
                                  <ModalChangeDate
                                    index={i}
                                    setValues={setFieldValue}
                                    values={`project.${i}.date`}
                                    closeModal={onCloseHandler}
                                    isOpen={isOpen}
                                  />
                                </ModalPortal>
                              );
                            }}
                          </Field>

                          {/* <FastField hidden name={`project.${i}.date`}/> */}
                          <span
                            onClick={() => setOpen({ index: i, isOpen: true })}>
                            {item.date || (
                              <>
                                {/* <SpriteSVG
                                  iconWidth={12}
                                  iconHeight={12}
                                  iconId="calendar"
                                /> */}
                                <SvgCalendar/>
                                Дата
                              </>
                            )}
                          </span>
                        </div>
                        {projectError.date && projectTouched.date && (
                          <div className="error-text">{projectError.date}</div>
                        )}
                        <div
                          className="delete"
                          onClick={() => onDeleteChangeField(item.id!)}>
                          {/* <SpriteSVG
                            iconWidth={12}
                            iconHeight={12}
                            iconId="delete"
                          /> */}
                          <SvgDelete/>

                        </div>
                      </div>
                    </div>

                    <p>
                      <FastField
                        as="textarea"
                        placeholder="Описание проекта"
                        name={`project.${i}.description`}
                        className={cn({
                          error:
                            projectError.description &&
                            projectTouched.description,
                        })}
                      />
                    </p>
                    {projectError.description && projectTouched.description && (
                      <div className="error-text">
                        {projectError.description}
                      </div>
                    )}
                    <p>
                      <FastField
                        placeholder="Используемые технологии"
                        name={`project.${i}.stack`}
                        className={cn({
                          error: projectError.stack && projectTouched.stack,
                        })}
                      />
                    </p>
                  </li>
                );
              })
            }
          </FieldArray>
        </ul>
        <div className="downland"></div>
      </section>
    );
  },
);

export default ProjectListForm;
