import React, { useRef, useEffect } from "react";
import data from "../../src/data/features.json";
import { useUser } from "../components/UserContext";
import NetworkDashboard from "../components/dash/NetworkDashboard";
import Card from "../components/ui/Card";
import lottie from "lottie-web"; // Import Lottie
import animationData from "../../public/home.json"

import HomeDash from "../components/features/HomeDash";

import { useRouter } from 'next/router';

const HomePage = () => {
  const animationContainerRef = useRef(null);
  const { user } = useUser();
  const router = useRouter();

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

  useEffect(() => {
    const checkUserInterval = setInterval(() => {
      if (!user) {
        router.push("/");
      }
    }, 1000); // Check every 1 second (adjust the interval as needed)
  
    // Cleanup the interval when the component unmounts
    return () => clearInterval(checkUserInterval);
  }, [user]);

  return (
    <div>
      {!user ? (
       <div
          ref={animationContainerRef}
          style={{ width: "100%", height: "300px" }} // Adjust the dimensions as needed
        />
      ) : user.role === "admin" ? (
        <>
        <HomeDash/>
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
