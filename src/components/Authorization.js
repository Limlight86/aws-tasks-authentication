import React from "react";
import { AuthContext } from "../context/Authentication";

const Authorization = ({ children }) => {
  const { user, signIn, error, signUp } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [action, setAction] = React.useState("Sign In");

  const toggleAction = () => {
    if (action === "Sign In") {
      setAction("Sign Up");
    } else {
      setAction("Sign In");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (action === "Sign In") {
      signIn(email, password);
    } else {
      signUp(email, password);
    }
    setEmail("");
    setPassword("");
  };

  if (user) return children;
  return (
    <section id="authorization">
      <h1>{action}</h1>
      <button onClick={toggleAction}>{action}</button>
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
      <p>{error}</p>
    </section>
  );
};

export default Authorization;
