import { useEffect, useState } from "react";
import "./App.css";
import ScrollComponent from "./ScrollComponent";

const RELEASE_YEAR = 2012;

function App() {
  const [db, setDb] = useState([]);

  useEffect(() => {
    const a = async () => {
      let res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${RELEASE_YEAR}&page=1&vote_count.gte=100`
      );
      let data = await res.json();
      setDb(data?.results);
    };
    a();
  }, []);

  // console.log(db);
  return (
    <div className="container">
      {/* <div className="header">
        <div>Header</div>
        <div className="nav-bar">Nav Bar</div>
      </div>
      <div className="scroll-content">
        {db?.map((element, index) => (
          <p key={index}>{element?.original_title}</p>
        ))}
      </div> */}
      <ScrollComponent
        url={`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${RELEASE_YEAR}&page=1&vote_count.gte=100`}
      />
    </div>
  );
}

export default App;
