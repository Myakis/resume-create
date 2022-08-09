import * as yup from "yup";
import { Field, Formik, } from "formik";
import { useDispatch } from "react-redux";
import cn from "classnames";
import React, { useEffect } from "react";

import AboutForm from "../../components/About/AboutForm";
import ProjectListForm from "../../components/ProjectList/ProjectListForm";
import SideForm from "../../components/Sidebar/SideForm";
import { TEL_REGEX } from "../../helpers/constants";
import { TProject, TValuesForm } from "../../models/resume";
import { useTypedSelector } from "../../store";
import { resumeActions } from "../../store/resume/action";

const ResumeForm = React.memo(() => {
  const isEditor = useTypedSelector(state => state.resume.editor);
  const dispatch = useDispatch();
  const { aboutMe } = useTypedSelector(state => state.resume);
  const allHardSkills = useTypedSelector(state => state.resume.hardSkills);
  const project = useTypedSelector(state => state.resume.project);

  const onChangeEditor = () => {
    dispatch(resumeActions.globalEditor(!isEditor));
  };

  const onSubmitHandler = (values: TValuesForm, { setSubmitting }: any) => {
    const {
      age,
      phone,
      location,
      description,
      fullName,
      jobPosition,
      ...rest
    } = values;

    const newParamsResume = {
      ...rest,
      aboutMe: {
        age,
        phone,
        location,
        description,
        jobPosition,
        fullName,
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
    setSubmitting(false);

    onChangeEditor();
    setSubmitting(false);
  };
  const validationScheme = yup.object().shape({
    fullName: yup.string().required("Обязательное поле для заполнения"),
    description: yup
      .string()
      .required("Обязательное поле для заполнения")
      .nullable(),
    jobPosition: yup.string().required("Обязательное поле для заполнения"),
    location: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательное поле для заполнения"),
    age: yup
      .number()
      .typeError("Должно быть числом")
      .required("Обязательное поле для заполнения"),
    phone: yup
      .string()
      .matches(TEL_REGEX, "Телефон не валидный")
      .required("Обязательно поле для заполнения")
      .nullable(),
    hardSkills: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Обязательно поле для заполнения"),
      }),
    ),
    project: yup.array().of(
      yup.object().shape({
        title: yup.string().required("Обязательно поле для заполнения"),
        date: yup.string().required("Обязательно поле"),
        description: yup
          .string()
          .required("Обязательно поле для заполнения")
          .test(
            "length",
            "Минимальное описание на 50 символов",
            val => !!val && val.length > 50,
          ),
      }),
    ),
  });

  return (
    <div>
      <Formik
        initialValues={{
          fullName: aboutMe.fullName,
          jobPosition: aboutMe.jobPosition,
          description: aboutMe.description,
          file: null,
          age: aboutMe.age,
          location: aboutMe.location,
          phone: aboutMe.phone,
          hardSkills: allHardSkills,
          project: project as TProject[],
        }}
        validationSchema={validationScheme}
        onSubmit={onSubmitHandler}>
        {({
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          setValues,
          isSubmitting,
          setSubmitting,
          isValidating,
          values,
        }) => {
          // Добавление поля для хард скилла
          const onAddFieldSkills = () => {
            const hardSkills = [...values.hardSkills];
            hardSkills.push({
              id:
                (values.hardSkills[values.hardSkills.length - 1]?.id || 0) + 1,
              name: "",
            });
            setValues({ ...values, hardSkills });
          };

          // Удаление поля для хард скилла
          const onDeleteFieldField = (id: number) => {
            const hardSkills = [...values.hardSkills];
            setValues({
              ...values,
              hardSkills: hardSkills.filter(item => item.id !== id),
            });
          };

          // Добавление поля для работы
          const onAddFieldProject = () => {
            const project = [...values.project];
            project.push({
              id: (values.project[values.project.length - 1]?.id || 0) + 1,
              date: "",
              title: "",
              description: "",
              stack: "",
            });
            setValues({ ...values, project });
          };

          // Удаление поля для хард скилла
          const onDeleteFieldProject = (id: number) => {
            const project = [...values.project];
            setValues({
              ...values,
              project: project.filter(item => item.id !== id),
            });
          };
          // Фокус на невалидное поле
          if (isSubmitting) {
            // @ts-ignore
            document.querySelector("form.d-flex .error")?.focus();
            document
              .querySelector("form .error")
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          }

          return (
            <form className="d-flex" onSubmit={handleSubmit}>
              <SideForm
                errors={errors}
                handleChange={handleChange}
                onAddChangeField={onAddFieldSkills}
                onDeleteChangeField={onDeleteFieldField}
                setFieldValue={setFieldValue}
                touched={touched}
                values={values}
              />
              <div className="main__wrapper">
                <div className="sidebar__name">
                  <Field
                    name={"fullName"}
                    placeholder="Ваше ФИО"
                    type="text"
                    className={cn({
                      error: errors.fullName && touched.fullName,
                    })}
                  />
                  {errors.fullName && touched.fullName && (
                    <div className="error-text">{errors.fullName}</div>
                  )}
                  <div className="sidebar__job">
                    <Field
                      name={"jobPosition"}
                      placeholder="Ваша должность"
                      type="text"
                      className={cn({
                        error: errors.jobPosition && touched.jobPosition,
                      })}
                    />

                    {errors.jobPosition && touched.jobPosition && (
                      <div className="error-text">{errors.jobPosition}</div>
                    )}
                  </div>
                </div>
                <main className="main">
                  <AboutForm error={errors} touched={touched} />
                  <ProjectListForm
                    errors={errors}
                    onAddChangeField={onAddFieldProject}
                    onDeleteChangeField={onDeleteFieldProject}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    values={values}
                  />
                </main>
                <button className="editor-btn" disabled={isSubmitting}>
                  Сохранить
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
});

export default ResumeForm;
