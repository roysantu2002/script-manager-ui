// pages/dashboard.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProtectedRoute from "../src/components/ProtectedRoute";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated and get their information from the token.
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage.

    if (!token) {
      router.push("/login");
    } else {
      try {
        // Verify and decode the JWT token to get user data.
        const decodedToken = jwt.verify(token, "your-secret-key"); // Use the same secret key you used for signing.
        setUser(decodedToken);
      } catch (error) {
        // Handle token verification errors (e.g., token expired).
        router.push("/login");
      }
    }
  }, [router]);

  console.log(user);

  return (
    <ProtectedRoute
      user={user}
      allowedRoles={["admin", "user"]}
      router={router}
    >
      <div>
        <h1>Dashboard</h1>
        {user && <p>Welcome, {user.username}!</p>}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
