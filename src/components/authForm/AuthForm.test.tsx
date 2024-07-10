import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./AuthForm";
import { UserContext } from "../../context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockConnectUser = jest.fn();
const mockCreateUser = jest.fn();

const userContextValue = {
  connectUser: mockConnectUser,
  createUser: mockCreateUser,
  user: null,
  setUser: jest.fn(),
};

describe("AuthForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form by default", () => {
    render(
      <Router>
        <UserContext.Provider value={userContextValue}>
          <AuthForm />
        </UserContext.Provider>
      </Router>,
    );

    expect(screen.queryByText(/Connexion/i)).not.toBeNull();
    expect(screen.queryByLabelText(/Identifiant/i)).not.toBeNull();
    expect(screen.queryByLabelText(/Mot de passe/i)).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: /Se connecter/i }),
    ).not.toBeNull();
  });

  test("renders sign up form when toggled", () => {
    render(
      <Router>
        <UserContext.Provider value={userContextValue}>
          <AuthForm />
        </UserContext.Provider>
      </Router>,
    );

    fireEvent.click(screen.getByText(/Pas encore de compte/i));
    expect(screen.queryByText(/Crée un compte/i)).not.toBeNull();
    expect(screen.queryByLabelText(/Adresse mail/i)).not.toBeNull();
    expect(
      screen.queryByLabelText(/Confirmer le mot de passe/i),
    ).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: /S'inscrire/i }),
    ).not.toBeNull();
  });

  test("validates email and password on sign up", () => {
    render(
      <Router>
        <UserContext.Provider value={userContextValue}>
          <AuthForm />
        </UserContext.Provider>
      </Router>,
    );

    fireEvent.click(screen.getByText(/Pas encore de compte/i));
    fireEvent.change(screen.getByLabelText(/Adresse mail/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmer le mot de passe/i), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /S'inscrire/i }));

    expect(
      screen.queryByText(/L'adresse mail n'est pas valide/i),
    ).not.toBeNull();
    expect(
      screen.queryByText(
        /Le mot de passe doit contenir au moins 8 caractères/i,
      ),
    ).not.toBeNull();
    expect(
      screen.queryByText(/Les mots de passe ne correspondent pas/i),
    ).not.toBeNull();
  });

  test("calls connectUser on login", async () => {
    render(
      <Router>
        <UserContext.Provider value={userContextValue}>
          <AuthForm />
        </UserContext.Provider>
      </Router>,
    );

    fireEvent.change(screen.getByLabelText(/Identifiant/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Se connecter/i }));

    expect(mockConnectUser).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
