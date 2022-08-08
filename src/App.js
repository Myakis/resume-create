import MainPage from "./containers/Main/index";
import ResumeForm from "./containers/ResumeForm";
import { useTypedSelector } from "./store";

function App() {
  const isEditor = useTypedSelector(state => state.resume.editor);
  return <div className="App">{isEditor ? <ResumeForm /> : <MainPage />}</div>;
}

export default App;
