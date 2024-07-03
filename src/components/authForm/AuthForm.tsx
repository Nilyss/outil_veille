// imports
import "./authForm.scss";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";
import { ReactElement, ChangeEvent, MouseEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import { IUserContext } from "../../context/UserContext";
import { User, UserLoginRequest } from "../../API/models/User.model";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm(): ReactElement {
  const [isSignUpForm, setIsSignUpForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {},
  );

  const navigate: NavigateFunction = useNavigate();

  // context functions
  const { connectUser, createUser, user, setUser }: IUserContext =
    useContext(UserContext);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "L'adresse mail n'est pas valide.";
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password)
      ? ""
      : "Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre.";
  };

  const validatePasswordConfirmation = (
    password: string,
    confirmation: string,
  ) => {
    return password === confirmation
      ? ""
      : "Les mots de passe ne correspondent pas.";
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    isSignUpForm &&
      setErrorMessages((prev) => ({
        ...prev,
        email: validateEmail(e.target.value),
      }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    isSignUpForm &&
      setErrorMessages((prev) => ({
        ...prev,
        password: validatePassword(e.target.value),
      }));
  };

  const handlePasswordConfirmationChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirmation(e.target.value);
    setErrorMessages((prev) => ({
      ...prev,
      passwordConfirmation: validatePasswordConfirmation(
        password,
        e.target.value,
      ),
    }));
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!isSignUpForm) {
      const credentials: UserLoginRequest = { email, password };
      try {
        const user: User | null = await connectUser(credentials);
        if (!user) {
          setErrorMessages({
            general:
              "La connexion a échoué. Veuillez vérifier vos identifiants.",
          });
        }
      } catch (error) {
        console.log(error);
        setErrorMessages({
          general: "La connexion a échoué. Veuillez réessayer plus tard.",
        });
      }
    } else {
      try {
        await createUser({ email, password });
      } catch (error) {
        setErrorMessages({
          general:
            "La création du compte a échoué. Veuillez réessayer plus tard.",
        });
      }
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

  const formValidation = (event: MouseEvent<HTMLButtonElement>) => {
    if (isSignUpForm) {
      const errors: { [key: string]: string } = {
        email: validateEmail(email),
        password: validatePassword(password),
        passwordConfirmation: validatePasswordConfirmation(
          password,
          passwordConfirmation,
        ),
      };
      setErrorMessages(errors);

      if (!errors.email && !errors.password && !errors.passwordConfirmation) {
        return handleSubmit(event);
      }
    } else {
      if (email.length > 0 && password.length > 0) {
        return handleSubmit(event);
      } else {
        setErrorMessages({ general: "Veuillez remplir tous les champs." });
      }
    }
    return false;
  };

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
            onChange={handleEmailChange}
          />
          <label htmlFor={"email"}>
            {isSignUpForm ? "Adresse mail" : "Identifiant"} :{" "}
          </label>
          {errorMessages.email && (
            <p className="error">{errorMessages.email}</p>
          )}
        </div>
        <div
          className={`inputWrapper ${password.length > 0 ? "hasContent" : ""}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            name={"password"}
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor={"password"}>Mot de passe : </label>
          <span
            className="togglePassword"
            onClick={toggleShowPassword}
            title={"Afficher / masquer le mot de passe"}
          >
            {showPassword ? <LiaEyeSlash /> : <LiaEyeSolid />}
          </span>
          {errorMessages.password && (
            <p className="error">{errorMessages.password}</p>
          )}
        </div>
        {isSignUpForm && (
          <div
            className={`inputWrapper ${passwordConfirmation.length > 0 ? "hasContent" : ""}`}
          >
            <input
              type={showPassword ? "text" : "password"}
              name={"passwordConfirmation"}
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
            <label htmlFor={"password"}>Confirmer le mot de passe : </label>
            <span
              className="togglePassword"
              onClick={toggleShowPassword}
              title={"Afficher / masquer le mot de passe"}
            >
              {showPassword ? <LiaEyeSlash /> : <LiaEyeSolid />}
            </span>
            {errorMessages.passwordConfirmation && (
              <p className="error">{errorMessages.passwordConfirmation}</p>
            )}
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
          <button className={"button"} onClick={formValidation}>
            {isSignUpForm ? "S'inscrire" : "Se connecter"}
          </button>
        </div>
        {errorMessages.general && (
          <p className="error globalError">{errorMessages.general}</p>
        )}
      </form>
    </section>
  );
}
