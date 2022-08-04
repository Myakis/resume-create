import { Field, Formik } from "formik";
import React from "react";
import { useTypedSelector } from "../../store";

const About = () => {
  const isEditor = useTypedSelector(state => state.resume.editor);
  return (
    <>
      {
        <section className="main__about about">
          <h2 className="title">Обо мне</h2>
          {!isEditor ? (
            <p>
              Меня зовут Андрей, мне 20 лет. Начал заниматься веб-разработкой
            </p>
          ) : (
            <Formik
              initialValues={{
                description: "",
              }}
              validate={values => {
                const errors = {} as any;

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
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
                return (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name={"description"}
                      placeholder="Ваше описание "
                      type="text"
                    />

                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </form>
                );
              }}
            </Formik>
          )}
        </section>
      }
    </>
  );
};

export default About;
