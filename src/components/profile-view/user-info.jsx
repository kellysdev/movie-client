import React from "react";

export const UserInfo = ({ user, Email, Birthday }) => {
  return (
    <>
      <h2>{user.Username}</h2>
      <p>
        Email: {user.Email}<br />
        Birthday: {user.Birthday}
      </p>
    </>
  );
};