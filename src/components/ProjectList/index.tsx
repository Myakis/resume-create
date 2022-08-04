import { Field, FieldArray, Formik } from "formik";
import React, { useState } from "react";

import { TProject } from "../../models/resume";
import { useTypedSelector } from "../../store";
import "react-calendar/dist/Calendar.css";
import ModalChangeDate from "../ModalWindow/ModalChangeDate/ModalChangeDate";
import ModalPortal from "../ModalWindow/ModalPortal";
import { SpriteSVG } from "../Sprite";

const ProjectList = () => {
  const isEditor = useTypedSelector(state => state.resume.editor);
  const project = useTypedSelector(state => state.resume.project);

  const [isOpen, setOpen] = useState<{ index: number | null; isOpen: boolean }>(
    { index: null, isOpen: false },
  );

  const closeOpenHandler = () => {
    setOpen(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <section className="projects">
      <h2 className="title">Опыт работы </h2>
      {!isEditor ? (
        <ul className="project__list">
          <li className="project__item">
            <div className="project__header">
              <h3 className="project__title">Социальная сеть</h3>
              <div className="project__date">01.12.2021 - 20.03.2022</div>
            </div>

            <p>
              Самый крупный проект на данный момент. Имеется страница входа (все
              формы валидированы). Страница профиля (редактируемая, все данные
              хранятся на сервере). Страница новостей (сортировка новостей,
              бесконечная пагинация). Страница с личными сообщениями. Общий чат
              (используется WebSocket). Страница пользователя (пагинация
              страниц, возможность подписки/отписки, просмотр профиля, написание
              личного сообщения, поиск по имени, сортировка по подписке).
            </p>
            <p>
              Используемые технологии: React, Redux, React-router, TypeScript,
              Redux-final-form, formik, webSocket, Rest APi, axios, redux-thunk
            </p>
            <a
              href="https://github.com/Myakis/social-network-app"
              className="project__link">
              Больше об этом и других проектах на гитхабе
            </a>
          </li>
        </ul>
      ) : (
        <Formik
          initialValues={{
            project: project as TProject[],
          }}
          validate={values => {
            const errors = {} as any;
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);

            setSubmitting(false);
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            setValues,
            isSubmitting,
            values,
          }) => {
            // Добавление поля для работы
            const onAddChangeField = () => {
              const project = [...values.project];
              project.push({
                id: (values.project[values.project.length - 1]?.id || 0) + 1,
                date: "",
                title: "",
                description: "",
              });
              setValues({ ...values, project });
            };

            // Удаление поля для хард скилла
            const onDeleteChangeField = (id: number) => {
              const project = [...values.project];
              setValues({
                ...values,
                project: project.filter(item => item.id !== id),
              });
            };

            return (
              <form onSubmit={handleSubmit}>
                {}
                <span
                  className="sidebar__skills-add"
                  onClick={onAddChangeField}>
                  Добавить опыт работы
                </span>
                <ul className="sidebar__list">
                  <FieldArray name="project">
                    {() =>
                      values.project.map((item, i) => {
                        const projectError =
                          (errors.project?.length && errors.project[i]) ||
                          ({} as any);

                        const projectTouched =
                          (touched.project?.length && touched.project[i]) || {};

                        return (
                          <li
                            className="project__item"
                            key={`${item.name} + ${i}`}>
                            <div className="project__header">
                              <Field
                                placeholder="Введите название проекта"
                                name={`project.${i}.title`}
                              />

                              <div className="project__date">
                                {/* 01.12.2021 - 20.03.2022 */}
                                <Field
                                  hidden
                                  placeholder="Описание проекта"
                                  name={`project.${i}.date`}
                                />
                                <Field name={`project.${i}.date`}>
                                  {(prop: any) => {
                                    return (
                                      <ModalPortal>
                                        <ModalChangeDate
                                          index={i}
                                          setValues={setFieldValue}
                                          values={prop.field.name}
                                          closeModal={closeOpenHandler}
                                          isOpen={isOpen}
                                        />
                                      </ModalPortal>
                                    );
                                  }}
                                </Field>
                                <span
                                  onClick={() =>
                                    setOpen({ index: i, isOpen: true })
                                  }
                                  className={projectError.date && "error"}>
                                  {item.date || "Выберете дату"}
                                </span>
                              </div>
                              <div
                                className="delete"
                                onClick={() => onDeleteChangeField(item.id!)}>
                                <SpriteSVG
                                  iconWidth={12}
                                  iconHeight={12}
                                  iconId="delete"
                                />
                              </div>
                            </div>

                            <p>
                              <Field
                                as="textarea"
                                placeholder="Описание проекта"
                                name={`project.${i}.description`}
                              />
                            </p>
                            <p>
                              Используемые технологии: React, Redux,
                              React-router, TypeScript, Redux-final-form,
                              formik, webSocket, Rest APi, axios, redux-thunk{" "}
                              <Field
                                placeholder="Используемые технологии"
                                name={`project.${i}.title`}
                              />
                            </p>
                          </li>
                        );
                      })
                    }
                  </FieldArray>
                </ul>
                <div className="downland"></div>

                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            );
          }}
        </Formik>
      )}
    </section>
  );
};

export default ProjectList;
