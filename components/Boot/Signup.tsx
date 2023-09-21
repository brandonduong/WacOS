import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(
      auth,
      username + "@fakeemailbehind.com",
      password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <form>
      <div>
        <label>Username</label>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </div>

      <button type="submit" onClick={onSubmit}>
        Sign up
      </button>
    </form>
  );
}
