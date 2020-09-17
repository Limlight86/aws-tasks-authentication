import React from "react";
import { AuthContext } from "../context/Authentication";

const Header = () => {
  const { user, signOut } = React.useContext(AuthContext);

  return (
    <header>
      <h1>
        <span role="img" aria-label="muscle">
          💪
        </span>
        {user ? user.username : "Get Things Done"}        
      </h1>
      {user ? <button onClick={signOut}>Sign Out</button> : null }
    </header>
  );
};

export default Header;
