import React, {Dispatch, SetStateAction, useState} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import {RouteComponentProps } from "react-router-dom";


import "./Login.css";
import LoaderButton from "../components/LoaderButton";

// TODO: Need to change the "any" types to strong types
interface LoginProps extends RouteComponentProps {
  userHasAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    console.log(`Calling validateForm: ${email}`);
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event:any) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      // Redirect to home screen after login
      props.history.push("/");
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
        <LoaderButton
          block
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
};

export default Login;