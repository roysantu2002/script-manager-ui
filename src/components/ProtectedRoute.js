import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.push(!user ? "/login" : "/unauthorized");
    }
  }, [user, allowedRoles, router]);

  return children;
};

export default ProtectedRoute;
