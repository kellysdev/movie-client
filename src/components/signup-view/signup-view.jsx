import { useState } from "react";

export const SignupView = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  handleSubmit = (event) => {};


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