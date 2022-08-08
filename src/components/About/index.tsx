import { useTypedSelector } from "../../store";

const About = () => {
  const { description } = useTypedSelector(state => state.resume.aboutMe);

  return (
    <>
      {
        <section className="main__about about">
          <h2 className="title">Обо мне</h2>
          <p>{description || 'Тут будет ваше описание'}</p>
        </section>
      }
    </>
  );
};

export default About;
