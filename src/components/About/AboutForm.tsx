import { Field } from "formik";
import { FC } from "react";
import cn from "classnames";

interface IProps {
  error: any;
  touched: any;
}

const AboutForm: FC<IProps> = ({ error, touched }) => {
  return (
    <>
      {
        <section className="main__about about">
          <h2 className="title">Обо мне</h2>
          <Field
            name={"description"}
            placeholder="Ваше описание "
            type="text"
            className={cn({
              error: error.description && touched.description,
            })}
          />
          {error.description && touched.description && (
            <span className="error-text">{error.description}</span>
          )}
        </section>
      }
    </>
  );
};

export default AboutForm;
