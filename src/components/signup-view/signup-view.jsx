import { response } from "express";
import { useState } from "react";

export const SignupView = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    };
  
    fetch("https://popopolis-f7a904c7cad0.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    })
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
        type="text"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength = "3"
         />
      </label>

      <label>
        Password:
        <input
        type="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>

      <label>
        Email:
        <input
        type="email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </label>

      <label>
        Birthday:
        <input
        type="date"
        value={Birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
        />
      </label>

      <button type="submit">Sign Up</button>
    </form>
  )
};