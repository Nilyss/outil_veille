// types
import { ReactElement } from "react";
import { IUserContext } from "../context/UserContext";
import { NavigateFunction } from "react-router-dom";

// context
import { UserContext } from "../context/UserContext";

// hooks
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage(): ReactElement {
  // context functions
  const { user }: IUserContext = useContext(UserContext);
  const navigate: NavigateFunction = useNavigate();

  useEffect((): void => {
    if (!user) {
      navigate("/auth");
    }
  });

  return <></>;
}
