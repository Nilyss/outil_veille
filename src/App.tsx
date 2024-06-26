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
import AuthPage from "./layouts/AuthPage";
import HomePage from "./layouts/HomePage";

// components
import Header from "./components/header/Header.tsx";

function App(): ReactElement {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Navigate to={"/auth"} />} />
          <Route path={"/auth"} element={<AuthPage />} />
          <Route path={"/home"} element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
