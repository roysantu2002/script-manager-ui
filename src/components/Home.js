import React, { useRef, useEffect } from "react";
import data from "../../src/data/features.json";
import { useUser } from "../components/UserContext";
import NetworkDashboard from "../components/dash/NetworkDashboard";
import Card from "../components/ui/Card";
import lottie from "lottie-web"; // Import Lottie
import animationData from "../../public/home.json"
import Image from 'next/image';

import AdminDash from "./AdminDash";
import HomeDash from "../components/features/HomeDash";
import UserDash from "./UserDash"

import { useRouter } from 'next/router';

const HomePage = () => {
  const animationContainerRef = useRef(null);
  const { user } = useUser();
  const router = useRouter();



  // const [imageSrc, setImageSrc] = useState('/image1.jpg'); // Initial image source
  // const [headerText, setHeaderText] = useState('Header Text 1'); // Initial header text
  // const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']; // List of image sources
  // const texts = ['Header Text 1', 'Header Text 2', 'Header Text 3']; // List of header texts
  // const changeInterval = 5000; // Interval in milliseconds to change content


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Generate a random index to select a new image and text
  //     const randomIndex = Math.floor(Math.random() * images.length);

  //     // Update the image and header text
  //     setImageSrc(images[randomIndex]);
  //     setHeaderText(texts[randomIndex]);
  //   }, changeInterval);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

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
     <div className='container d-flex justify-content-center align-items-center min-vh-100'>
        
           <div className='row shadow-lg rounded'>
             <div className='col-md-6 bg-white p-1 d-flex align-items-center justify-content-center d-none d-md-flex'>
               <div className='left-page-content text-center'>
               <h1>Bob, a network engineer</h1>
     <div className="avatar avatar-lg mb-3">
         <Image
           src="/images/main-page.jpg" // Replace with the path to your image
           alt="Image Alt Text"
           width={300} // Set the desired width
          height={300} // Set the desired height
          className="rounded-circle"
         />
       </div>
               </div>
             </div>

             <div className='col-md-6 bg-white p-3 shadow-lg'>
             <div className="d-flex justify-content-center">
  <div className="w-100">
    <Image
      src="/images/home1.png" // Replace with the path to your image
      alt="Image Alt Text"
      layout="responsive" // Use layout="responsive" for full-width images
      width={400} // Set the desired width (you can adjust this if needed)
      height={200} // Set the desired height (you can adjust this if needed)
    />
  </div>
</div>
    
             </div>
           </div>
         </div>
     

    //    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
    //    <h1>Bob at his cluttered desk</h1>
    //    <div className="avatar avatar-lg mb-3">
    //      <Image
    //        src="/images/main-page.jpg" // Replace with the path to your image
    //        alt="Image Alt Text"
    //        width={300} // Set the desired width
    //       height={300} // Set the desired height
    //       className="rounded-circle"
    //      />
    //    </div>
    //  </div>
      ) : user.role === "admin" ? (
        <>
        <AdminDash/>
        {/* <HomeDash/> */}
          {/* <NetworkDashboard /> */}
          {/* <div className='row'>
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
          </div> */}
        </>
      ) : (
       <UserDash/>
      )}
    </div>
  );
};

export default HomePage;
