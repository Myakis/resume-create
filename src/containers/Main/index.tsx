import { Field, Formik } from "formik";
import { useDispatch } from "react-redux";
import About from "../../components/About";
import ProjectList from "../../components/ProjectList";
import Sidebar from "../../components/Sidebar/index";
import { useTypedSelector } from "../../store";
import { resumeActions } from "../../store/resume/action";

const MainPage = () => {
  const isEditor = useTypedSelector(state => state.resume.editor);
  const { fullName, jobPosition } = useTypedSelector(
    state => state.resume.aboutMe,
  );
  const dispatch = useDispatch();

  const changeEditor = () => {
    dispatch(resumeActions.globalEditor(!isEditor));
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main__wrapper">
        <div className="sidebar__name">
          {fullName}
          <div className="sidebar__job">{jobPosition}</div>
        </div>
        <main className="main">
          <About />
          <ProjectList />
        </main>
        <button className="editor-btn" onClick={changeEditor}>
          Редактировать
        </button>
      </div>
    </div>
  );
};

export default MainPage;
