import { useRoutes } from "react-router-dom";
import "./App.css";
import "./assets/scss/index.scss";
import routes from "./routes";

function App() {
  const elements = useRoutes(routes);

  return (
    <div className="app">
      {elements}
    </div>
  );
}

export default App;
