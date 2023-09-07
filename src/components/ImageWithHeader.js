import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageWithHeader = () => {
  const [imageSrc, setImageSrc] = useState('/image1.jpg'); // Initial image source
  const [headerText, setHeaderText] = useState('Header Text 1'); // Initial header text
  const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']; // List of image sources
  const texts = ['Header Text 1', 'Header Text 2', 'Header Text 3']; // List of header texts
  const changeInterval = 5000; // Interval in milliseconds to change content

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random index to select a new image and text
      const randomIndex = Math.floor(Math.random() * images.length);

      // Update the image and header text
      setImageSrc(images[randomIndex]);
      setHeaderText(texts[randomIndex]);
    }, changeInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="avatar avatar-lg mb-3">
        <Image
          src={imageSrc}
          alt="Image Alt Text"
          width={100}
          height={100}
          className="rounded-circle"
        />
      </div>
      <h1 className="text-center">{headerText}</h1>
    </div>
  );
};

export default ImageWithHeader;
