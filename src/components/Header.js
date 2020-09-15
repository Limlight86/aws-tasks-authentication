import React from "react";
import { AuthContext } from "../context/Authentication";

const Header = () => {
  const { user } = React.useContext(AuthContext);
  console.log(user);
  return (
    <header>
      <h1>
        <span role="img" aria-label="muscle">
          💪
        </span>
        {user ? user.username : "Get Things Done"}
      </h1>
    </header>
  );
};

export default Header;
