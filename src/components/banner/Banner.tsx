// style
import "./banner.scss";

// assets
import background from "../../assets/sample.webp";

// types
import { ReactElement } from "react";

// components
import NavBar from "../navBar/NavBar.tsx";
import LogoutButton from "../logoutButton/LogoutButton";

export default function Banner(): ReactElement {
  return (
    <div id="banner">
      <figure>
        <img src={background} alt={"background"} />
      </figure>
      <NavBar />
      <div className={"btnWrapper"}>
        <LogoutButton />
      </div>
    </div>
  );
}
