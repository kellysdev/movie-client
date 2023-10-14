import React from "react";

export const UserInfo = ({ Username, Email, Birthday }) => {
  return (
    <>
      <h2>{Username}</h2>
      <p>
        Email: {Email}<br />
        Birthday: {Birthday}
      </p>
    </>
  );
};