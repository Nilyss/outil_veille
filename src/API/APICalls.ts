interface IAPICalls {
  baseUrl: string;
  getRequest<T>(endpoint: string): Promise<T>;
  postRequest<T>(endpoint: string, body: object): Promise<T>;
}

export class APICalls implements IAPICalls {
  getTokenUrl: string = `http://localhost:8080/realms/outil_veille/protocol/openid-connect/token`;
  baseUrl: string = "http://localhost:3000";

  async getRequest<T>(endpoint: string): Promise<T> {
    const response: Response = await fetch(this.baseUrl + endpoint);
    if (!response.ok) {
      const error: Error = new Error("Network response was not ok");
      console.error(error);
      throw error;
    }
    return (await response.json()) as Promise<T>;
  }

  async postRequest<T>(endpoint: string, body: object): Promise<T> {
    const response: Response = await fetch(this.baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const error: Error = new Error("Network response was not ok");
      console.error(error);
      throw error;
    }
    return (await response.json()) as Promise<T>;
  }

  async getToken(credentials: { email: string; password: string }) {
    const clientSecret: string | undefined = import.meta.env
      .VITE_KEYCLOAK_CLIENT_SECRET;

    if (!clientSecret) {
      throw new Error("Client secret is not defined");
    }

    const response: Response = await fetch(this.getTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "nestJS",
        client_secret: clientSecret,
        grant_type: "password",
        username: credentials.email,
        password: credentials.password,
      }),
    });
    if (!response.ok) {
      const error: Error = new Error("Network response was not ok");
      console.error(error);
      throw error;
    }
    return await response.json();
  }
}
