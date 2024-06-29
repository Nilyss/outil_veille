// styles
import "./header.scss";

// import img
import logo from "../../assets/logoFirstIteration.webp";

// types
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Header(): ReactElement {
  return (
    <header>
      <Link to={"/home"} title={"home"} className={"titleWrapper"}>
        <figure>
          <img src={logo} alt={"logo"} />
        </figure>
        <h1>Outil de veille techno</h1>
      </Link>
    </header>
  );
}
