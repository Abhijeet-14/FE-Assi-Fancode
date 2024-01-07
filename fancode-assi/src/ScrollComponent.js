import React, { useState, useEffect } from 'react';
import './ScrollComponent.css'; // Import your CSS file for styling

const ScrollComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down'); // or 'up'

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop === 0) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  const fetchData = async () => {
    // Simulate fetching data from an API
    setLoading(true);

    // Fetch data based on scroll direction
    const newData = await fetchDataBasedOnScrollDirection();

    setData((prevData) =>
      scrollDirection === 'down' ? [...prevData, ...newData] : [...newData, ...prevData]
    );

    setLoading(false);
  };

  const fetchDataBasedOnScrollDirection = () => {
    // Replace this with your actual data fetching logic
    // For demonstration purposes, just returning a promise after a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['New Item 1', 'New Item 2', 'New Item 3']);
      }, 1000);
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [scrollDirection]); // Fetch data when scroll direction changes

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {data.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ScrollComponent;
