// style
import "./authForm.scss";

// icons
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";

// types
import { ReactElement, ChangeEvent } from "react";
import { IUserContext } from "../../context/UserContext";

// context
import { UserContext } from "../../context/UserContext";

// hooks
import { useState, useContext } from "react";

export default function AuthForm(): ReactElement {
  const [isSignUpForm, setIsSignUpForm] = useState<boolean>(false);
  const [authFormTitle, setAuthFormTitle] = useState<string>("Connexion");
  const [toggleFormMessage, setToggleFormMessage] = useState<string>(
    "Pas encore de compte ?",
  );
  const [toggleFormMessageSpan, setToggleFormMessageSpan] =
    useState<string>("Crée en un vite");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // context functions
  const { getUser, createUser }: IUserContext = useContext(UserContext);

  const handleChangeForm = () => {
    setIsSignUpForm(!isSignUpForm);
    if (isSignUpForm) {
      setAuthFormTitle("Connexion");
      setToggleFormMessage("Pas encore de compte ?");
      setToggleFormMessageSpan("Crée en un vite");
    } else {
      setAuthFormTitle("Crée un compte");
      setToggleFormMessage("Déjà un compte ?");
      setToggleFormMessageSpan("Connecte-toi ici");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section id={"authForm"}>
      <form>
        <h2>{authFormTitle}</h2>
        {isSignUpForm && (
          <>
            <div
              className={`inputWrapper ${lastName.length > 0 ? "hasContent" : ""}`}
            >
              <input
                type={"text"}
                name={"lastName"}
                value={lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />
              <label htmlFor={"lastName"}>Nom : </label>
            </div>
            <div
              className={`inputWrapper ${firstName.length > 0 ? "hasContent" : ""}`}
            >
              <input
                type={"text"}
                name={"firstName"}
                value={firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
              />
              <label htmlFor={"firstName"}>Prénom : </label>
            </div>
          </>
        )}
        <div
          className={`inputWrapper userNameWrapper ${userName.length > 0 ? "hasContent" : ""}`}
        >
          <input
            type={"email"}
            name={"userName"}
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
          <label htmlFor={"userName"}>
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
            {toggleFormMessage}{" "}
            <span onClick={() => handleChangeForm()}>
              {toggleFormMessageSpan}
            </span>{" "}
            !
          </p>
        </div>
        <div className={"buttonWrapper formButtonWrapper"}>
          <button className={"button"}>
            {isSignUpForm ? "S'inscrire" : "Se connecter"}
          </button>
        </div>
      </form>
    </section>
  );
}
