import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAccessToken, getRefreshToken } from "./getCookie";

interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  teams: string[];
  createdAt: string;
  updatedAt: string;
}

interface AuthContextProps {
  user: any;
  setUserDeatils: any;
  signOut: any;
  setUserUsingtokens: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const setUserDeatils = (obj: any) => {
    // console.log(Object.keys(obj.data.user), "hello");
    setUser(obj.data.user);
  };

  const setUserUsingtokens = async () => {
    try {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();
      console.log(accessToken, refreshToken);
      if (accessToken == undefined && refreshToken != undefined) {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}users/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            withCredentials: true, 
          },
        );
        setUser(refreshResponse.data.data.user);
        // console.log(refreshResponse.data.data.user, "refreshed");
      } else if (accessToken != undefined && refreshToken != undefined) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}users/current-user`,
          {
            withCredentials: true, 
          },
        );
        // console.log(response.data.data, "not refreshed");
        setUser(response.data.data);
      } else {
        router.push("/auth/signin")
      }
    } catch (error) {
      signOut();
      console.log(error);
    }
  };
  const signOut = async() => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}users/logout`,
        {
          withCredentials: true, 
        },
      ).then(()=>{
        setUser(null);
        router.push("/auth/signin");
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUserDeatils, signOut, setUserUsingtokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
