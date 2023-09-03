import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after a 3-second delay
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h1>404 - Not Found</h1>
      <p>Redirecting to the home page...</p>
    </div>
  );
};

export default NotFoundPage;
