import React, { useRef, useEffect } from "react";
import data from "../../src/data/features.json";
import { useUser } from "../components/UserContext";
import NetworkDashboard from "../components/dash/NetworkDashboard";
import Card from "../components/ui/Card";
import lottie from "lottie-web"; // Import Lottie
import animationData from "../../public/home.json"
const HomePage = () => {
  const animationContainerRef = useRef(null);
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: "svg", // or "canvas" or "html"
      loop: true,
      autoplay: true, // Automatically play the animation when the modal opens
      animationData: animationData, // Replace with your animation JSON data
    });

    return () => {
      animation.destroy();
    };
  }, []); // Re-run the effect when the modal is shown or hidden

  // useEffect(() => {
  //   // Check if the user is authenticated and get their information from the token.
  //   const token = localStorage.getItem("token"); // Assuming you store the token in localStorage.

  //   if (!token) {
  //     router.push("/login");
  //   } else {
  //     try {
  //       // Verify and decode the JWT token to get user data.
  //       const decodedToken = jwt.verify(token, "your-secret-key"); // Use the same secret key you used for signing.
  //       setUser(decodedToken);
  //     } catch (error) {
  //       // Handle token verification errors (e.g., token expired).
  //       router.push("/login");
  //     }
  //   }
  // }, [router]);

  return (
    <div>
      {!user ? (
       <div
          ref={animationContainerRef}
          style={{ width: "100%", height: "300px" }} // Adjust the dimensions as needed
        />
      ) : user.role === "admin" ? (
        <>
          <NetworkDashboard />
          <div className='row'>
            {data.map((card) => (
              <div key={card.id} className='col-md-6'>
                <Card
                  id={card.id}
                  title={card.title}
                  // description={card.description}
                  icon={card.icon}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>Access Denied: You don't have permission to view this page.</h1>
      )}
    </div>
  );
};

export default HomePage;
