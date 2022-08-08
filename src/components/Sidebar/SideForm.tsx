import { FastField, Field, FieldArray, Formik } from "formik";
import React, { FC, useRef } from "react";
import { useState } from "react";
import MaskedInput from "react-text-mask";
import cn from "classnames";

import { useTypedSelector } from "../../store";
import { SpriteSVG } from "../Sprite";
import mockIMG from "../../assets/img/no-image.jpg";
import PrevImageBlock from "../PrevImageBlock";
import { PHONE_MASK } from "../../helpers/constants";

interface IProps {
  setFieldValue: (field: string, value: any) => void;
  errors: any;
  values: any;
  touched: any;
  onAddChangeField: () => void;
  onDeleteChangeField: (id: number) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

const SideForm: FC<IProps> = ({
  setFieldValue,
  errors,
  values,
  onAddChangeField,
  onDeleteChangeField,
  touched,
  handleChange,
}) => {
  const image = useTypedSelector(state => state.resume.aboutMe.imgUrl);
  const isEditor = useTypedSelector(state => state.resume.editor);

  const imageRef = useRef<HTMLInputElement>(null);

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
        <input
          hidden
          type="file"
          name="file"
          accept=".png, .jpg, .jpeg"
          ref={imageRef}
          onChange={e => {
            const fileImg = e.target.files![0];
            const typeImages = ["png", "jpg", "jpeg"];
            // Проверка по типу
            if (!typeImages.includes(fileImg.type.split("/")[1])) {
              alert(`Тип изображения должен быть ${typeImages.join(", ")}`);
              return null;
            }
            // Проверка на размер
            if (fileImg.size / (1024 * 1024) < 3) {
              setPrevImageFile(fileImg);
              setPrevImage(true);
              setFieldValue("file", fileImg);
            } else {
              alert("Превышает 3 мб");
            }
          }}
        />
        {errors.file && touched.file && errors.file}
        {
          <ul className="sidebar__about">
         
            <div className="sidebar__info">
              <span>
                <SpriteSVG iconWidth={18} iconHeight={18} iconId="age" />
              </span>
              <Field
                autoFocus={errors.age}
                className={cn({ error: errors.age && touched.age })}
                placeholder="Введите ваш возраст"
                type="text"
                name={"age"}
              />
              {errors.age && touched.age && (
                <div className="error-text">{errors.age}</div>
              )}
            </div>
            <div className="sidebar__info">
              <span>
                <SpriteSVG iconHeight={18} iconWidth={20} iconId="location" />
              </span>
              <Field
                className={cn({
                  error: errors.location && touched.location,
                })}
                placeholder="Странна и город"
                type="text"
                name={"location"}
              />
              {errors.location && touched.location && (
                <div className="error-text">{errors.location}</div>
              )}
            </div>
            <div className="sidebar__info">
              <span>
                <SpriteSVG iconHeight={18} iconWidth={20} iconId="phone" />
              </span>
              <MaskedInput
                className={cn({
                  error: errors.phone && touched.phone,
                })}
                value={values.phone!}
                name={"phone"}
                onChange={handleChange}
                placeholder="Введите номер телефона"
                mask={PHONE_MASK}
              />
              {errors.phone && touched.phone && (
                <div className="error-text">{errors.phone}</div>
              )}
            </div>
          </ul>
        }
        <section className="sidebar__skills">
          <h2 className="title">Hard Skills</h2>
          <span className="sidebar__skills-add" onClick={onAddChangeField}>
            Добавить скилл
          </span>
          <ul className="sidebar__list">
            <FieldArray name="hardSkills">
              {() =>
                values.hardSkills.map(
                  (item: { name: any; id: number; title: string }, i: any) => {
                    const hardSkillsError =
                      (errors.hardSkills?.length && errors.hardSkills[i]) ||
                      ({} as any);

                    const hardSkillsTouched =
                      (touched.hardSkills?.length && touched.hardSkills[i]) ||
                      {};

                    return (
                      <li
                        className="sidebar__item"
                        key={`${item.title} + ${i}`}>
                        <FastField
                          placeholder="Введите название скилла"
                          name={`hardSkills.${i}.name`}
                          className={cn({
                            error:
                              hardSkillsError.name && hardSkillsTouched.name,
                          })}
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
                    );
                  },
                )
              }
            </FieldArray>
          </ul>
          <div className="downland"></div>
        </section>
      </div>
    </aside>
  );
};

export default SideForm;
