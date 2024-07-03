// style
import "./navBar.scss";
import "aos/dist/aos.css";

// assets
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

// types
import { ReactElement } from "react";

// hooks / libs
import AOS from "aos"; // https://michalsnik.github.io/aos/
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// components
import LogoutButton from "../logoutButton/LogoutButton.tsx";

export default function NavBar(): ReactElement {
  const [display, setDisplay] = useState<boolean>(false);
  const toggleDisplay = (): void => {
    setDisplay(!display);
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <nav id={"navBar"} className={display ? "openedNavBar" : ""}>
      {display ? (
        <IoMdClose
          onClick={toggleDisplay}
          className={`navIcon
          ${display ? "animatedIcons--alt " : "animatedIcons--alt"}
          `}
        />
      ) : (
        <RxHamburgerMenu
          className={`navIcon
          ${display ? "animatedIcons " : "animatedIcons"}
          `}
          onClick={toggleDisplay}
        />
      )}
      {display && (
        <ul className={"navModale"} data-aos={"fade-down"}>
          <li>
            <NavLink to={"/home"} onClick={toggleDisplay}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to={"/about"} onClick={toggleDisplay}>
              A propos
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"} onClick={toggleDisplay}>
              Contact
            </NavLink>
          </li>
          <li>
            <LogoutButton setDisplay={toggleDisplay} />
          </li>
        </ul>
      )}
    </nav>
  );
}
