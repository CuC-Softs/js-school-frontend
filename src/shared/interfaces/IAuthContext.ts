export interface IAuthContextData {
  signed: boolean;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface IAuthProviderProps {
  children: React.ReactNode;
}
