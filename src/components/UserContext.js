import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook from Next.js

const UserContext = createContext();

export function UserProvider({ children }) {
  const router = useRouter(); // Initialize the router object

  const [user, setUser] = useState(null);

  // When the component mounts, check localStorage for user data
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    // Redirect to the "Thank You" page first
    router.push("/thank-you");

    // Automatically redirect to the home page after a delay (e.g., 3 seconds)
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000); // 3000 milliseconds (3 seconds)

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeout);
  };
  

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
