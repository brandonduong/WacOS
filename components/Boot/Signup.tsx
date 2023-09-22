import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import CustomButton from "../CustomButton";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const email = username + "@fakeemailbehind.com";
  const [error, setError] = useState("");

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password too short (atleast 5 characters)");
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch(async (error) => {
          // If user doesn't exist, create it
          console.log(error);
          await signup();
        });
    }
  };

  async function signup() {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        await updateProfile(user, { displayName: username }).catch((err) =>
          console.log(err)
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        if (!errorCode.localeCompare("auth/email-already-in-use")) {
          setError("Wrong password");
        }
      });
  }

  return (
    <form className="flex flex-col items-center text-cpurple">
      <div className="border-4 border-fuchsia-300 mb-2">
        <input
          type="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          required
          placeholder="Username"
          className="px-2 py-1 font-vt tracking-widest text-2xl outline-none placeholder:text-purple-300"
        />
      </div>

      <div className="border-4 border-fuchsia-300 mb-2">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required
          placeholder="Password"
          className="px-2 py-1 font-vt tracking-widest text-2xl outline-none placeholder:text-purple-300"
        />
      </div>

      {error && <span className="mb-2 text-center font-visitor">{error}</span>}

      <CustomButton
        handleClick={onSubmit}
        title="Sign in"
        clicked={false}
        className="font-visitor"
      />
    </form>
  );
}
