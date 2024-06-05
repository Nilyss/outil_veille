interface IAPICalls {
  baseUrl: string;
  getRequest<T>(endpoint: string): Promise<T>;
  postRequest<T>(endpoint: string, body: object): Promise<T>;
}

export class APICalls implements IAPICalls {
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
}
