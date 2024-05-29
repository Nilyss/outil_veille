// styles
import "./utils/styles/global.scss";

// types
import { ReactElement } from "react";

// hooks | libraries
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// layout
import AuthPage from "./layouts/AuthPage.tsx";

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Navigate to={"/auth"} />} />
        <Route path={"/auth"} element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
