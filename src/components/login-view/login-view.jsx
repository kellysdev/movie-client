import React from "react";

export const LoginView = () => {

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
        <input type="text" />
      </label>
      
      <label>
        Password:
        <input type="password" />
      </label>

      <button type="submit">Submit</button>
    </form>
  )
};