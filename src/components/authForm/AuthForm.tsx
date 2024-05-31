// style
import "./authForm.scss";

// types
import { ReactElement, ChangeEvent } from "react";

// hooks
import { useState } from "react";

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
          <span className="togglePassword" onClick={toggleShowPassword}>
            {showPassword ? "🙈" : "👁️"}
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
            <span className="togglePassword" onClick={toggleShowPassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
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
          <button className={"button"}>Se connecter</button>
        </div>
      </form>
    </section>
  );
}
