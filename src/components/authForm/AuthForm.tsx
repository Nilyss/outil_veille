// style
import "./authForm.scss";

// icons
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";

// types
import { ReactElement, ChangeEvent, MouseEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import { IUserContext } from "../../context/UserContext";
import { User, UserLoginRequest } from "../../API/models/User.model";

// context
import { UserContext } from "../../context/UserContext";

// libraries
import Cookies from "js-cookie";

// hooks
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm(): ReactElement {
  const [isSignUpForm, setIsSignUpForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  // context functions
  const { connectUser, createUser, user, setUser }: IUserContext =
    useContext(UserContext);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!isSignUpForm) {
      const credentials: UserLoginRequest = { email, password };
      await connectUser(credentials);
    } else {
      await createUser({
        email,
        password,
      });
    }
  };

  useEffect(() => {
    Cookies.remove("access_token");
    const rememberedUser: string | null = localStorage.getItem("user");
    if (rememberedUser) {
      const parsedUser: User = JSON.parse(rememberedUser);
      setUser(parsedUser);
    }
    if (user) {
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/home", { replace: true });
    }
  }, [navigate, rememberMe, setUser, user]);

  return (
    <section id={"authForm"}>
      <form>
        <h2>{isSignUpForm ? "Crée un compte" : "Connexion"}</h2>
        <div
          className={`inputWrapper userNameWrapper ${email.length > 0 ? "hasContent" : ""}`}
        >
          <input
            type={"email"}
            name={"email"}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <label htmlFor={"email"}>
            {isSignUpForm ? "Adresse mail" : "Identifiant"} :{" "}
          </label>
        </div>
        <div
          className={`inputWrapper ${password.length > 0 ? "hasContent" : ""}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            name={"password"}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <label htmlFor={"password"}>Mot de passe : </label>
          <span
            className="togglePassword"
            onClick={toggleShowPassword}
            title={"Afficher / masquer le mot de passe"}
          >
            {showPassword ? <LiaEyeSlash /> : <LiaEyeSolid />}
          </span>
        </div>
        {isSignUpForm && (
          <div
            className={`inputWrapper ${passwordConfirmation.length > 0 ? "hasContent" : ""}`}
          >
            <input
              type={showPassword ? "text" : "password"}
              name={"passwordConfirmation"}
              value={passwordConfirmation}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirmation(e.target.value)
              }
            />
            <label htmlFor={"password"}>Confirmer le mot de passe : </label>
            <span
              className="togglePassword"
              onClick={toggleShowPassword}
              title={"Afficher / masquer le mot de passe"}
            >
              {showPassword ? <LiaEyeSlash /> : <LiaEyeSolid />}
            </span>
          </div>
        )}
        {!isSignUpForm && (
          <div className={`inputWrapper rememberMeWrapper`}>
            <label htmlFor={"rememberMe"}>Se souvenir de moi ?</label>
            <input
              type={"checkbox"}
              name={"rememberMe"}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>
        )}
        <div>
          <p className={"goToSignUp"}>
            {isSignUpForm ? "Deja un compte ?" : "Pas encore de compte ?"}{" "}
            <span onClick={() => setIsSignUpForm(!isSignUpForm)}>
              {isSignUpForm ? "Connecte-toi ici" : "Crée en un vite"}
            </span>{" "}
            !
          </p>
        </div>
        <div className={"buttonWrapper formButtonWrapper"}>
          <button className={"button"} onClick={handleSubmit}>
            {isSignUpForm ? "S'inscrire" : "Se connecter"}
          </button>
        </div>
      </form>
    </section>
  );
}
