import { useTypedSelector } from "../../store";
import "react-calendar/dist/Calendar.css";

const ProjectList = () => {
  const projects = useTypedSelector(state => state.resume.project);

  return (
    <section className="projects">
      <h2 className="title">Опыт работы </h2>
      <ul className="project__list">
        {projects.map(project => (
          <li key={project.title} className="project__item">
            <div className="project__header">
              <h3 className="project__title">{project.title}</h3>
              <div className="project__date">{project.date}</div>
            </div>

            <p>{project.description}</p>
            {project.stack && <p>Используемые технологии: {project.stack}</p>}
            {project.link && (
              <a href={project.link} className="project__link">
                Больше об этом и других проектах на гитхабе
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectList;
