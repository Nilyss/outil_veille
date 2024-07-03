// types
import { Dispatch, ReactElement, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { IUserContext } from "../../context/UserContext";

// libraries
import Cookies from "js-cookie";

// context
import { UserContext } from "../../context/UserContext";

// hooks
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function LogoutButton({
  setDisplay,
}: {
  setDisplay: Dispatch<SetStateAction<boolean>>;
}): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const { setUser }: IUserContext = useContext(UserContext);

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.clear();
    navigate("/auth");
    setUser(null);
    setDisplay(false);
  };

  return (
    <button className={"button"} onClick={handleLogout}>
      Déconnexion
    </button>
  );
}
