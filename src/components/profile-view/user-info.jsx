import React from "react";

export const UserInfo = ({ user, Email, Birthday }) => {
  return (
    <>
      <h2>{user.Username}</h2>
      <p>{user.Email}<br />{user.Birthday}</p>
    </>
  );
};