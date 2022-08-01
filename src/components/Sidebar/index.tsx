import { Field, Formik } from "formik";
import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store";
import { resumeActions } from "../../store/resume/action";
import { SpriteSVG } from "../Sprite";
import mockIMG from "../../assets/img/no-image.jpg";
// import { crop } from "../../helpers/canvasIMG";
import PrevImageBlock from "../PrevImageBlock";

type TDataForm = {
  email: string;
  file: Blob;
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const imageRef = useRef<HTMLInputElement>(null);
  const image = useTypedSelector(state => state.resume.aboutMe.imgUrl);
  const [isPrevImage, setPrevImage] = useState(false);
  const [prevImageFile, setPrevImageFile] = useState<File | null>(null);
  const isEditor = useTypedSelector(state => state.resume.editor);

  return (
    <aside className="sidebar">
      <div className="sidebar__photo-container">
        <div
          className="sidebar__photo"
          onClick={() => imageRef.current?.click()}>
          <img src={image || mockIMG} alt="" />
        </div>
        {isPrevImage && <PrevImageBlock file={prevImageFile} />}
      </div>
      <div className="sidebar-wrapper">
        {!isEditor && (
          <ul className="sidebar__about">
            <div className="sidebar__info">
              <span>
                <SpriteSVG iconWidth={18} iconHeight={18} iconId="age" />
              </span>
              <p>20 лет</p>
            </div>
            <div className="sidebar__info">
              <span>
                <SpriteSVG iconHeight={18} iconWidth={20} iconId="location" />
              </span>
              <p>Россия, Уссурийск</p>
            </div>
            <div className="sidebar__info">
              <span>
                <SpriteSVG iconHeight={18} iconWidth={20} iconId="phone" />
              </span>
              <p>8 999 040 51 97</p>
            </div>
          </ul>
        )}
        {isEditor && (
          <Formik
            initialValues={{ file: null, age: "", location: "", phone: "" }}
            validate={values => {
              const errors = {} as TDataForm;
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.file) {
                const reader = new FileReader();
                reader.readAsDataURL(values.file!);
                reader.onload = () => {
                  dispatch(resumeActions.setImage(reader.result));
                };
              }
              setPrevImage(false);
              setSubmitting(false);
            }}>
            {({
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => {
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
                      console.log(
                        typeImages.includes(fileImg.type.split("/")[1]),
                      );
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
                        <Field
                          placeholder="Введите номер телефона"
                          type="tel"
                          name={"phone"}
                        />
                      </div>
                    </ul>
                  }

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              );
            }}
          </Formik>
        )}

        <section className="sidebar__skills">
          <h2 className="title">Hard Skills</h2>
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <span></span> HTML 5 / Bootstrap
            </li>
          </ul>
          <div className="downland"></div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
