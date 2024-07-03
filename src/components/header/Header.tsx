// styles
import "./header.scss";

// import img
import logo from "../../assets/logoFirstIteration.webp";

// types
import { ReactElement } from "react";
import { Link } from "react-router-dom";

// hooks
import { useContext } from "react";

// context
import { UserContext } from "../../context/UserContext";

// components
import NavBar from "../navBar/NavBar";

export default function Header(): ReactElement {
  const { user } = useContext(UserContext);

  return (
    <header className={user ? "loggedHeader" : ""}>
      <Link to={"/home"} className={"titleWrapper"}>
        <figure className={user ? "loggedFigure" : ""}>
          <img src={logo} alt={"logo"} />
        </figure>
        {!user && <h1>Dev hive</h1>}
      </Link>
      {user && <NavBar />}
    </header>
  );
}
