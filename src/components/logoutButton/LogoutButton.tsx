// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";
import { IUserContext } from "../../context/UserContext";

// libraries
import Cookies from "js-cookie";

// context
import { UserContext } from "../../context/UserContext";

// hooks
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function LogoutButton(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const { user, setUser }: IUserContext = useContext(UserContext);

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.clear();
    user && setUser(null);
    navigate("/auth");
  };

  return <button
      className={'button'}
      onClick={handleLogout}>Déconnexion</button>;
}
