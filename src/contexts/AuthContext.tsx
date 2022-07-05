import {
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useState,
  createContext,
} from "react";
import api from "../services/api";
import {
  IAuthContextData,
  IAuthProviderProps,
} from "../shared/interfaces/IAuthContext";
import MySwal from "../services/swal";

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState<string>();
  const signed = useMemo(() => {
    return !!user;
  }, [user]);

  const handleRehydrateUserData = () => {
    const user = localStorage.getItem("auth:user");
    const token = localStorage.getItem("auth:token");

    if (user) {
      setUser(JSON.parse(user));
    }

    if (token) {
      setToken(token);
    }
  };

  useEffect(() => {
    handleRehydrateUserData();
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = token;
    }
  }, [token]);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirmation: string
    ) => {
      try {
        await api.post("/users", {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        });

        MySwal.fire(
          "Registrado",
          `${name}, seu usuário foi criado com sucesso!`,
          "success"
        );
      } catch (err) {
        MySwal.fire("Erro", "Verifique as credenciais do Formulário", "error");
      }
    },
    []
  );

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("auth:user", JSON.stringify(data.user));
      localStorage.setItem("auth:token", data.token.token);

      setUser(data.user);
      setToken(data.token.token);

      MySwal.fire("Login", "usuário");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("auth:user");
      localStorage.removeItem("auth:token");
    } catch (err) {
      localStorage.removeItem("auth:user");
      localStorage.removeItem("auth:token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
