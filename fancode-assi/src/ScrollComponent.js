import React, { useState, useEffect } from "react";
// import axios from 'axios';

const ScrollComponent = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (newPage) => {
    try {
      setLoading(true);

      // Make an API request to fetch data based on the newPage value
      const response = await fetch(url);
      const newData = await response.json();
      console.log(url, newData);
      // Update the state with the new data
      if (newPage === 1) {
        // If new data is fetched at the top, prepend it to the existing data
        setData((prevData) => [...newData?.results, ...prevData]);
      } else {
        // If new data is fetched at the bottom, append it to the existing data
        setData((prevData) => [...prevData, ...newData?.results]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    // Check if the user has scrolled to the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }

    // Check if the user has scrolled to the top of the page
    if (scrollTop <= 100 && !loading && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Fetch initial data when the component mounts
    fetchData(page);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]); // Re-run the effect when the 'page' state changes

  return (
    <div>
      {/* Render your data here */}
      {data?.map((item, index) => (
        <div key={index}>{item?.original_title}</div>
        // Adjust the rendering based on your data structure
      ))}

      {/* Optional: Display a loading indicator */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ScrollComponent;
