import React from "react";
import { AuthContext } from "../context/Authentication";

const Authorization = ({ children }) => {
  const { user, signIn } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  if (user) return children;
  return (
    <section id="authorization">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Authorization;
