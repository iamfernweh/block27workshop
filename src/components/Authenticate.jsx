import { useState } from "react";

export default function Authenticate({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState('');
  
    async function handleClick() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setSuccessMessage(result.message);
        setUser(result.data.username);
      } catch (error) {
        setError(error.message);
      }
    }
  
    return (
      <div>
              <h2>Authenticate</h2>
              {successMessage && <p>{successMessage}</p>}
              {setUser && <p>Username after authentication: {user}</p>}
              {user.length > 10 && <p>Username must be 10 characters</p>}
              {error && <p>{error}</p>}
              <button onClick={handleClick}>Authenticate Token!</button>
            
      </div>
    );
  }