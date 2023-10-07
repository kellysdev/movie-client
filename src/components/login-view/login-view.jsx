import React from "react";
import { useState } from "react";

export const LoginView = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //prevent submit button reloading the page
    event.preventDefault();

    const data = {
      access: Username,
      secret: Password
    }

    fetch("https://popopolis-f7a904c7cad0.herokuapp.com/login.json", {
      method: "POST",
      body: JSON.stringify(data)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
         />
      </label>
      
      <label>
        Password:
        <input 
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
         />
      </label>

      <button type="submit">Submit</button>
    </form>
  )
};