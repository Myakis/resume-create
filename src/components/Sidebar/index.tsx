import { Field, Formik } from "formik";
import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import MaskedInput from "react-text-mask";
import cn from "classnames";

import { useTypedSelector } from "../../store";
import { resumeActions } from "../../store/resume/action";
import { SpriteSVG } from "../Sprite";
import mockIMG from "../../assets/img/no-image.jpg";
import PrevImageBlock from "../PrevImageBlock";
import { TEL_REGEX } from "../../helpers/constants";

type TDataForm = {
  phone: string;
  location: string;
  age: string;
  file: Blob;
};

const Sidebar = () => {
  const allHardSkills = useTypedSelector(state => state.resume.hardSkills);
  const image = useTypedSelector(state => state.resume.aboutMe.imgUrl);
  const isEditor = useTypedSelector(state => state.resume.editor);
  const { aboutMe } = useTypedSelector(state => state.resume);

  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const [isPrevImage, setPrevImage] = useState(false);
  const [prevImageFile, setPrevImageFile] = useState<File | null>(null);

  return (
    <aside className="sidebar">
      <div className="sidebar__photo-container">
        <div
          className={cn({ touch: isEditor }, "sidebar__photo ")}
          onClick={() => imageRef.current?.click()}>
          <img src={image || mockIMG} alt="" />
        </div>
        {isPrevImage && <PrevImageBlock file={prevImageFile} />}
      </div>
      <div className="sidebar-wrapper">
        {!isEditor && (
          <>
            <ul className="sidebar__about">
              <div className="sidebar__info">
                <span>
                  <SpriteSVG iconWidth={18} iconHeight={18} iconId="age" />
                </span>
                <p>{aboutMe.age} лет</p>
              </div>
              <div className="sidebar__info">
                <span>
                  <SpriteSVG iconHeight={18} iconWidth={20} iconId="location" />
                </span>
                <p>{aboutMe.location}</p>
              </div>
              <div className="sidebar__info">
                <span>
                  <SpriteSVG iconHeight={18} iconWidth={20} iconId="phone" />
                </span>
                <p>{aboutMe.phone}</p>
              </div>
            </ul>
            <section className="sidebar__skills">
              <h2 className="title">Hard Skills</h2>
              <ul className="sidebar__list">
                {allHardSkills.map(item => (
                  <li className="sidebar__item" key={item.name}>
                    <span></span> {item.name}
                  </li>
                ))}
              </ul>
              <div className="downland"></div>
            </section>
          </>
        )}
        {isEditor && (
          <Formik
            initialValues={{
              file: null,
              age: aboutMe.age,
              location: aboutMe.location,
              phone: aboutMe.phone,
              hardSkills: allHardSkills,
            }}
            validate={values => {
              const errors = {} as TDataForm;
              if (!values.location) {
                errors.location = " Обязательное поле";
              }
              if (!values.age) {
                errors.age = "Обязательное поле";
              } else if (/\D/.test(values.age)) {
                errors.age = "Только цифры";
              } else if (+values.age < 0 || +values.age > 120) {
                errors.age = "Возраст должен быть в диапазоне от 0 до 120";
              }
              if (!values.phone) {
                errors.phone = "Обязательное поле";
              } else if (!TEL_REGEX.test(values.phone)) {
                errors.phone = "Невалидные номер";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { age, phone, location, ...rest } = values;

              const newParamsResume = {
                ...rest,
                aboutMe: {
                  age,
                  phone,
                  location,
                },
              };

              if (values.file) {
                const reader = new FileReader();
                reader.readAsDataURL(values.file!);
                reader.onload = () => {
                  dispatch(resumeActions.setImage(reader.result));
                };
              }

              dispatch(resumeActions.setParams(newParamsResume));
              setPrevImage(false);
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
              // Добавление поля для хард скилла
              const onAddChangeField = () => {
                const hardSkills = [...values.hardSkills];
                hardSkills.push({
                  id:
                    (values.hardSkills[values.hardSkills.length - 1]?.id || 0) +
                    1,
                  name: "",
                });
                setValues({ ...values, hardSkills });
              };

              // Удаление поля для хард скилла
              const onDeleteChangeField = (id: number) => {
                const hardSkills = [...values.hardSkills];
                setValues({
                  ...values,
                  hardSkills: hardSkills.filter(item => item.id !== id),
                });
              };

              return (
                <form onSubmit={handleSubmit}>
                  <input
                    hidden
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={imageRef}
                    onChange={e => {
                      const fileImg = e.target.files![0];
                      const typeImages = ["png", "jpg", "jpeg"];
                      // Проверка по типу
                      if (!typeImages.includes(fileImg.type.split("/")[1])) {
                        alert(
                          `Тип изображения должен быть ${typeImages.join(
                            ", ",
                          )}`,
                        );
                        return null;
                      }
                      // Проверка на размер
                      if (fileImg.size / (1024 * 1024) < 3) {
                        setPrevImageFile(fileImg);
                        setPrevImage(true);
                        setFieldValue("file", fileImg);
                      } else {
                        alert("Превышает 2.5Мегабайта");
                      }
                    }}
                  />
                  {
                    <ul className="sidebar__about">
                      <div className="sidebar__info">
                        <span>
                          <SpriteSVG
                            iconWidth={18}
                            iconHeight={18}
                            iconId="age"
                          />
                        </span>
                        <Field
                          className={cn({ error: errors.age && touched.age })}
                          placeholder="Введите ваш возраст"
                          type="text"
                          name={"age"}
                        />
                      </div>
                      <div className="sidebar__info">
                        <span>
                          <SpriteSVG
                            iconHeight={18}
                            iconWidth={20}
                            iconId="location"
                          />
                        </span>
                        <Field
                          className={cn({
                            error: errors.location && touched.location,
                          })}
                          placeholder="Странна и город"
                          type="text"
                          name={"location"}
                        />
                      </div>
                      <div className="sidebar__info">
                        <span>
                          <SpriteSVG
                            iconHeight={18}
                            iconWidth={20}
                            iconId="phone"
                          />
                        </span>
                        <MaskedInput
                          className={cn({
                            error: errors.phone && touched.phone,
                          })}
                          value={values.phone!}
                          name={"phone"}
                          onChange={handleChange}
                          placeholder="Введите номер телефона"
                          mask={[
                            "+",
                            "7",
                            "(",
                            /[1-9]/,
                            /\d/,
                            /\d/,
                            ")",
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                          ]}
                        />
                      </div>
                    </ul>
                  }
                  <section className="sidebar__skills">
                    <h2 className="title">Hard Skills</h2>
                    <span
                      className="sidebar__skills-add"
                      onClick={onAddChangeField}>
                      Добавить скилл
                    </span>
                    <ul className="sidebar__list">
                      {values.hardSkills.map((item, i) => (
                        <li
                          className="sidebar__item"
                          key={`${item.name} + ${i}`}>
                          <span></span>
                          <Field
                            placeholder="Введите название скилла"
                            name={`hardSkills.${i}.name`}
                          />
                          <div
                            className="delete"
                            onClick={() => onDeleteChangeField(item.id!)}>
                            <SpriteSVG
                              iconWidth={12}
                              iconHeight={12}
                              iconId="delete"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="downland"></div>
                  </section>

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              );
            }}
          </Formik>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
