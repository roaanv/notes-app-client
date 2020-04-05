import React, {Dispatch, SetStateAction, useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

import "./Login.css";

// TODO: Need to change the "any" types to strong types
interface LoginProps {
  userHasAuthenticated: Dispatch<SetStateAction<boolean>>;
}

function Login(props:LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    console.log(`Calling validateForm: ${email}`);
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event:any) {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e:any) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e:any) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button size="lg" block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;