// styles
import "./header.scss";

// import img
import logo from "../../assets/logoFirstIteration.webp";

// types
import { ReactElement } from "react";

// hooks
import { Link, NavLink } from "react-router-dom";

export default function Header(): ReactElement {
  const isLogged: boolean = false; // TODO <— with the userContext

  return (
    <header>
      <nav>
        <div className={"leftSide"}>
          <Link to={"/home"} title={"home"} className={"titleWrapper"}>
            <figure>
              <img src={logo} alt={"logo"} />
            </figure>
            <h1>Outil de veille techno</h1>
          </Link>
        </div>
        {isLogged && (
          <div className={"rightSide"}>
            <NavLink
              to={"/home"}
              className={({ isActive }: { isActive: boolean }): string =>
                isActive ? "activeLink" : ""
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }: { isActive: boolean }): string =>
                isActive ? "activeLink" : ""
              }
            >
              Site Web
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }: { isActive: boolean }): string =>
                isActive ? "activeLink" : ""
              }
            >
              PodCast
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }: { isActive: boolean }): string =>
                isActive ? "activeLink" : ""
              }
            >
              Flux RSS
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }: { isActive: boolean }): string =>
                isActive ? "activeLink" : ""
              }
            >
              YouTube
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
