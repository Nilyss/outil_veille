// style
import "./navBar.scss";

// types
import { ReactElement } from "react";
import { IUserContext } from "../../context/UserContext";

// context
import { UserContext } from "../../context/UserContext";

// hooks
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar(): ReactElement {
  const { user }: IUserContext = useContext(UserContext);
  return (
    <nav id={'navBar'}>
      {user && (
        <>
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
        </>
      )}
    </nav>
  );
}
