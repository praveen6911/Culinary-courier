import React, { useEffect, useState } from "react";
import "../styles/Developer.css";
// import { GITHUB_TOKEN } from "../utils/constants";

const Developer = (props) => {
  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const token = {/* GITHUB_TOKEN */}; // Replace with your actual token

    try {
      const response = await fetch("https://api.github.com/users/praveen6911", {
        headers: {
          Authorization: `token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const json = await response.json();
      setUserData(json);
      setCount(json.public_repos);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Developer">
      <h1>{count}</h1>
      <img src={userData.avatar_url} alt="Developer avatar" className="Developer-avatar" />
      <h1>{userData.name}</h1>
      <h2>{userData.location}</h2>
      <h3>{userData.public_repos}</h3>
      <h4><a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></h4>
      <button onClick={() => setCount(count + 1)}>Count Increaser</button>
    </div>
  );
};

export default Developer;
